import { FlatList, View } from "react-native";
import BuildingMapPOI from "./BuildingMapPOI";
import { useDispatch, useSelector } from "react-redux";
import { selectMapPOIs, selectMinFloor } from "../../../../../app/map/map-slice";
import { selectActivePOI, setActivePOI } from "../../../../../app/active/active-slice";
import MapOverlay from "../../../../../layouts/map-overlay";

const BuildingMapFloorPOIsOverlay = ({floorIndex,rotationRef,onPOIPress}) => {
    const dispatch = useDispatch();
    const POIs = useSelector(selectMapPOIs)
    const selectedPOI = useSelector(selectActivePOI);
    const minFloor = useSelector(selectMinFloor);
    const floorPOIs = POIs.filter((POI) => POI.floor - minFloor === floorIndex);

    const handleOnPOIPress = (POI) => {
        if (onPOIPress){
            onPOIPress(POI);
        }
        dispatch(setActivePOI(POI))
    }   
 

    return (
        <MapOverlay styles={{
        }}>
            {/* <View style={{
                position:'relative',
                height:"100%",
                width:"100%",
                pointerEvents:"box-none",
                zIndex:20,
            }}> */}
                {floorPOIs.map((POI,index) => {
                    return (
                        <BuildingMapPOI 
                            key={`POI_${POI.id}_${index}`} 
                            POI={POI}
                            onPOIPress={()=>handleOnPOIPress(POI)}
                            rotationRef={rotationRef}
                            isSelected={selectedPOI && selectedPOI.id === POI.id}
                        />                        
                    )
                })} 
            {/* </View> */}
        </MapOverlay>
    )
}
export default BuildingMapFloorPOIsOverlay;