import { selectMap, selectMinFloor, selectNumberOfFloors } from "../../../../app/map/map-slice";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageZoom from "../../../../components/map/image-zoom";
import BuildingMapSVG from "../../../main/building-map/components/building-map/BuildingMapSVG";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../utils/scaling";
import BuildingMapGraphDataOverlay from "../../../main/components/building-map-graph";
import BuildingMapFloorPOIsAreaOverlay from "../../../main/building-map/components/POIs-overlay/BuildingMapFloorPOIsAreaOverlay";
import BuildingMapFloorPOIsOverlay from "../../../main/building-map/components/POIs-overlay/BuildingMapFloorPOIsOverlay";
import { selectGraphMaps } from "../../../../app/admin/admin-slice";

const AdminBuildingFloorMap = ({floorIndex,imageProps={},children}) => {
    const maps = useSelector(selectMap);
    const containerRef = useRef(null);
    
    const map = useMemo(() => {
        console.log('rerender map floor');
        return (
            <>
                <BuildingMapSVG
                    data={maps[floorIndex]}
                /> 
                <BuildingMapFloorPOIsAreaOverlay floorIndex={floorIndex} />
                <BuildingMapGraphDataOverlay floorIndex={floorIndex} />
            </>

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