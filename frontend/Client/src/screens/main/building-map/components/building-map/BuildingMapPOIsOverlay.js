import { View } from "react-native";
import BuildingMapPOI from "./BuildingMapPOI";
import MapOverlay from "../../../../../layouts/map-overlay";

const BuildingMapPOIsOverlay = ({
    offsets,
    floorIndex,
    POIs,
    onPOIPress,
    rotationRef
}) => {
    console.log('hy')
    return (
        <MapOverlay>
            {POIs.map((POI,index) => {
                return (
                    <BuildingMapPOI 
                        offsets={offsets}
                        floorIndex={floorIndex}
                        key={POI.id}
                        index={index}
                        POI={POI}
                        onPOIPress={()=>onPOIPress(POI)}
                        rotationRef={rotationRef}
                    />
                )
            })}
        </MapOverlay>
    )
}

export default BuildingMapPOIsOverlay;