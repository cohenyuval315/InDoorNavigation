import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const GlobalMapBuildingPOI = ({building,width,height,color,zIndex,onBuildingPress}) => {
    const offset = 0;
    function getBottom(value){
        const percentages = (value / height) * 100 ;
        let v = offset + percentages;
        if (v < 0){
            v = offset;
        }
        if (v >= 100 - 2 * offset){
            v = 100 - 2 * offset;
        }
        let val = `${v}%`; // 22
        return val;
    }

    function getLeft(value){
        const percentages = (value / width) * 100 ;
        return `${percentages}%`;
    }
    const handleOnBuildingPress = () => {
        onBuildingPress(building);
    }

    return (
        <View style={{
            position:"absolute",
            bottom:getBottom(building.mapCoordinates.y), 
            left: getLeft(building.mapCoordinates.x),
            zIndex: 3, 

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

  export default GlobalMapBuildingPOI;