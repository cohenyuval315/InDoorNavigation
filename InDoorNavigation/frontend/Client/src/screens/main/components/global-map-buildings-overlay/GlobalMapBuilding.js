
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../utils/scaling/scaling";
import { useDispatch } from "react-redux";
import { setActiveBuilding } from "../../../../app/active/active-slice";
import MapOverlay from "../../../../layouts/map-overlay";

const GlobalMapBuilding = ({building,color,zIndex,onBuildingPress}) => {
    const dispatch = useDispatch();

    const handleOnBuildingPress = () => {
        dispatch(setActiveBuilding(building));
    }
      const iconSize = 40;
    return (
        <MapOverlay>
        <View style={{
            position:"absolute",
            top:`${building.mapCoordinates.y}%`, 
            left:`${building.mapCoordinates.x}%`, 
            zIndex: 30, 
            marginLeft: -iconSize / 2,
            marginTop: -iconSize / 2,
        }}>
            <TouchableOpacity
            onPress={handleOnBuildingPress}
            >
                <Text style={{
                    color:"black",
                    zIndex:zIndex
                }}>
                    <Ionicons
                        name={"location"} 
                        size={iconSize} 
                        color={color} 
                    />
                </Text>
            </TouchableOpacity>
        </View>
        </MapOverlay>
    );
  };

  export default GlobalMapBuilding;