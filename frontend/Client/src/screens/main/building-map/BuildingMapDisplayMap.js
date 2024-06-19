import { Animated, BackHandler, Button, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BuildingMapButtonsOverlay from "./components/buttons-overlay/BuildingMapButtonsOverlay";
import BuildingMapWidgetsOverlay from "./components/widgets-overlay/BuildingMapWidgetsOverlay";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import BuildingMap from "../components/BuildingMap";
import {  selectFloorAltitudes, selectMinFloor, selectNumberOfFloors } from "../../../app/map/map-slice";
import { useSelector } from "react-redux";
import BuildingMapUserPositionOverlay from "./components/user-position-overlay/BuildingMapUserPositionOverlay";
import DropDownPicker from "react-native-dropdown-picker";
import BuildingMapLoadingOverlay from "./components/loading-messages";
import { useFocusEffect } from "@react-navigation/native";
import BackButton from "../../../components/general/buttons/back-button";
import { selectActiveBuilding } from "../../../app/active/active-slice";
import { UserIndoorPositionService } from "../../../position/user-indoor-position";
import useLoadingMessages from "../../../hooks/useLoadingMessages";
import client from "../../../services/server/api-client";



const BuildingMapDisplayMap = ({backAction}) => {
    const {addLoadingMessage,resetLoadingMessage} = useLoadingMessages();
    const numberOfFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);
    const selectedBuilding = useSelector(selectActiveBuilding);
    const floorAltitudes = useSelector(selectFloorAltitudes);
    // const selectedBuildingMap = useSelector()
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

    const userCoordinates = useRef(null);
    const userRotation = useRef(null);
    const userFloor = useRef(null);
    const mapRotation = useRef(new Animated.Value(0));

    // const userCoordinates = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    // const userRotation = useRef(new Animated.Value(0)).current;

    const opacitiesRef = useRef(initialOpacitiesValues);
    const centerOnRef = useRef(null)
    const startMessageCallbackRef = useRef(null);
    const messageCallbackRef = useRef(null);



    const prevUserBuildingMapCoordinates = useRef({ x: 0, y: 0 });


    const [isInitUserPosition,setIsInitUserPositon] = useState(false);
    const [isStreamStarted, setIsStreamStarted] = useState(false);


    const [isLock,setIsLock] = useState(false)
    const [floorIndex,setFloorIndex] = useState(0);
    const [openDropdown,setOpenDropdown] = useState(false)





    useLayoutEffect(() => {
        startMessageCallbackRef.current = addLoadingMessage("loading spatial data stream");
        UserIndoorPositionService.getInstance().setBuildingBoundary(selectedBuilding['geoArea'])
        UserIndoorPositionService.getInstance().setBuildingId(selectedBuilding.id);
        UserIndoorPositionService.getInstance().setFloorAltitudes(floorAltitudes);

        UserIndoorPositionService.getInstance().startStream().then(() => {
            if (startMessageCallbackRef.current){
                startMessageCallbackRef.current()
                startMessageCallbackRef.current = addLoadingMessage("loading user position");
            }
            setIsStreamStarted(true);
        });
    },[])


    const onCoordinatesChange = (x,y) => {
        if(userCoordinates.current){
            Animated.timing(userCoordinates.current, {
                toValue: {
                    x:x,
                    y:y
                },
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false,
            }).start();
        }
    }

    const onRotationChange = (z) => {
        if(userRotation.current){
            Animated.timing(userRotation.current, {
                toValue: z,
                duration: 100,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false,
            }).start();
        }
    }

    const onUserFloorChange = (floor) => {
        if(userFloor.current){
            if(userFloor.current !== floor){
                userFloor.current = floor
            }
        }
    }

    const updatePosition = (floor,x,y,z) => {
        onUserFloorChange(floor);
        onCoordinatesChange(x,y);
        onRotationChange(z);
    }

    const onLeave = () => {
        setIsStreamStarted(false);
        setIsInitUserPositon(false);
        resetLoadingMessage();
        userCoordinates.current = null;
        userRotation.current = null;
    }

    useFocusEffect(
        useCallback(() => {
            if(isStreamStarted){
                
                UserIndoorPositionService.getInstance().subscribe({
                    next:(value) => {
                        if(value){
                            const {floor,x,y,z} = value.position;
                            updatePosition(floor,x,y,z)
                            if(!isInitUserPosition){
                                setIsInitUserPositon(true)
                                userCoordinates.current = new Animated.ValueXY({ x: x, y: y })
                                userRotation.current = new Animated.Value(z)
                                userFloor.current = floor;
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
                                console.log("failed")
                            }                               
                        }

                    },
                    complete: () => {
                        console.log("wtf")
                        onLeave();
                    },
                    error: () => {
                        console.log("err")
                    },
                    
                })

            }



        },[isStreamStarted])
    );


    useFocusEffect(
        useCallback(() => {
            const cleanup = () => {
                console.log("left")
                UserIndoorPositionService.getInstance().stopStream();
                onLeave()
            }
            return cleanup;
        },[])
    );

    const onInitUserPosition = () => {
        setIsInitUserPositon(true);
    }

    const centerListener = (x,y) => {
        centerOnRef.current = { 
            x, 
            y,
            // duration:100,
        };
    }

    const lockOnUser = () => {
        if(isInitUserPosition && !isLock){
            userBuildingMapCoordinates.addListener(centerListener);
            setIsLock(true);
        }
    }

    const stopLockOnUser = () => {
        if(isLock){
            userBuildingMapCoordinates.removeListener(centerListener);
        }
        
    }


    useEffect(() => {
        if(centerOnRef.current == null) { 

        }else{

        }
    },[centerOnRef.current])



    const onPanMove = (data) => {
        stopLockOnUser();
        centerOnRef.current = null;
    }

    const setCenterOn = (x,y,scale,duration=300) => {
        containerRef.current.centerOn({
            x: x,
            y: y,
            scale: scale,
            duration: duration,
        })
    }

    const stopCenterOn = () => {
        containerRef.current.centerOn(null)
    }

    const getCenterOn = () => {
        containerRef.current
    }


    const onFloorChange = (floor) => {
        const newFloor = floor - minFloor
        if(floorIndex != newFloor){
            setFloorIndex(newFloor);
        }
        
    }

    const onBackPress = () => {
        backAction && backAction();
    }


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
                    {userFloor.current != null && userFloor.current !== floorIndex + minFloor && (
                        <Text style={{
                            color:'red',
                            // textAlign:'center',
                            marginLeft:20,
                        }}>
                            You are on floor {userFloor.current}
                        </Text>
                    )}
                </View>
            </View>

            <BuildingMapButtonsOverlay
                centerOnRef={centerOnRef}
                userCoordinatesRef={userCoordinates}
                userPositionRef={userRotation}
                mapContainerRef={mapContainerRef}
                mapRotationRef={mapRotation}
                
            />                    
            <BuildingMapWidgetsOverlay  />
             
            <BuildingMap 
                centerOn={centerOnRef.current}
                containerRef={mapContainerRef}
                opacitiesRef={opacitiesRef}
                currentFloorIndex={floorIndex}
                rotationRef={rotationRef}
                onPanMove={onPanMove}
                rotateChildren={true}
                onPOIPress={() => {}}
            >
                {userFloor.current != null && userFloor.current === floorIndex + minFloor && (
                    <BuildingMapUserPositionOverlay 
                        userCoordinatesRef={userCoordinates}
                        userRotationRef={userRotation}
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