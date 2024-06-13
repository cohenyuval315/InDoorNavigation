import { useDispatch, useSelector } from "react-redux";
import { selectMap, selectMapError, selectMapStatus, selectMinFloor, selectNumberOfFloors } from "../../../app/map/map-slice";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Status from "../../../app/status";
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageZoom from "../../../components/map/image-zoom";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../utils/scaling";
import BuildingMapSVG from "../building-map/components/building-map/BuildingMapSVG";
import { RotatingLayout } from "../../../layouts/map-layout";
import BuildingMapFloorPOIsOverlay from "../building-map/components/POIs-overlay/BuildingMapFloorPOIsOverlay";
import BuildingMapGraphDataOverlay from "./building-map-graph";
import BuildingMapFloorPOIsAreaOverlay from "../building-map/components/POIs-overlay/BuildingMapFloorPOIsAreaOverlay";

const BuildingMap = ({currentFloorIndex,centerOn,containerRef,rotationRef,opacitiesRef,onPanMove,onPOIPress,rotateChildren=false,imageProps={},children}) => {
    const maps = useSelector(selectMap);
    const numberOfFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);

    console.log("thistype:",Object.keys(maps[currentFloorIndex]))
    return (
        <ImageZoom style={styles.container}
            ref={containerRef}
            cropWidth={WINDOW_WIDTH * 0.5}
            cropHeight={WINDOW_HEIGHT * 0.5}
            imageWidth={maps[currentFloorIndex].width}
            imageHeight={maps[currentFloorIndex].height}
            minScale={0.3}
            centerOn={centerOn}
            useHardwareTextureAndroid
            useNativeDriver
            panToMove
            enableCenterFocus={false}
            onMove={onPanMove} 
            {...imageProps}                  
        >   
            <RotatingLayout rotationRef={rotationRef}>
                {Array.from({ length: numberOfFloors }, (_, index) => {
                    return (
                        <Animated.View 
                            key={`map_svg_${index}`} 
                            style={[{
                                opacity: opacitiesRef.current[index],
                                zIndex: currentFloorIndex === index ? 1 : 0,
                                display:currentFloorIndex === index ? "flex" : "none",
                            },styles.floorMapContainer]} 
                            >
                                <BuildingMapSVG
                                    data={maps[index]}
                                />
                                <BuildingMapFloorPOIsOverlay 
                                    floorIndex={maps[index].floor - minFloor}
                                    rotationRef={rotationRef}
                                    onPOIPress={onPOIPress}
                                />
                                <BuildingMapFloorPOIsAreaOverlay floorIndex={maps[index].floor - minFloor} />
                        </Animated.View>
                    )
                }

                )}    
                {rotateChildren && children && (
                    <>
                    {children}
                    </>
                )}
            </RotatingLayout>
            {!rotateChildren && children && (
                <>
                {children}
                </>
            )}
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
        position:"absolute",
        height:"100%",
        width:"100%",
    }
})

export default BuildingMap;