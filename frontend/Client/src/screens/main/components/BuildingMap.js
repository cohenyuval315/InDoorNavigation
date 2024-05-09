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

const BuildingMap = ({centerOn,containerRef,rotationRef,opacitiesRef,onPanMove,onPOIPress,rotateChildren=false,imageProps={},children}) => {
    const maps = useSelector(selectMap);
    const numberOfFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);


    // const containerRef = useRef(null);
    // const rotationRef = useRef(new Animated.Value(0)); 
    // const [centerOn,setCenterOn] = useState(null); // does not rerender
    // const initialOpacitiesValues = Array.from({ length: numberOfFloors }, (_, index) => index === 0 ? new Animated.Value(1) : new Animated.Value(0))
    // const opacitiesRef = useRef(initialOpacitiesValues);

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
        // containerRef.current.reset();
        // containerRef.current.resetScale();
        //resetScale
        //centerOn

    }

    // const onPOIPress = (POI) => {
    //     // console.log(POI.center,WINDOW_WIDTH)
    //     containerRef.current.centerOn({
    //         x: WINDOW_WIDTH /2 - POI.center.x,
    //         y: (WINDOW_HEIGHT * 3 / 5  - POI.center.y) * -1,
    //         scale: 2,
    //         duration: 300,
    //     })
    //     const newOpacities = opacitiesRef.current.map((_,index) => POI.floor === minFloor + index ? 1 : 0);
    //     opacitiesRef.current.forEach((opacityRef, index) => {
    //         Animated.timing(opacityRef, {
    //             toValue: newOpacities[index],
    //             duration: 500,
    //             useNativeDriver: true
    //         }).start(() => {
    //             console.log("Animation completed for floor", minFloor + index);
    //         });
    //     });
    //     console.log(opacitiesRef.current)        
    // }

    return (
        <ImageZoom style={styles.container}
            ref={containerRef}
            cropWidth={WINDOW_WIDTH}
            cropHeight={WINDOW_HEIGHT}
            imageWidth={WINDOW_WIDTH}
            imageHeight={WINDOW_HEIGHT}
            centerOn={centerOn}
            minScale={1}
            useHardwareTextureAndroid
            useNativeDriver
            panToMove
            enableCenterFocus
            onMove={onPanMove} 
            {...imageProps}                  
        >
            <RotatingLayout rotationRef={rotationRef}>
                {Array.from({ length: numberOfFloors }, (_, index) => (
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
                                rotationRef={rotationRef}
                                onPOIPress={onPOIPress}
                            />
                    </Animated.View>
                ))}    
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
        height:"100%",
        width:"100%",
    }
})

export default BuildingMap;