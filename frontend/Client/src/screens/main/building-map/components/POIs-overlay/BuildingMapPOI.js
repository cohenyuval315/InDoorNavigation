import BuildingPOIPoint from "./BuildingPOIPoint";
import BuildingPOIPath from "./BuildingPOIPath";
import BuildingPOIPolygon from "./BuildingPOIPolygon";
import MapOverlay from "../../../../../layouts/map-overlay";
import { TouchableOpacity } from "react-native";

const BuildingMapPOI = ({
    POI,
    onPOIPress,
    rotationRef,
    isSelected
  }) => {
    const numOfCoordinates = POI.mapArea.length;
    const renderPOI = (numOfCoordinates) => {
      switch(numOfCoordinates){
        case 0:{
          return <></>
        }
        case 1:{
          return <BuildingPOIPoint 
            POI={POI} 
            rotationRef={rotationRef}
            onPOIPress={onPOIPress}
            isSelected={isSelected}
          />
        }
        case 2:{
          return <BuildingPOIPath 
            POI={POI} 
            rotationRef={rotationRef}
            onPOIPress={onPOIPress}
            isSelected={isSelected}
          />
        }
        default:{
          return <BuildingPOIPolygon 
            POI={POI} 
            rotationRef={rotationRef}
            onPOIPress={onPOIPress}
            isSelected={isSelected}
          />
        }      
      }
    }

    return (
      <MapOverlay>
          {renderPOI(numOfCoordinates)}
      </MapOverlay>
    )

}

export default BuildingMapPOI;