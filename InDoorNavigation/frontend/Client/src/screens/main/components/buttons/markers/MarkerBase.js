import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectMapsDims, selectMinFloor } from '../../../../../app/map/map-slice';

const MarkerBase = ({children,floor,x,y,markerSize,floorIndex,onPress}) => {
    const mapDims  = useSelector(selectMapsDims);
    const minFloor = useSelector(selectMinFloor);
    const minOpacitiy = 0.3;
    const maxOpacity = 1;
    const activeOpacity = onPress ? 0.2 : 1;

    const handleOnPress = () => {
        onPress && onPress()   
    }
    
    return (
        <TouchableOpacity activeOpacity={activeOpacity} onPress={handleOnPress} style={{
            position:"absolute",
            top:`${y * 100 / mapDims.height}%`,
            left:`${x * 100/ mapDims.width}%`,
            zIndex:30,
            opacity:floorIndex === floor - minFloor ? maxOpacity : minOpacitiy,
            transform:[
                {translateX: -markerSize/2},
                {translateY: -markerSize/2},
            ]
        }}>
            {children}
        </TouchableOpacity>  
    )

}

const styles = StyleSheet.create({
    
})

export default MarkerBase;
