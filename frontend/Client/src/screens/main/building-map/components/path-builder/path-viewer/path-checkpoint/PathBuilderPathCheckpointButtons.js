import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { addStopToActivePath, removeStopToActivePath, selectActivePath, swapStopsDownToActivePath, swapStopsUpToActivePath, toggleStopLockToActivePath } from '../../../../../../../app/active/active-slice';
import { selectMapPOIs } from '../../../../../../../app/map/map-slice';

const PathBuilderPathCheckpointButtons = ({POI,checkpoint,index,isDest}) => {
    const iconSize = 20;
    const dispatch = useDispatch();
    const POIs = useSelector(selectMapPOIs);
    const trueIndex = index - 1    ;
    const activePath = useSelector(selectActivePath)
    const destPOI = activePath[activePath.length - 1];
    const maxPathLength = 10;

    const getPOI = () => {
        try{
            if (POI){
                const POIData = POIs.filter((p) => p.id === POI)[0];
                if(POIData){
                    return POIData;
                }
            }
            return null;
        }catch(error){
            console.error("should never be here, POI");
        }
    }
    const handleOnAdd = () => {
        if (!POI){
            return
        }
        if(activePath.length > maxPathLength){
            return
        }
        dispatch(addStopToActivePath({
            stop:getPOI(),
            index:index - 1
        }))

    }

    const handleOnDelete = () => {
        dispatch(removeStopToActivePath(index - 1))
    }

    const handleOnMoveAbove = () => {
        dispatch(swapStopsUpToActivePath(index - 1));
    }

    const handleOnMoveBelow = () => {
        dispatch(swapStopsDownToActivePath(index - 1));
    }

    const handleOnToggleLock = () => {
        dispatch(toggleStopLockToActivePath(index - 1));
    }

    const renderDeleteButton = () => {
        if(index == 0){
            return null;
        }
        return (
            <TouchableOpacity 
                onPress={handleOnDelete}
                style={styles.button}>
                    <Text>
                    <MaterialIconsIcons name="delete" color={ "black"} size={iconSize} />
                    </Text>
            </TouchableOpacity>   
        )
    }

    const renderLockButton = () => {
        if(index == 0){
            return null;
        }      
        if(isDest){
            return null;
        }          
        const isLock = checkpoint.pathConfig.lock;
        const name = isLock ? "lock" : "lock-open"
        return (
            <TouchableOpacity 
                onPress={handleOnToggleLock}
                style={styles.button}
            >
                <Text>
                    <MaterialIconsIcons name={name} color={ "black"} size={iconSize} />
                </Text>
            </TouchableOpacity> 
        )
    }

    const renderAddButton = () => {
        if(isDest){
            return null;
        }
        if(!POI){
            return null;
        }
        if(POI === checkpoint.id){
            return null;
        }
        if(POI === destPOI.id){
            return null;
        }
        if(activePath.length > index){
            if(activePath[index].id == POI){    
                return null;
            }
        }
        if(activePath.length > maxPathLength){
            return null;
        }
        return (
            <TouchableOpacity 
                onPress={handleOnAdd}
                style={styles.button}
            >
                <Text>
                    <MaterialIconsIcons name="add-location-alt" color={ "black"} size={iconSize} />
                </Text>
            </TouchableOpacity> 
        )
    }

    const renderArrowUpButton = () => {
        if(index < 2){
            return null;
        }
        return (
            <TouchableOpacity 
                onPress={handleOnMoveAbove}
                style={styles.button}
            >
                <Text>
                    <MaterialIconsIcons name="arrow-upward" color={ "black"} size={iconSize} />
                </Text>
            </TouchableOpacity>  
        )
    }

    const renderArrowDownButton = () => {
        if(index == 0){
            return null;
        } 
        if(isDest){
            return null;
        }
        return (
            <TouchableOpacity 
            onPress={handleOnMoveBelow}
            style={styles.button}>
                <Text>
                <MaterialIconsIcons name="arrow-downward" color={ "black"} size={iconSize} />
                </Text>
            </TouchableOpacity>    
        )
    }

    return (
        <View style={styles.container}>
            {renderLockButton()}
            {renderAddButton()}
            {renderArrowUpButton()}
            {renderArrowDownButton()}
            {renderDeleteButton()} 
        </View>        
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row"
    },
    button:{
        paddingHorizontal:3,
    }
})


export default PathBuilderPathCheckpointButtons;