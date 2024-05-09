import { selectMap, selectMinFloor, selectNumberOfFloors } from "../../../../app/map/map-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageZoom from "../../../../components/map/image-zoom";

import BuildingMapSVG from "../../../main/building-map/components/building-map/BuildingMapSVG";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../utils/scaling";
import BuildingMapFloorPOIsOverlay from "../../../main/building-map/components/POIs-overlay/BuildingMapFloorPOIsOverlay";

const AdminBuildingMap = ({floorsOpacities,imageProps={},children}) => {
    const maps = useSelector(selectMap);
    const minFloor = useSelector(selectMinFloor);
    const containerRef = useRef(null);
    const initialOpacitiesValues = Array.from({ length: floorsOpacities }, (opacity, index) => new Animated.Value(opacity));
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

    console.log('full render')
    return (
        <ImageZoom style={styles.container}
            ref={containerRef}
            cropWidth={WINDOW_WIDTH}
            cropHeight={WINDOW_HEIGHT}
            imageWidth={WINDOW_WIDTH}
            imageHeight={WINDOW_HEIGHT}
            minScale={1}
            useHardwareTextureAndroid
            useNativeDriver
            panToMove
            enableCenterFocus
            {...imageProps}                  
        >
            {Array.from({ length: floorsOpacities }, (_, index) => (
                <Animated.View 
                    key={`map_svg_${index}`} 
                    style={[{ 
                        opacity: opacitiesRef.current[index],
                        zIndex: Math.round(opacitiesRef.current[index]._value) + 1,
                    },styles.floorMapContainer]} 
                    >
                        <BuildingMapSVG
                            data={maps[index]}
                            width={WINDOW_WIDTH}
                            height={WINDOW_HEIGHT}
                        />
                        <BuildingMapFloorPOIsOverlay 
                            floorIndex={maps[index].floor}
                            onPOIPress={() => {}}
                        />
                </Animated.View>
            ))}    
            {children}
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