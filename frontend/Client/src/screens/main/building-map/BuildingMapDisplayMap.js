import { Animated, BackHandler, Button, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BuildingMapButtonsOverlay from "./components/buttons-overlay/BuildingMapButtonsOverlay";
import BuildingMapWidgetsOverlay from "./components/widgets-overlay/BuildingMapWidgetsOverlay";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import BuildingMap from "../components/BuildingMap";
import {  selectFloorAltitudes, selectMap, selectMinFloor, selectNumberOfFloors, selectUnitInMeters } from "../../../app/map/map-slice";
import { useDispatch, useSelector } from "react-redux";
import BuildingMapUserPositionOverlay from "./components/user-position-overlay/BuildingMapUserPositionOverlay";
import DropDownPicker from "react-native-dropdown-picker";
import BuildingMapLoadingOverlay from "./components/loading-messages";
import { useFocusEffect } from "@react-navigation/native";
import BackButton from "../../../components/general/buttons/back-button";
import { selectActiveBuilding, selectActivePOI } from "../../../app/active/active-slice";
import { UserIndoorPositionService } from "../../../services/UserIndoorPositionService";
import useLoadingMessages from "../../../hooks/useLoadingMessages";
import client from "../../../server/api-client";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../utils/scaling";
import {  selectUserPosition, setUserPosition } from "../../../app/navigation/navigation-slice";



const BuildingMapDisplayMap = ({backAction}) => {
    const dispatch = useDispatch()
    const maps = useSelector(selectMap);
    const unitInMeters = useSelector(selectUnitInMeters);
    const {addLoadingMessage,resetLoadingMessage} = useLoadingMessages();
    const numberOfFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);
    const selectedBuilding = useSelector(selectActiveBuilding);
    const floorAltitudes = useSelector(selectFloorAltitudes);

    const userPosition = useSelector(selectUserPosition);

    
    const numFloors = useSelector(selectNumberOfFloors);

    const floors = Array.from({length:numFloors}).map((_,index) => {
        return {
            label: `floor ${index + minFloor}`,
            value: index
        }
    })
    const initialOpacitiesValues = Array.from({ length: numberOfFloors }, (_, index) => index + minFloor == 0 ? new Animated.Value(1) : new Animated.Value(0))
    


    const mapContainerRef = useRef(null);
    const rotationRef = useRef(new Animated.Value(0)); 
    const containerRotationRef = useRef(new Animated.Value(0)); 
    const lastPositionRef = useRef(null);

    const userCoordinates = useRef(null);
    const userRotation = useRef(null);
    const userFloor = useRef(null);
    const mapRotation = useRef(new Animated.Value(0));

    const opacitiesRef = useRef(initialOpacitiesValues);
    const centerOnRef = useRef(null)
    const startMessageCallbackRef = useRef(null);
    const messageCallbackRef = useRef(null);

    const activePOI = useSelector(selectActivePOI);



    const [isInitUserPosition,setIsInitUserPositon] = useState(false);
    const [isStreamStarted, setIsStreamStarted] = useState(false);


    
    const [floorIndex,setFloorIndex] = useState(0);
    const [openDropdown,setOpenDropdown] = useState(false)

    // const [userPosition,setUserPosition] = useState(null);
    

    const [isCentered,setIsCentered] = useState(false);
    const [isLocked,setIsLocked] = useState(false)
    const [isRotated,setIsRotated] = useState(false);
    const [isAutomaticUpdate, setIsAutomaticUpdate] = useState(false); // Flag to track automatic updates


    const imageWidth = maps[floorIndex].width
    const imageHeight = maps[floorIndex].height
    const minScale = 0.3;
    const cropWidthScale = 0;
    const cropHeightScale = 0;
    

    useLayoutEffect(() => {
        const normalHeadingToAfeka = 180
        startMessageCallbackRef.current = addLoadingMessage("loading spatial data stream");
        UserIndoorPositionService.getInstance().setBuildingData({
                buildingId:selectedBuilding.id,
                floorAltitudes:floorAltitudes,
                normalHeading:normalHeadingToAfeka,
                buildingBoundaryBox:selectedBuilding['geoArea'],
                mapWidth:imageWidth,
                mapHeight:imageHeight,
                unitInMeters:unitInMeters,
                displacement:{dx:unitInMeters,dy:unitInMeters}
            })


        UserIndoorPositionService.getInstance().startStream().then(() => {
            if (startMessageCallbackRef.current){
                startMessageCallbackRef.current()
                startMessageCallbackRef.current = addLoadingMessage("loading user position");
            }
            setIsStreamStarted(true);
        });
    },[])

 

    const onUserFloorChange = (floor) => {
        if(userFloor.current){
            if(userFloor.current !== floor){
                userFloor.current = floor
            }
        }else{
            userFloor.current = floor
        }
    }


    const onLeave = () => {
        setIsStreamStarted(false);
        setIsInitUserPositon(false);
        resetLoadingMessage();
        userCoordinates.current = null;
        userRotation.current = null;

    }

    const userHeadingRef  = useRef(new Animated.Value(0)).current;
    const userXRef  = useRef(new Animated.Value(0)).current;
    const userYRef  = useRef(new Animated.Value(0)).current;
    const userZRef  = useRef(new Animated.Value(0)).current;

    
    useEffect(() => {
        if(!userPosition){
            return;
        }
        Animated.parallel([
            Animated.timing(userHeadingRef, {
                toValue: userPosition.heading,
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }),
            Animated.timing(userXRef, {
                toValue: userPosition.x,
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }),
            Animated.timing(userYRef, {
                toValue: userPosition.y,
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }),
            Animated.timing(userZRef, {
                toValue: userPosition.z,
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }),                                    
        ]).start();

        if(userFloor.current){
            if(userFloor.current !== userPosition.floor){
                userFloor.current = userPosition.floor
                setFloorIndex(userPosition.floor - minFloor);
            }
        }else{
            userFloor.current = userPosition.floor
            console.log(userPosition.floor)
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
                useNativeDriver: false
            }).start();
        }else{
            Animated.timing(containerRotationRef.current, {
                toValue: 0,
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false
            }).start();
        }
    },[isRotated,userPosition])

    useFocusEffect(
        useCallback(() => {
            if(isStreamStarted){
                
                UserIndoorPositionService.getInstance().subscribe({
                    next:(value) => {
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

                    },
                    complete: () => {
                    
                        onLeave();
                    },
                    error: () => {
                        
                    },
                    
                })

            }



        },[isStreamStarted])
    );


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
 
    }


    const onBackPress = () => {
        backAction && backAction();
    }

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

    const onPOIPress = (POI) => {
        // stay empty
    }

    useEffect(() => {
        if(activePOI){
            setFloorIndex(activePOI.center.floor - minFloor)
            const {x,y} = getCenterOn(activePOI.center.x * 100  / imageWidth,activePOI.center.y * 100 / imageHeight)
            const centerOn = {
                x: x,
                y: y,
                scale: 1,
                duration: 400,
            }
            mapContainerRef.current.centerOn(centerOn);
        }
    },[activePOI])




    return (
        <View style={styles.container}> 
            <View style={{
                position:"absolute",
                zIndex:999,
                backgroundColor:'rgba(0, 0, 0, 0.7)',
            }}>
                <View style={{
                    flex:1,
                    flexDirection:"row",
                    // backgroundColor:'rgba(0, 0, 0, 0.7)',
                    alignItems:'center',
                }}>
                    <BackButton onBackPress={onBackPress}/>
                    <DropDownPicker
                    style={{
                        maxWidth:"70%"
                    }}
                            items={floors}
                            open={openDropdown}
                            setOpen={setOpenDropdown}
                            setValue={setFloorIndex}
                            value={floorIndex}
                            listMode="MODAL"
                        />
                </View>
                <View style={{
                    height:30,
                    width:"100%"
                }}>
                    
                        <Text style={{
                            color:'red',
                            marginLeft:20,
                        }}>
                        {!userPosition ? "no position yet..." : userFloor.current != null && userFloor.current !== floorIndex + minFloor && 
                            `You are on floor ${userFloor.current}`
                        }
                        </Text>
                </View>
            </View>

            <BuildingMapButtonsOverlay
                isCentered={isCentered}
                isLocked={isLocked}
                onUserCenterPress={onUserCenterPress}
                onUserCenterLockPress={onUserCenterLockPress}
                isRotated={isRotated}
                toggleRotation={toggleRotation}
                onRotatePress={onRotatePress}
                
            />                    
            <BuildingMapWidgetsOverlay  />
             
            <BuildingMap 
                minScale={minScale}
                cropWidthScale={cropWidthScale}
                cropHeightScale={cropHeightScale}
                centerOn={centerOnRef.current}
                containerRef={mapContainerRef}
                opacitiesRef={opacitiesRef}
                currentFloorIndex={floorIndex}
                rotationRef={rotationRef}
                containerRotationRef={containerRotationRef}
                onPanMove={onPanMove}
                rotateChildren={true}
                onPOIPress={onPOIPress}
                
            >
                {userFloor.current != null && userFloor.current === floorIndex + minFloor && (
                    <BuildingMapUserPositionOverlay 
                        userX={userXRef}
                        userY={userXRef}
                        userHeading={userHeadingRef}
                    /> 
                )}
 
 
            </BuildingMap>

            <BuildingMapLoadingOverlay />
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default BuildingMapDisplayMap;