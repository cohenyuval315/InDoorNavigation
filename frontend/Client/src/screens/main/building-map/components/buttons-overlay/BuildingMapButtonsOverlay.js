import { Text, TouchableOpacity, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MapOverlay from "../../../../../layouts/map-overlay";
import { useNavigation } from "@react-navigation/native";

const BuildingMapButtonsOverlay = ({
    isRotated,
    toggleRotation,
    onRotatePress,
    isCentered,
    isLocked,
    onUserCenterPress,
    onUserCenterLockPress
}) => {

    const navigation = useNavigation();

    const onPathBuilderPress = () => {
        navigation.navigate('building-map-path-builder-modal');
    }


    const onCenterActionUserPress = () =>{
        if(!isLocked){
            if(isCentered){
                onUserCenterLockPress();
            }else{
                onUserCenterPress();
                
            }
        }

    }

    const onRotationActionUserPress = () => {
        // toggleRotation() , later
        onRotatePress()
    }


    return (
        <MapOverlay>

            <TouchableOpacity 
            onPress={onRotationActionUserPress}
            style={{
                position:"absolute",
                top:"16%",
                right:"1%",
                padding:10,
                borderRadius:30,
                backgroundColor:'rgba(0, 0, 0, 0.9)',
            }}>
                <Text style={{
                    color:"black"
                }}>
                    <MaterialCommunityIcons name="rotate-right" color={"lightgray"} size={30} />
                </Text>
            </TouchableOpacity>        

            {/* <TouchableOpacity 
            onPress={onPathBuilderPress}
            style={{
                position:"absolute",
                bottom:"16%",
                right:0,
                padding:10,
                borderRadius:30,
                backgroundColor:'rgba(0, 0, 0, 0.5)',
            }}>
                <Text style={{
                    color:"black"
                }}>
                    <MaterialCommunityIcons name="map-marker-path" color={"black"} size={30} />
                </Text>
            </TouchableOpacity>     */}


            <TouchableOpacity 
            onPress={onCenterActionUserPress}
            style={{
                position:"absolute",
                left:"3%",
                bottom:"15%",
                padding:10,
                borderRadius:50,
                backgroundColor:'rgba(0, 0, 0, 0.9)',            
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
 
            {/* <Compass/>    
            <SpeedMeter/> */}

        </MapOverlay>
    )
}
export default BuildingMapButtonsOverlay