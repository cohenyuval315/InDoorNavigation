import { Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapButton from "../../../../../../components/general/buttons/map-button/MapButton";

const MapPathButton = ({onPress}) => {
    return (
        <MapButton onPress={onPress}>
            <MaterialCommunityIcons name="map-marker-path" color={"black"} size={30} />
        </MapButton>  
    )
}

export default MapPathButton;