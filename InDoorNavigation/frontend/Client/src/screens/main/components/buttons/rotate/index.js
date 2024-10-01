import { Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BuildingMapRotateButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style={{
            padding:5,
            borderRadius:30,
            backgroundColor:'rgba(0, 0, 0, 0.9)',
        }}>
            <Text style={{
                color:"black"
            }}>
                <Icon name="rotate-right" color={"lightgray"} size={30} />
            </Text>
        </TouchableOpacity> 
    )
}

export default BuildingMapRotateButton;
  