import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View,BackHandler, Text,AppState,Alert, Animated, StyleSheet, Easing } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, selectActivePath } from "../../../app/active/active-slice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { selectMapsDims, selectMinFloor, selectNumberOfFloors } from "../../../app/map/map-slice";
import LiveDirectionsView from "./components/live-directions-view";
import { clearNavigationRoute, selectNavigationDestinationPOI, selectNavigationError, selectNavigationRouteSVG, selectNavigationStatus, selectUserAccessibility, selectUserPosition, setDestinationPOI } from "../../../app/navigation/navigation-slice";
import Status from "../../../app/status";
import StopButton from "../components/buttons/stop-button";
import VolumeControlButton from "../components/buttons/volume-control";
import Tts from 'react-native-tts';
import { NavigationWebSocketClient } from "../../../server/navigation-ws-client";
import BuildingMap from "../../../components/features/building/map";
import MapOverlay from "../../../layouts/map-overlay";
import BuildingMapUserCenterButton from "../components/buttons/center";
import LoadingMessagesWidget from "../../../components/features/widgets/loading-messages";
import Compass from "../../../components/features/sensors/compass/Compass";
import SpeedMeter from "../../../components/features/sensors/speed-meter/SpeedMeter";
import BuildingMapRotateButton from "../components/buttons/rotate";
import NavigationControlView from "./components/navigation-control-view/NavigationControlView";
import NavigationRouteSVG from "../components/navigation-route-svg/NavigationRouteSVG";
import BuildingMapUserPositionOverlay from "../components/building-map-user-position/BuildingMapUserPositionOverlay";
import LoadingModal from "../../../components/general/modals/loading";
import PriorityQueueTTL from "../../../utils/pq/PQTTL";


const BuildingNavigationScreen = (props) => {  
    const mock = props.route.params.mock;
    const mockUserPosition =  props.route.params.userPosition;


    const dispatch = useDispatch();
    const navigation = useNavigation();
    const building = useSelector(selectActiveBuilding);
    const mapsDims = useSelector(selectMapsDims);

    const numFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);
    const destinationPOI = useSelector(selectNavigationDestinationPOI);
    const accessibility = useSelector(selectUserAccessibility)

    const navigationPath = useSelector(selectNavigationRouteSVG);
    const navigationError = useSelector(selectNavigationError);
    const navigationStatus = useSelector(selectNavigationStatus);
    const [isNavigating,setIsNavigating] = useState(false);


    const [userPosition,setUserPosition] = useState(null);
    const [isFirstUserPosition,setIsFirstUserPosition] = useState(true);
    const [floorIndex,setFloorIndex] = useState(0);
    const [isCentered,setIsCentered] = useState(false);
    const [isRotated,setIsRotated] = useState(false);
    const [isLocked,setIsLocked] = useState(false)

    
    const [isTts,setIsTts] = useState(null);
    const [loadingTts,setLoadingTts] = useState(true);
    const [currentTtsDirection,setCurrentTtsDirection] = useState('');
    const [volume, setVolume] = useState(0.5);


    const [route,setRoute] = useState(null);
    const [loadingPath,setLoadingPath] = useState(true);

    const interval = 390;


    const containerRef = useRef(null);
    const containerRotationRef = useRef(new Animated.Value(0));
    const rotationRef = useRef(new Animated.Value(0)); 
    const [appState, setAppState] = useState(AppState.currentState);
    const [wasInBackground, setWasInBackground] = useState(false);
    const [keepRunning, setKeepRunning] = useState(false);
    
    const lastPositionRef = useRef(null);
    const userFloor = useRef(null);
    const centerOnRef = useRef(null)

    const userHeadingRef  = useRef(new Animated.Value(0)).current;
    const userXRef  = useRef(new Animated.Value(0)).current;
    const userYRef  = useRef(new Animated.Value(0)).current;
    const userZRef  = useRef(new Animated.Value(0)).current;


    const userPositionRef = useRef(null);
    const lastestPositionTimestamp = useRef(new Date())

    const ttl = 3000;

    const positionsQueue = useRef(new PriorityQueueTTL((a, b) => a.timestamp - b.timestamp, ttl));
  
    const onVolumeChange = (newVolume) => {
        setVolume(newVolume);
    }

    const speakDirection = (volume) => {
        Tts.speak(currentTtsDirection,{
            androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: volume,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
              },
        })
    }

    useEffect(() => {
        Tts.getInitStatus().then(() => {
            setIsTts(true);
            Tts.setDefaultLanguage('en-IE');
            Tts.setDefaultRate(0.6);
            Tts.setDefaultPitch(1.5);            
            setLoadingTts(false);
  
        }, (err) => {
          if (err.code === 'no_engine') {
            setIsTts(false)
            setLoadingTts(false);
            Tts.requestInstallEngine();
          }
        });

    },[])

    useEffect(() => {
        switch(navigationStatus){
            case Status.IDLE : {
                break;
            }
            case Status.FAILED: {
                setLoadingPath(false);
                console.log(navigationError)
                break;
            }
            case Status.SUCCEEDED: {
                setLoadingPath(false);
                break;
                
            }
            case Status.PENDING: {
                setLoadingPath(true);
                break;
            }
        }

    },[navigationStatus])

    


    const onBackgroundNavigationExit = () => {
        setWasInBackground(false);
        // BackHandler.exitApp()
        console.log('exiting...')
    }

    const onBackgroundNavigationContinue = () => {

    }

    const onBackgroundNavigationStay = () => {

    }

    const onForegroundNavigationContinue = () => {
        Alert.alert('App State', 'The app was running in the background and has now come to the foreground, switching to normal running.');
        setWasInBackground(false);
    }

    
    const confirmationExit = async () => {
        Alert.alert(
            'Confirmation',
            'Do you want to keep the app running in the background, stay, or exit?',
            [
                {
                    text: 'Run In Background',
                    onPress: () => onBackgroundNavigationContinue(),
                    style: 'cancel'
                },
                {
                    text: 'Stay',
                    onPress: () => onBackgroundNavigationStay(),
                    style: 'default'
                },
                {
                    text: 'Stop And Exit',
                    onPress: () => onBackgroundNavigationExit()
                }
            ],
            { cancelable: false }
        );      
    }

    const confirmationStop = async () => {
        Alert.alert(
            'Confirmation',
            'Stop Navigation? ',
            [
                {
                    text: 'Continue',
                    onPress: () =>  {},
                    style: 'cancel'
                },
                { text: 'Stop', onPress: onStopPress }
            ],
            { cancelable: false }
        );        
    }

    useEffect(() => {
        const backAction = () => {
          confirmationStop();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
    
    }, []); 



    const onDestinationReach = () => {
        Alert.alert("reached destination","reached!");
    }

    const onNext = (value) => {
        const message = value;
        const type = message.type

        // console.log(type,value);
        
        // if(!isNavigating){
        //     if (type === "start"){
        //         setIsNavigating(true);
        //     }else{
        //         onFailedNavigationError();
        //         return;
        //     }
        // }else{
        //     if (type === "start"){
                
        //     }else{

        //     }
        // }        

        switch(type){
            case "start":{
                console.log("STARTT")
                setIsNavigating(true);
                break;
            }
            case "reroute":{
                try{
                    const payload = message.payload;
                    setLoadingPath(true);
                    const newRoute = payload.routeSVG;
                    // console.log("new:",newRoute);
                    
                    // const pathTimeLength = payload.timeLength
                    // const pathDistance = payload.distance;
                    setRoute(newRoute);
                    setLoadingPath(false);
                }catch(error){
                    console.log("error in rereoute parsing", typeof message.payload)
                }   

                break;
            }
            case "position":{
                try{
                    const payload = message.payload;
                    const newUserPosition = payload.userPosition
                    
                    console.log("pos:",newUserPosition, typeof newUserPosition,"timestmap:",payload.timestamp);
                                        
                    
                    const positionTimestamp = new Date(payload.timestamp);
                    if (lastestPositionTimestamp.current && positionTimestamp >= lastestPositionTimestamp.current){
                        // console.log("great")
                        // positionsQueue.current.enqueue({
                        //     userPosition:newUserPosition,
                        //     timestamp:new Date(payload.timestamp)
                        // })
                        setUserPosition(newUserPosition)
                        lastestPositionTimestamp.current = positionTimestamp;
                        
                    }else{
                        console.log("not great", "current:",positionTimestamp, "LASTEST:", lastestPositionTimestamp)
                    }
                
                    
                    

                }catch(error){
                    console.log("error in position",message.payload)
                }
                break;
            }
            case "end":{
                onDestinationReach()
                break;
            }
            case "none":{
                // console.log("recv none");
                break;
            }
            default :{
                break;
            }
        }
      }

      const onError = (value) => {

      }

      const onComplete = () => {



      }

      async function startNavigation() {
        const navigationWebSocketClient = NavigationWebSocketClient.getInstance();
        navigationWebSocketClient.setup(
            building.id,
            destinationPOI.id,
            accessibility,
            mock,
            mock ? mockUserPosition : null,
            null
        );
        await navigationWebSocketClient.start();
         
        NavigationWebSocketClient.getInstance().subscribe({
                next:onNext,
                error:onError,
                complete:onComplete
        })
        return () => {
            navigationWebSocketClient.sendNavigationStopRequest();
            navigationWebSocketClient.stop();
        }
        
      }



      useEffect(() => {
        startNavigation();
        return () => {
            NavigationWebSocketClient.getInstance().stop()
        }
      },[])

        



    const onStopPress = () => {
        props.navigation.navigate("building-map");
    }


    useEffect(() => {
        const cleanup = () => {
            if(isTts){
                Tts.stop();
            }   
            dispatch(setDestinationPOI(null));
            dispatch(clearNavigationRoute());
        }
        return () => cleanup()
    },[])



        // USER CENTERING AND LOCKING


        const getUserCenter = () => {
            if(userPosition){
                return getCenterOn(userPosition.x,userPosition.y)
            }
        }
    
        const getCenterOn = (x,y) => {
            const centerX = mapsDims.width / 2 - mapsDims.width * x / 100
            const centerY = mapsDims.height / 2 - mapsDims.height * y / 100
            return {
                x:centerX,
                y:centerY
            }
            
        }
    
        const centerOnUser = (duration=400) => {
            if(userPosition){     
                const newScale = 0.5       
                const pos = getUserCenter();
                if (pos){
                    const {x,y} = pos;
                    const centerOn = {
                        x: x,
                        y: y,
                        scale: newScale,
                        duration: duration,
                    }
                    containerRef.current.centerOn(centerOn);
                    setIsCentered(true)  
                }
                
    
            }
        }
    
        const onUserCenterPress = () => {
            centerOnUser();
        }
    
        const onUserCenterLockPress = () => {
            if(isCentered && userPosition){
                setIsLocked(true);
            }
        }

        const onPanMove = (data) => {
            const currentState = containerRef.current.getCurrentState()
            // console.log(getUserCenter())
            // console.log(mapContainerRef.current.getCurrentState())
            if(currentState){
                const lastPosition = {
                    x:currentState.lastPositionX,
                    y:currentState.lastPositionY
                }
                if(lastPositionRef.current){
                    const {x,y} = lastPositionRef.current;
                    if (x !== lastPosition.x || y !== lastPosition.y){
                        setIsLocked(false);
                        setIsCentered(false);
                    }
                    lastPositionRef.current = lastPosition
                }
            }
            // setIsCentered(false)
            // setIsLocked(true)
     
        }
    
        // useEffect(() => { // initial user centering
        //     if(userPosition && isFirstUserPosition){
        //         centerOnUser();
        //     }
        // },[userPosition,isFirstUserPosition])

        // useEffect(() => { // change floor
        //     if(userPosition){
        //         const floor = userPosition.floor;
        //         const newFloorIndex = floor - minFloor
        //         if(newFloorIndex !== floorIndex){
        //             setFloorIndex(newFloorIndex);
        //         }
        //     }
        // },[userPosition])

        


        function radiansToDegrees(radians) {
            let degrees = radians * (180 / Math.PI);
            degrees = degrees % 360;
            if (degrees < 0) {
                degrees += 360;
            }
            return degrees;
        }
        
        useEffect(() => { // animating user position
                if(!userPosition){
                    return;
                }
                if(!positionsQueue && positionsQueue.current.isEmpty()){
                    return;
                }
                // const item = positionsQueue.current.dequeue()
                // if(!item){
                //     return;
                // }
                // const newUserPosition = item.userPosition;
                const newUserPosition = userPosition;
                const newHeading = radiansToDegrees(newUserPosition.heading)
                const newXValue = newUserPosition.x;
                const newYValue = newUserPosition.y
                const newZValue = userPosition.z
                const duration = 100;
                // console.log(item)
                // console.log(positionsQueue.current)
                // console.log("pos:",userPosition, "newX", newXValue,"Yvalue:",newYValue)

                Animated.parallel([
                    Animated.timing(userHeadingRef, {
                        toValue: newHeading,
                        duration: duration,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true
                    }),
                    Animated.timing(userXRef, {
                        toValue: newXValue,
                        duration: duration,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true
                    }),
                    Animated.timing(userYRef, {
                        toValue: newYValue,
                        duration: duration,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true
                    }),
                    Animated.timing(userZRef, {
                        toValue: newZValue,
                        duration: duration,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true
                    }),                                    
                ]).start();
                // },interval)



                // console.log("userPOs",userPosition);
    
        
                // if(userFloor.current){
                //     if(userFloor.current !== userPosition.floor){
                //         userFloor.current = userPosition.floor
                //         setFloorIndex(userPosition.floor - minFloor);
                //     }
                // }else{
                //     userFloor.current = userPosition.floor
                //     setFloorIndex(userPosition.floor - minFloor);
                // }
                // return () => {
                //     clearInterval(intervalId);
                // }
        },[userPosition])
    
        useEffect(() => {
            if(userPosition && isLocked){
                centerOnUser(0);
            }
            // if(userFloor.current !== floorIndex + minFloor){
            //     setIsLocked(false);
            //     setIsCentered(false);
            // }
        },[isLocked,userPosition])
    

    return (
        <View style={{flex:1}}>
            {loadingPath && (
                <LoadingModal/>
            )}
            <BuildingMap
                containerRef={containerRef}
                currentFloorIndex={floorIndex}
                cropHeightScale={0}
                cropWidthScale={0}              
                imageProps={{
                    panToMove:true,
                    onMove:onPanMove,
                    minScale:0.3
                }}
                floorChildren={
                    <>
                        <BuildingMapUserPositionOverlay 
                            userHeading={userHeadingRef}
                            userX={userXRef}
                            userY={userYRef}
                        />
                        {!loadingPath && route && (
                            <NavigationRouteSVG
                                currentFloorIndex={floorIndex}
                                route={route}
                            />
                        )}
                    </>
                }
            />
            <MapOverlay>
                <View style={{
                    position:"absolute",
                    zIndex:99,
                    width:"100%",
                }}>
                    <LiveDirectionsView />
                </View>
                <View style={{
                    position:"absolute",
                    left:"40%",
                    bottom:"5%",
                }}>
                    <StopButton onPress={confirmationStop}/>
                </View>
                <View style={{
                    position:"absolute",
                    left:"3%",
                    bottom:"15%",
                }}>
                    <BuildingMapUserCenterButton
                        isCentered={isCentered}
                        isLocked={isLocked}
                        onUserCenterLockPress={onUserCenterLockPress}
                        onUserCenterPress={onUserCenterPress}
                        userPosition={userPosition}
                    />
                </View>

                <View style={{
                    position: "absolute",
                    left: "40%",
                    bottom: "16%",
                }}>
                    <LoadingMessagesWidget/>
                </View>

                <View style={{
                    position:"absolute",
                    top:"10%",
                    right:"2%",
                }}>
                    <Compass
                        rotation={0}
                        onPress={() => {}}
                    />
                </View>    

                <View style={{
                    position:"absolute",
                    bottom:"23%",
                    left:"2%",
                }}>
                    <SpeedMeter/>
                </View>         

                <View style={{
                    position:"absolute",
                    top:"20%",
                    right:"2%",
                }}>
                    <BuildingMapRotateButton
                        onPress={() => {}}

                    />
                </View>                  
                <View style={{
                    position:"absolute",
                    bottom:0,
                    width:"100%",
                    justifyContent:"center",
                }}>
                    <NavigationControlView/> 
                </View>
                <View style={{
                    position:"absolute",
                    bottom:0,
                    right:"8%",
                }}>
                    <VolumeControlButton volume={volume} onVolumeChange={onVolumeChange}/>
                </View>
            </MapOverlay>    
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        color: 'red',
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5,
    },
    infoText: {
        marginHorizontal: 20,
    },
});


        // useEffect(() => {
        //     if(userPosition && isRotated){
        //         Animated.timing(containerRotationRef.current, {
        //             toValue: -userPosition.heading % 360,
        //             duration: 100,
        //             easing: Easing.out(Easing.quad),
        //             useNativeDriver: false
        //         }).start();
        //     }else{
        //         Animated.timing(containerRotationRef.current, {
        //             toValue: 0,
        //             duration: 100,
        //             easing: Easing.out(Easing.quad),
        //             useNativeDriver: false
        //         }).start();
        //     }
        // },[isRotated,userPosition])
    
    
        // const toggleRotation = () => {
        //     setIsRotated(!isRotated)
        // }
    
        // const onRotatePress = () => {
        //     Animated.timing(containerRotationRef.current, {
        //         toValue: (containerRotationRef.current._value +90) % 360,
        //         duration: 100,
        //         easing: Easing.out(Easing.quad),
        //         useNativeDriver: false
        //     }).start();
        // }
    

    //   useEffect(() => {
    //     const handleAppStateChange = (nextAppState) => {
    //         if (
    //             appState.match(/inactive|background/) &&
    //             nextAppState === 'active'
    //         ) {
    //             if (wasInBackground && keepRunning) {
    //                 onForegroundNavigationContinue()
    //             }
    //         } else if (nextAppState === 'background') {
    //             confirmationExit();
    //         }
    //         setAppState(nextAppState);
    //     };

    //     AppState.addEventListener('change', handleAppStateChange);
    //   },[appState])


    //   useFocusEffect(
    //     useCallback(() => {
    //       const onBeforeRemove = (e) => {
    //         e.preventDefault();
    
    //         Alert.alert(
    //           'Exit Confirmation',
    //           'Are you sure you want to exit the app?',
    //           [
    //             { text: 'Cancel', style: 'cancel', onPress: () => {} },
    //             {
    //               text: 'OK',
    //               onPress: () => navigation.dispatch(e.data.action),
    //             },
    //           ]
    //         );
    //       };
    
    //       navigation.addListener('beforeRemove', onBeforeRemove);
    
    //       return () => {
    //         navigation.removeListener('beforeRemove', onBeforeRemove);
    //       };
    //     }, [navigation])
    //   );


export default BuildingNavigationScreen;