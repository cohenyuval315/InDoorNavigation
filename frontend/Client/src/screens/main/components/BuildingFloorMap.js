import { useDispatch, useSelector } from "react-redux";
import { selectMap } from "../../../app/map/map-slice";
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../utils/scaling";
import BuildingMapSVG from "../building-map/components/building-map/BuildingMapSVG";
import BuildingMapFloorPOIsOverlay from "../building-map/components/POIs-overlay/BuildingMapFloorPOIsOverlay";

const BuildingFloorMap = ({floorIndex,children}) => {
    const maps = useSelector(selectMap);
    console.log("building floor rerender: ",floorIndex)
    return (
        <Animated.View>
                <BuildingMapSVG
                    data={maps[floorIndex]}
                    width={WINDOW_WIDTH}
                    height={WINDOW_HEIGHT}
                />
                <BuildingMapFloorPOIsOverlay 
                    floorIndex={maps[floorIndex].floor}
                    onPOIPress={() => {}}
                />
                {children}
        </Animated.View>               
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

export default BuildingFloorMap;