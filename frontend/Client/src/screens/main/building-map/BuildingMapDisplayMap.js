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
    const [loading,setLoading] = useState(true);

    const containerRef = useRef(null);
    const rotationRef = useRef(new Animated.Value(0)); 

    const initialOpacitiesValues = Array.from({ length: numberOfFloors }, (_, index) => index + minFloor == 0 ? new Animated.Value(1) : new Animated.Value(0))
    const opacitiesRef = useRef(initialOpacitiesValues);

    const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
    const [centerOn,setCenterOn] = useState(null);
    // const mapStatus = useSelector(selectMapStatus);
    // useEffect(() => {
    //     switch(mapStatus){
    //         case Status.SUCCEEDED:{
    //             setLoading(false);
    //             break;
    //         }   
    //     }
    // }, [mapStatus])

    // if(!loading){
    //     return null;
    // }


    const onPanMove = (data) => {
        setCenterOn(null);
    }


    const onPOIPress = (POI) => {
        containerRef.current.centerOn({
            x: WINDOW_WIDTH /2 - POI.center.x,
            y: (WINDOW_HEIGHT * 3 / 5  - POI.center.y) * -1,
            scale: 2,
            duration: 300,
        })
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

    
    useEffect(() => {
        toggleTest()
    },[currentFloorIndex])

    const [userPosition,setUserPosition] = useState({
        timestamp:null,
        floor:null,
        x:null,
        y:null,
    });


    return (
        <View style={styles.container}> 
            <Button title="clickme" onPress={test}/>
            <BuildingMapButtonsOverlay
                centerOn={centerOn}
                containerRef={containerRef} 
            />                    
            <BuildingMapWidgetsOverlay  />
             
            <BuildingMap 
                centerOn={centerOn}
                containerRef={containerRef}
                opacitiesRef={opacitiesRef}
                currentFloorIndex={currentFloorIndex}
                rotationRef={rotationRef}
                onPanMove={onPanMove}
                rotateChildren={true}
                onPOIPress={onPOIPress}
            >
                <BuildingMapUserPositionOverlay 
                        opacitiesRef={opacitiesRef} 
                        rotationRef={rotationRef} 
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