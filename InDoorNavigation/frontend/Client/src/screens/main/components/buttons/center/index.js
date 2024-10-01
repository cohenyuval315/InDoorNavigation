import { StyleSheet, Text, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcons from 'react-native-vector-icons/Foundation';

const BuildingMapUserCenterButton = ({
    userPosition,
    isLocked,
    isCentered,
    onUserCenterLockPress,
    onUserCenterPress
}) => {

    const onCenterActionUserPress = () =>{
        if(!userPosition){
            return;
        }
        if(!isLocked){
            if(isCentered){
                onUserCenterLockPress();
            }else{
                onUserCenterPress();
                
            }
        }

    }

    return (
        <TouchableOpacity
            onPress={onCenterActionUserPress}
            style={{
                padding:10,
                borderRadius:50,
                backgroundColor:!userPosition ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.9)',            
            }}>
                <Text style={{
                    color:"black"
                }}>
                    {isCentered ? (
                        <FoundationIcons name="target-two" color={isLocked ? "red": "lightgray"} size={30} />
                    ): (
                        <MaterialCommunityIcons name="target" color={"lightgray"} size={30} />
                    )}
                    
                    
                </Text>
                
        </TouchableOpacity>   
    )
}

const styles = StyleSheet.create({

})

export default BuildingMapUserCenterButton