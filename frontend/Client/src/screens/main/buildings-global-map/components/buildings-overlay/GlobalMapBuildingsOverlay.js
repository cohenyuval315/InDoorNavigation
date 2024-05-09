import { Text, TouchableOpacity, View } from "react-native";
import GlobalMapBuilding from "./GlobalMapBuilding";
import { useSelector } from "react-redux";
import { selectAllBuildings } from "../../../../../app/building/buildings-slice";
import { selectActiveBuilding } from "../../../../../app/active/active-slice";
import MapOverlay from "../../../../../layouts/map-overlay/MapOverlay";
import { memo } from "react";


const GlobalMapBuildingsOverlay = memo(() => {
    const buildings = useSelector(selectAllBuildings);
    const selectedBuilding = useSelector(selectActiveBuilding);
    
    return (
        <MapOverlay>
            <View style={{
                position:"absolute",
                height:"100%",
                width:"100%",
            }}>
                {buildings && buildings.map((building) => {
                    return (
                        <GlobalMapBuilding 
                            key={building.id}
                            building={building}
                            color={selectedBuilding && selectedBuilding.id === building.id ? "blue": "red"}
                            zIndex={selectedBuilding && selectedBuilding.id === building.id ? 10 : 3}
                            // onBuildingPress={onBuildingPress}
                        />
                    )
                })}
            </View>
        </MapOverlay>
    );
  });

  export default GlobalMapBuildingsOverlay;