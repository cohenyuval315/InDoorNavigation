import { Animated, BackHandler, Button, StyleSheet, View } from "react-native";
import BuildingMapButtonsOverlay from "./components/buttons-overlay/BuildingMapButtonsOverlay";
import BuildingMapWidgetsOverlay from "./components/widgets-overlay/BuildingMapWidgetsOverlay";
import { useEffect, useRef, useState } from "react";
import BuildingMap from "../components/BuildingMap";
import { selectMapStatus, selectMinFloor, selectNumberOfFloors } from "../../../app/map/map-slice";
import { selectActivePOI } from "../../../app/active/active-slice";
import { useSelector } from "react-redux";
import BuildingMapUserPositionOverlay from "./components/user-position-overlay/BuildingMapUserPositionOverlay";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../utils/scaling";
import { openConfirm } from "../../../components/modals/confirmation/ConfirmationModal";
import useGPS from "../../../hooks/useGPS";
import Status from "../../../app/status";

const BuildingMapDisplayMap = () => {
    const numberOfFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);
    const selectedActivePOI = useSelector(selectActivePOI);

    const containerRef = useRef(null);
    const rotationRef = useRef(new Animated.Value(0)); 

    const initialOpacitiesValues = Array.from({ length: numberOfFloors }, (_, index) => index + minFloor == 0 ? new Animated.Value(1) : new Animated.Value(0))
    const opacitiesRef = useRef(initialOpacitiesValues);

    const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
    const centerOnRef = useRef(null)

    const userBuildingMapCoordinates = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const prevUserBuildingMapCoordinates = useRef({ x: 0, y: 0 });
    const [isInitUserPosition,setIsInitUserPositon] = useState(false);
    const [isLock,setIsLock] = useState(false)

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
        console.log("CTNER CURRENT",centerOnRef.current)
        if(centerOnRef.current == null) { 

        }else{

        }
    },[centerOnRef.current])



    const onPanMove = (data) => {
        // setCenterOn(null);
        // containerRef.current.reset()
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


    const onPOIPress = (POI) => {
        // containerRef.current.centerOn({
        //     x: POI.center.x,
        //     y: (WINDOW_HEIGHT - POI.center.y) * -1,
        //     scale: 2,
        //     duration: 300,
        // })
        const newOpacities = opacitiesRef.current.map((_,index) => POI.floor === minFloor + index ? 1 : 0);
        opacitiesRef.current.forEach((opacityRef, index) => {
            Animated.timing(opacityRef, {
                toValue: newOpacities[index],
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                console.log("Animation completed for floor", minFloor + index);
            });
        });  
    }


    useEffect(() => {
        if(selectedActivePOI === null){
            // containerRef.current.reset();
            containerRef.current.resetScale();
        }
    },[selectedActivePOI])





    const test = () => {
        console.log("toogle")
        setCurrentFloorIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
    }

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         userBuildingMapCoordinates.setValue({ x: 20, y: 20, floor: -1 });
    //     }, 5000);

    //     const listener = userBuildingMapCoordinates.addListener(({ floor }) => {
    //         if (floor  !== prevUserBuildingMapCoordinates.current.floor) {
    //             console.log('floor changed:', floor);
    //             setCurrentFloorIndex(floor - minFloor);
    //             prevUserBuildingMapCoordinates.current.floor = floor;
    //         }
    //     });
    //     return () => {
    //         userBuildingMapCoordinates.removeListener(listener);
    //         clearTimeout(timeoutId);
    //     };        
    // },[])

    // useEffect(() => {
    //     setTimeout(() => {
    //         userBuildingMapCoordinates.setValue({ x: 20, y: 20, floor: -1 });
    //     }, 5000)
    // },[])

    const toggleTest = () => {
        const newOpacities = opacitiesRef.current.map((_, index) =>
          currentFloorIndex === index ? 1 : 0
        );
    
        opacitiesRef.current.forEach((opacityRef, index) => {
          Animated.timing(opacityRef, {
            toValue: newOpacities[index],
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            console.log("Animation completed for floor", index);
          });
        });
    };

    // const setCenterOn 

    
    useEffect(() => {
        toggleTest()
    },[currentFloorIndex])

    const [userPosition,setUserPosition] = useState({
        timestamp:null,
        floor:null,
        x:null,
        y:null,
    });

    const onFloorChange = (floor) => {
        const newFloor = floor - minFloor
        if(currentFloorIndex != newFloor){
            setCurrentFloorIndex(newFloor);
        }
        
    }

    return (
        <View style={styles.container}> 
            <Button title="clickme" onPress={test}/>
            <BuildingMapButtonsOverlay
                isInitUserPosition={isInitUserPosition}
                centerOnRef={centerOnRef}
                userPositionRef={userBuildingMapCoordinates}
                
            />                    
            <BuildingMapWidgetsOverlay  />
             
            <BuildingMap 
                centerOn={centerOnRef.current}
                containerRef={containerRef}
                opacitiesRef={opacitiesRef}
                currentFloorIndex={currentFloorIndex}
                rotationRef={rotationRef}
                onPanMove={onPanMove}
                rotateChildren={true}
                onPOIPress={onPOIPress}
            >
                <BuildingMapUserPositionOverlay 
                    userPositionRef={userBuildingMapCoordinates}
                    onFloorChange={onFloorChange}
                    onInitUserPosition={onInitUserPosition}
                />  
            </BuildingMap>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default BuildingMapDisplayMap;