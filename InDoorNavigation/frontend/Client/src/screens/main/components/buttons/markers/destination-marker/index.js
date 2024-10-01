import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MarkerBase from '../MarkerBase';

const DestinationMarker = ({floor,x,y,markerSize,floorIndex}) => {
    return (
        <MarkerBase
            floor={floor}
            floorIndex={floorIndex}
            markerSize={markerSize}
            x={x}
            y={y}
        >
            <View style={{
                backgroundColor:"blue",
                borderRadius:100,
            }}>
                <Icon
                name={"map-marker-star"}
                    color={"white"}
                    size={markerSize}
                />
            </View>
        </MarkerBase>
    )

}

const styles = StyleSheet.create({
    
})

export default DestinationMarker;
