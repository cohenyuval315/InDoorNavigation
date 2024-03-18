import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
const GlobalMapButtonsOverlay = ({openModal}) => {
    return (
        <View style={{
            // height:0,
            position:"absolute",
            right:"5%",
            top:"75%"
        }}>
            <TouchableOpacity
             onPress={openModal}
             style={{
                backgroundColor:"lightgray",
                borderColor:"black",
                borderWidth:0.5,
                borderRadius:26,
                padding:10,
                justifyContent:"center",
                alignItems:"center",
                
            }}>
                <Text style={{
                    color:"black",
                    zIndex:44,
                }}>
                        <Ionicons
                            name={"warning-outline"} 
                            size={30} 
                            color={"red"} 
                        />
                </Text>
            </TouchableOpacity>         
        </View>
    )
}

export default GlobalMapButtonsOverlay;