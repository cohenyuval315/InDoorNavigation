import {  BackHandler, Button, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Animated } from "react-native";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { selectMap, selectMapsDims, selectMinFloor, selectNumberOfFloors } from "../../../app/map/map-slice";
import { useDispatch, useSelector } from "react-redux";
import BuildingMapUserPositionOverlay from "../components/building-map-user-position/BuildingMapUserPositionOverlay";
import { useFocusEffect } from "@react-navigation/native";
import { selectActiveBuilding, selectActivePOI } from "../../../app/active/active-slice";
import { UserIndoorPositionService } from "../../../services/UserIndoorPositionService";
import useLoadingMessages from "../../../hooks/useLoadingMessages";
import {  selectUserPosition, setUserPosition } from "../../../app/navigation/navigation-slice";
import BuildingMap from "../../../components/features/building/map";
import MapOverlay from "../../../layouts/map-overlay";
import LoadingMessagesWidget from "../../../components/features/widgets/loading-messages";
import BuildingMapWarningButton from "../components/buttons/building-map-warning";
import BuildingMapUserCenterButton from "../components/buttons/center";
import Compass from "../../../components/features/sensors/compass/Compass";
import SpeedMeter from "../../../components/features/sensors/speed-meter/SpeedMeter";
import FloorLevelSelector from "../../../components/features/floors/dropdown";
import BuildingMapRotateButton from "../components/buttons/rotate";



import Reanimated , { Easing as reEasing } from 'react-native-reanimated';

const { timing } = Reanimated;


const BuildingMapDisplayMap = () => {
    const {addLoadingMessage,resetLoadingMessage} = useLoadingMessages();
    const dispatch = useDispatch()
    const maps = useSelector(selectMap);
    const mapsDims = useSelector(selectMapsDims);
    const minFloor = useSelector(selectMinFloor);
    const numFloors = useSelector(selectNumberOfFloors);
    const selectedBuilding = useSelector(selectActiveBuilding);
    const activePOI = useSelector(selectActivePOI);
    const userPosition = useSelector(selectUserPosition);

    const [isInitUserPosition,setIsInitUserPositon] = useState(false);
    const [isStreamStarted, setIsStreamStarted] = useState(false);
    const [floorIndex,setFloorIndex] = useState(0);
    const [isCentered,setIsCentered] = useState(false);
    const [isLocked,setIsLocked] = useState(false)
    const [isRotated,setIsRotated] = useState(false);
    
    const floors = Array.from({length:numFloors}).map((_,index) => {
        return {
            label: `floor ${index + minFloor}`,
            value: index
        }
    })
    const initialOpacitiesValues = Array.from({ length: numFloors }, (_, index) => index + minFloor == 0 ? new Animated.Value(1) : new Animated.Value(0))

    const imageWidth = mapsDims.width
    const imageHeight = mapsDims.height
    const scale = mapsDims.scale
    const minScale = 0.3;
    const cropWidthScale = 0;
    const cropHeightScale = 0;


    const mapContainerRef = useRef(null);
    const rotationRef = useRef(new Animated.Value(0)); 
    const containerRotationRef = useRef(new Animated.Value(0)); 
    const lastPositionRef = useRef(null);
    const userFloor = useRef(null);
    const centerOnRef = useRef(null)
    const startMessageCallbackRef = useRef(null);
    const messageCallbackRef = useRef(null);

    const userHeadingRef  = useRef(new Animated.Value(0)).current;
    const userXRef  = useRef(new Animated.Value(0)).current;
    const userYRef  = useRef(new Animated.Value(0)).current;
    const userZRef  = useRef(new Animated.Value(0)).current;


    // DATA STREAM

    useLayoutEffect(() => {
        startMessageCallbackRef.current = addLoadingMessage("loading spatial data stream");
        
        const buildingMapData = {
            buildingId:selectedBuilding.id,
            mapFloors:maps,
            mapHeading:mapsDims.mapHeading,
            geoArea:selectedBuilding.geoArea,
            mapWidth:mapsDims.width,
            mapHeight:mapsDims.height,
            scale:mapsDims.scale,
            zScale:mapsDims.zScale
        }

        UserIndoorPositionService.getInstance().setBuildingData(buildingMapData)
        UserIndoorPositionService.getInstance().startStream().then(() => {
            if (startMessageCallbackRef.current){
                startMessageCallbackRef.current()
                startMessageCallbackRef.current = addLoadingMessage("loading user position");
            }
            setIsStreamStarted(true);
        });

        return () => {
            UserIndoorPositionService.getInstance().stopStream()
        }
    },[])

    useFocusEffect(
        useCallback(() => {
            const cleanup = () => {
                console.log("cleanup")
                UserIndoorPositionService.getInstance().stopStream();
                onLeave()
            }
            return cleanup;
        },[])
    );

    useFocusEffect(
        useCallback(() => {
            if(isStreamStarted){
                UserIndoorPositionService.getInstance().subscribe({
                    next:(value) => onNext(value),
                    complete: () => onComplete(),
                    error: (error) => onError(error),
                })
            }
        },[isStreamStarted])
    );

    const onNext = (value) => {
        if(value){
            dispatch(setUserPosition(value.position))
            // setUserPosition(value.position);
            if(!isInitUserPosition){
                setIsInitUserPositon(true)
                if (startMessageCallbackRef.current){
                    startMessageCallbackRef.current();
                    startMessageCallbackRef.current = null;
                }     
                if (messageCallbackRef.current){         
                    messageCallbackRef.current()    
                    messageCallbackRef.current = null;
                }              
            }
        }else{
            if (messageCallbackRef.current){
                messageCallbackRef.current = addLoadingMessage("loading user position");
             
            }                               
        }
    }

    const onComplete = () => {
        onLeave();
    }

    const onError = (error) => {

    }

    const onLeave = () => {
        setIsStreamStarted(false);
        setIsInitUserPositon(false);
        resetLoadingMessage();
        // userCoordinates.current = null;
        // userRotation.current = null;

    }



    // USER CENTERING AND LOCKING


    const getUserCenter = () => {
        if(userPosition && isInitUserPosition){
            return getCenterOn(userPosition.x,userPosition.y)
        }
    }

    const getCenterOn = (x,y) => {
        const centerX = imageWidth / 2 - imageWidth * x / 100
        const centerY = imageHeight / 2 - imageHeight * y / 100
        return {
            x:centerX,
            y:centerY
        }
        
    }

    const centerOnUser = (duration=400) => {
        if(userPosition && userFloor.current === floorIndex + minFloor){     
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
                mapContainerRef.current.centerOn(centerOn);
                setIsCentered(true)  
            }
            

        }
    }

    const onUserCenterPress = () => {
        centerOnUser();
    }

    const onUserCenterLockPress = () => {
        if(isCentered && userPosition && userFloor.current === floorIndex + minFloor){
            setIsLocked(true);
        }
    }



    // POINT OF INTEREST CENTERING

    const onPOIPress = (POI) => {
        // stay empty
    }

    useEffect(() => {
        if(activePOI){
            setFloorIndex(activePOI.center.floor - minFloor)
            const {x,y} = getCenterOn(activePOI.center.x * 100  / imageWidth,activePOI.center.y * 100 / imageHeight)
            const centerOn = {
                x: x,
                y: y - 100,
                scale: 1,
                duration: 400,
            }
            mapContainerRef.current.centerOn(centerOn);
        }
    },[activePOI])
    


    const animateUserPosition = (userPosition) => {

        const newHeading = radiansToDegrees(userPosition.heading);
        const newXValue = 100 * userPosition.x / mapsDims.width;
        const newYValue = 100 * userPosition.y / mapsDims.height;
        const newZValue = userPosition.z;
        const duration = 100;
    
        timing(userHeadingRef, {
            toValue: newHeading,
            duration: duration,
            easing: reEasing.out(reEasing.quad),
            useNativeDriver: true,
        }).start();
    
        timing(userXRef, {
            toValue: newXValue,
            duration: duration,
            easing: reEasing.out(reEasing.quad),
            useNativeDriver: true,
        }).start();
    
        timing(userYRef, {
            toValue: newYValue,
            duration: duration,
            easing: reEasing.out(reEasing.quad),
            useNativeDriver: true,
        }).start();
    
        timing(userZRef, {
            toValue: newZValue,
            duration: duration,
            easing: reEasing.out(reEasing.quad),
            useNativeDriver: true,
        }).start();
    };
    // ANIMATIONS
    
    useEffect(() => {
        if(!userPosition){
            return;
        }
        const duration = 100;
        Animated.parallel([
            Animated.timing(userHeadingRef, {
                toValue: userPosition.heading,
                duration: duration,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),
            Animated.timing(userXRef, {
                toValue: userPosition.x,
                duration: duration,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),
            Animated.timing(userYRef, {
                toValue: userPosition.y,
                duration: duration,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),
            Animated.timing(userZRef, {
                toValue: userPosition.z,
                duration: duration,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),                                    
        ]).start();

        if(userFloor.current){
            if(userFloor.current !== userPosition.floor){
                userFloor.current = userPosition.floor
                setFloorIndex(userPosition.floor - minFloor);
            }
        }else{
            userFloor.current = userPosition.floor
            setFloorIndex(userPosition.floor - minFloor);
        }

    },[userPosition])

    useEffect(() => {
        if(userPosition && isLocked){
            centerOnUser(0);
        }
        if(userFloor.current !== floorIndex + minFloor){
            setIsLocked(false);
            setIsCentered(false);
        }
    },[isLocked,userPosition,floorIndex])

    useEffect(() => {
        if(userPosition && isRotated){
            Animated.timing(containerRotationRef.current, {
                toValue: -userPosition.heading % 360,
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }).start();
        }else{
            Animated.timing(containerRotationRef.current, {
                toValue: 0,
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }).start();
        }
    },[isRotated,userPosition])


    const toggleRotation = () => {
        setIsRotated(!isRotated)
    }

    const onRotatePress = () => {
        Animated.timing(containerRotationRef.current, {
            toValue: (containerRotationRef.current._value +90) % 360,
            duration: 100,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false
        }).start();
    }


    const onPanMove = (data) => {
        const currentState = mapContainerRef.current.getCurrentState()
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
        // setIsLocked(false);
        // setIsCentered(false);
 
    }






    return (
        <View style={styles.container}>              
            <BuildingMap 
                cropWidthScale={cropWidthScale}
                cropHeightScale={cropHeightScale}
                containerRef={mapContainerRef}
                currentFloorIndex={floorIndex}
                onPOIPress={onPOIPress}
                imageProps={{
                    centerOn:centerOnRef.current,
                    onMove:onPanMove,
                    panToMove:true,
                    minScale:minScale,
                    enableCenterFocus:false
                }}
                fixedMapChildren={
                    <>
                        {userFloor.current != null && userFloor.current === floorIndex + minFloor && (
                            <BuildingMapUserPositionOverlay 
                                userX={userXRef}
                                userY={userYRef}
                                userHeading={userHeadingRef}
                            /> 
                        )}                    
                    </>
                }
            />

            <MapOverlay>
                <View style={{
                    position:"absolute",
                    bottom:"23%",
                    right:"3%",
                }}>
                    <BuildingMapWarningButton
                        userPosition={userPosition}
                        selectedFloor={floorIndex}
                        userFloor={userFloor}
                    />
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
                        onPress={onRotatePress}

                    />
                </View>      

                <View style={{
                    position:"absolute",
                    bottom:"16.5%",
                    right:"2%",
                }}>
                    <FloorLevelSelector
                        floors={floors}
                        selectedFloor={floorIndex}
                        onFloorChange={setFloorIndex}
                    />
                </View>    
            
            </MapOverlay>               
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default BuildingMapDisplayMap;