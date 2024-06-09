import { selectMap, selectMinFloor, selectNumberOfFloors } from "../../../../app/map/map-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageZoom from "../../../../components/map/image-zoom";

import BuildingMapSVG from "../../../main/building-map/components/building-map/BuildingMapSVG";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../utils/scaling";
import BuildingMapFloorPOIsOverlay from "../../../main/building-map/components/POIs-overlay/BuildingMapFloorPOIsOverlay";
import BuildingMapGraphDataOverlay from "../../../main/components/building-map-graph";
import BuildingMapFloorPOIsAreaOverlay from "../../../main/building-map/components/POIs-overlay/BuildingMapFloorPOIsAreaOverlay";

const AdminBuildingMap = ({floorsOpacities,currentFloorIndex,imageProps={},children}) => {
    const maps = useSelector(selectMap);
    const minFloor = useSelector(selectMinFloor);
    const numOfFloors = useSelector(selectNumberOfFloors);
    const containerRef = useRef(null);
    const initialOpacitiesValues = floorsOpacities.map((opacity, index) => new Animated.Value(opacity));
    const opacitiesRef = useRef(initialOpacitiesValues);
  

    function setOpacities (floorsOpacities) {
        opacitiesRef.current.forEach((opacityRef, index) => {
            Animated.timing(opacityRef, {
                toValue: floorsOpacities[index],
                duration: 500, // Adjust as needed
                useNativeDriver: true
            }).start(() => {
                console.log("Floor opacitiy completed for floor", index);
            });
        });
    }

    useEffect(() => {
        setOpacities(floorsOpacities)
    },[floorsOpacities])

    return (
        <ImageZoom style={styles.container}
            ref={containerRef}
            cropWidth={WINDOW_WIDTH * 0.5}
            cropHeight={WINDOW_HEIGHT * 0.5}
            imageWidth={maps[0].width}
            
            imageHeight={maps[0].height}
            wrapperStyles={{
                
            }}
            minScale={0.3}
            centerOn={null}
            useHardwareTextureAndroid
            useNativeDriver
            panToMove
            enableCenterFocus={false}
            {...imageProps}                   
        >
            <View style={{
                position:"relative"
            }}>
                {Array.from({ length: numOfFloors }, (_, index) => (
                    <Animated.View 
                        key={`map_svg_${index}`} 
                        style={[{ 
                            // opacity: opacitiesRef.current[index],
                            zIndex: currentFloorIndex === index ? 1 : 0,
                            display:currentFloorIndex === index ? "flex" : "none",
                        },styles.floorMapContainer]} 
                        >
                            <BuildingMapSVG
                                data={maps[index]}
                            />
                            <BuildingMapFloorPOIsOverlay 
                                floorIndex={maps[index].floor - minFloor}
                                rotationRef={null}
                                onPOIPress={() => {}}
                            />
                            <BuildingMapFloorPOIsAreaOverlay floorIndex={maps[index].floor - minFloor} />
                            <BuildingMapGraphDataOverlay floorIndex={maps[index].floor - minFloor} />           
                    </Animated.View>
                ))}  
                {children}
            </View>
  
            
        </ImageZoom>                        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        zIndex:0,
    },
    floorMapContainer:{
        height:"100%",
        width:"100%",
    }
})


export default AdminBuildingMap;