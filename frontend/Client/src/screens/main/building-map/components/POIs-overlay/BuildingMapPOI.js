import BuildingPOIIcon from "./BuildingPOIIcon";
import MapOverlay from "../../../../../layouts/map-overlay";
import { View } from "react-native";


const BuildingMapPOI = ({
    POI,
    onPOIPress,
    rotationRef,
    isSelected
  }) => {

    return (
          
            <BuildingPOIIcon 
              POI={POI} 
              rotationRef={rotationRef}
              onPOIPress={onPOIPress}
              isSelected={isSelected}
          />
    
    )

}

export default BuildingMapPOI;