import { selectMap, selectMinFloor, selectNumberOfFloors } from "../../../../app/map/map-slice";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageZoom from "../../../../components/map/image-zoom";
import BuildingMapSVG from "../../../main/building-map/components/building-map/BuildingMapSVG";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../utils/scaling";

const AdminBuildingFloorMap = ({floorIndex,imageProps={},children}) => {
    const maps = useSelector(selectMap);
    const containerRef = useRef(null);
    
    const map = useMemo(() => {
        console.log('rerender map floor');
        return (
            <BuildingMapSVG
                data={maps[floorIndex]}
                    width={WINDOW_WIDTH}
                    height={WINDOW_HEIGHT}
            /> 
        )

    }, [floorIndex]);    
    return (
        <View style={{
            height:WINDOW_HEIGHT / 2,
            width:WINDOW_WIDTH,
            zIndex:0,
            transform: [{ translateY: -WINDOW_HEIGHT / 120 }]
        }}>
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
                {map}
                {children}
            </ImageZoom>                        
        </View>
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


export default AdminBuildingFloorMap;