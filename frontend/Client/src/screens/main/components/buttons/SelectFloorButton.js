import { Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapButton from "../../../../components/general/buttons/map-button/MapButton";

const SelectFloorButton = ({onPress}) => {
    return (
        <MapButton onPress={onPress}>
            <MaterialCommunityIcons name="target" color={"black"} size={30} />
        </MapButton>
    )
}

export default SelectFloorButton;