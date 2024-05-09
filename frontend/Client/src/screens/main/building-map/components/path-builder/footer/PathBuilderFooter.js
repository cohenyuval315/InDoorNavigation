import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PathBuilderFooter = ({onNavigate,onClose}) => {
    return (
        <View style={{
                
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
                height:"10%",
            }}>
                <TouchableOpacity 
                style={{
                    backgroundColor:"blue",
                    width:'50%',
                    height:'50%',
                    justifyContent:'center',
                    alignItems:'center',    
                    borderRadius:30,
                }}
                onPress={onNavigate}>
                    <Text>
                        Navigate
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{
                    backgroundColor:"gray",
                    width:'50%',
                    height:'50%',
                    justifyContent:'center',
                    alignItems:'center',  
                    borderRadius:30,                      
                }}
                onPress={onClose}>
                    <Text>
                        Close
                    </Text>
                </TouchableOpacity>                    
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default PathBuilderFooter;