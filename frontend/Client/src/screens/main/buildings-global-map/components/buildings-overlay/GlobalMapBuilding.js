
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../../utils/scaling";
import { useDispatch } from "react-redux";
import { setActiveBuilding } from "../../../../../app/active/active-slice";

const GlobalMapBuilding = ({building,color,zIndex,onBuildingPress}) => {
    const dispatch = useDispatch();

    const handleOnBuildingPress = () => {
        dispatch(setActiveBuilding(building));
    }

    return (
        <View style={{
            position:"absolute",
            top:`${building.mapCoordinates.y}%`, 
            left:`${building.mapCoordinates.x}%`, 
            zIndex: 30, 
        }}>
            <TouchableOpacity
            onPress={handleOnBuildingPress}
            >
                <Text style={{
                    color:"black",
                    zIndex:zIndex
                }}>
                    <Ionicons style={{

                    }} 
                        name={"location"} 
                        size={40} 
                        color={color} 
                    />
                </Text>
            </TouchableOpacity>
      </View>
    );
  };

  export default GlobalMapBuilding;