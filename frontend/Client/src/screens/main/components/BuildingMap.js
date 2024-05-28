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


    // const containerRef = useRef(null);
    // const rotationRef = useRef(new Animated.Value(0)); 
    // const [centerOn,setCenterOn] = useState(null); // does not rerender
    // const initialOpacitiesValues = Array.from({ length: numberOfFloors }, (_, index) => index === 0 ? new Animated.Value(1) : new Animated.Value(0))
    // const opacitiesRef = useRef(initialOpacitiesValues);
    console.log("OPS",opacitiesRef.current,"floor",currentFloorIndex)
    function test() {
        console.log("clicked")
        testRef()
        _randomOpacitiesTest()

    }

    function randomCenterOn () {
        // setCenterOn({
        //     x: Math.abs(100) / 2,
        //     y: Math.abs(100) / 2,
        //     scale: 2,
        //     duration: 300,
        // })

    }
    function _randomZoomIn () {

    }

    const getCurrentMapIndex = () => {
        let max = -1;
        let mapIndex = null;
        opacitiesRef.current.forEach((opacityRef, index) => {
            const op_value = opacityRef._value
            if(max < op_value){
                max = op_value
                mapIndex = index
            }
        })
        return mapIndex;
    }

    function _randomOpacitiesTest () {
        const newOpacities = opacitiesRef.current.map(() => Math.random());
        opacitiesRef.current.forEach((opacityRef, index) => {
            Animated.timing(opacityRef, {
                toValue: newOpacities[index],
                duration: 500, // Adjust as needed
                useNativeDriver: true
            }).start(() => {
                console.log("Animation completed for floor", index);
            });
        });
    }
    function _randomRotationTest () {
        Animated.timing(rotationRef.current, {
            toValue: rotationRef.current._value + 10,
            duration: 500, 
            useNativeDriver: true
        }).start(() => {
            console.log("rotaation Animation completed for floor");
            rotationRef.current._value += 10
        });
    }

    const testRef = () => {
        containerRef.current.centerOn({
            x: Math.abs(100) / 2,
            y: Math.abs(100) / 2,
            scale: 2,
            duration: 300,
        })
    }
    // console.log(maps[1].floor)
    // console.log(Object.keys(maps[0].file))

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
                    console.log("ref:",opacitiesRef.current[index],"index:",Math.round(opacitiesRef.current[index]._value) + 1)
                    const style = {

                    }
                    if (opacitiesRef.current[index] == 0){
                        style['height'] = 0;
                        console.log("reached")
                    }
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
                                    floorIndex={maps[index].floor}
                                    rotationRef={rotationRef}
                                    onPOIPress={onPOIPress}
                                />
                                <BuildingMapFloorPOIsAreaOverlay floor={maps[index].floor} />

                                {/* TEMPORARY TODO */}
                                    <BuildingMapGraphDataOverlay floor={maps[index].floor} />
                                {/* TEMPORARY */}
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