import { Text, TouchableOpacity, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MapOverlay from "../../../../../layouts/map-overlay";
import { useNavigation } from "@react-navigation/native";

const BuildingMapButtonsOverlay = ({isInitUserPosition,centerOnRef,userPositionRef}) => {
    const navigation = useNavigation();
    const onPathBuilderPress = () => {
        navigation.navigate('building-map-path-builder-modal');
    }
    const onCenterOnUserPress = () => {
        if(isInitUserPosition){
            centerOnRef.current = {
                x: 100,
                y: 100,
                scale: 1,
                duration: 300,
            }
        }

    }

    const onLockOnUserPress = () => {

    }

    const onActionOnUserPress = () =>{
        if(centerOnRef.current == null){
            console.log("reached")
            onCenterOnUserPress()
        }else{
            console.log("reached")
            onLockOnUserPress();
        }
    }

    return (
        <MapOverlay>
            <TouchableOpacity 
            onPress={onPathBuilderPress}
            style={{
                position:"absolute",
                bottom:"16%",
                right:0,
                padding:10,
                borderRadius:30,
                backgroundColor:"lightgray"
            }}>
                <Text style={{
                    color:"black"
                }}>
                    <MaterialCommunityIcons name="map-marker-path" color={"black"} size={30} />
                </Text>
            </TouchableOpacity>        
            <TouchableOpacity 
            onPress={onActionOnUserPress}
            style={{
                position:"absolute",
                left:"3%",
                bottom:"15%",
                padding:10,
                borderRadius:50,
                backgroundColor:"lightblue"                
            }}>
                <Text style={{
                    color:"black"
                }}>
                    {centerOnRef.current == null ? (
                        <MaterialCommunityIcons name="target" color={"black"} size={30} />
                    ): (
                        <FoundationIcons name="target-two" color={"black"} size={30} />
                    )}
                    
                    
                </Text>
                
            </TouchableOpacity>   
 
            {/* <Compass/>    
            <SpeedMeter/> */}

        </MapOverlay>
    )
}
export default BuildingMapButtonsOverlay