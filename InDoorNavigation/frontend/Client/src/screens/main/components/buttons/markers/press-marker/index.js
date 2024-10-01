import MarkerBase from "../MarkerBase";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PressMarker = ({x,y,floor,floorIndex,markerSize}) => {
    return (
        <MarkerBase
            x={x}
            y={y}
            floor={floor}
            floorIndex={floorIndex}
            markerSize={markerSize}
        >
            <Icon
                name={"map-marker"}
                color={"red"}
                size={markerSize}
            />
        </MarkerBase>
    )
}

export default PressMarker;