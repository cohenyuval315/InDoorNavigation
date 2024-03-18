import { Text, TouchableOpacity, View } from "react-native";
import GlobalMapBuildingPOI from "./GlobalMapBuildingPOI";

const GlobalMapBuildingsOverlay = ({buildings,width,height,selectedBuilding,onBuildingPress}) => {
    return (
        <View style={{
            position:"absolute",
            height:"100%",
            width:"100%",
        }}>
            {buildings.map((building) => {
                return (
                    <GlobalMapBuildingPOI 
                        key={building.id}
                        building={building}
                        color={selectedBuilding && selectedBuilding.id === building.id ? "blue": "red"}
                        zIndex={selectedBuilding && selectedBuilding.id === building.id ? 10 : 3}
                        height={height}
                        width={width}
                        onBuildingPress={onBuildingPress}
                    />
                )
            })}
      </View>
    );
  };

  export default GlobalMapBuildingsOverlay;