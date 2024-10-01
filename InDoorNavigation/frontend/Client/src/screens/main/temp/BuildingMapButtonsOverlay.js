import { Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FoundationIcons from 'react-native-vector-icons/Foundation';
/* <Ionicons name={"cube"} size={20} color={"black"} /> */
import { Dimensions } from 'react-native';
import Compass from "../../../../components/sensors/Compass";
import SpeedMeter from "../../../../components/sensors/SpeedMeter";
const { width, height } = Dimensions.get('window');

const BuildingMapButtonsOverlay = ({onPressB1,onPressB2}) => {
    return (
        <View style={{
            position:"absolute",
            width:"100%",
            height:"100%"

        }}>
            <TouchableOpacity 
            onPress={onPressB1}
            style={{
                position:"absolute",
                right:0,
                bottom:"50%",
                padding:10,
                borderRadius:30,
                backgroundColor:"lightblue"
            }}>
                <Text style={{
                    color:"black"
                }}>
                    button1
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={onPressB2}
            style={{
                position:"absolute",
                bottom:"30%",
                right:0,
                padding:10,
                borderRadius:30,
                backgroundColor:"lightblue"
            }}>
                <Text style={{
                    color:"black"
                }}>
                    <MaterialCommunityIcons name="map-marker-path" color={"black"} size={width * 0.1} />
                </Text>
            </TouchableOpacity>        
            <TouchableOpacity 
            onPress={onPressB2}
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
                    <MaterialCommunityIcons name="target" color={"black"} size={width * 0.1} />
                    <FoundationIcons name="target-two" color={"black"} size={width * 0.1} />
                </Text>
                
            </TouchableOpacity>   


            <TouchableOpacity 
            onPress={onPressB2}
            style={{
                position:"absolute",
                right:"3%",
                bottom:"70%",
                padding:10,
                borderRadius:50,
                backgroundColor:"lightblue"                
            }}>
                <Text style={{
                    color:"black"
                }}>
                    <Ionicons name={"volume-mute"} size={20} color={"black"} />
                    <Ionicons name={"volume-low"} size={20} color={"black"} />
                    <Ionicons name={"volume-medium"} size={20} color={"black"} />
                    <Ionicons name={"volume-high"} size={20} color={"black"} />
                </Text>
                
            </TouchableOpacity>   
            <Compass/>    
            <SpeedMeter/>

        </View>
    )
}
export default BuildingMapButtonsOverlay