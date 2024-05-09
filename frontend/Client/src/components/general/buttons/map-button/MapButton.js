import { Text, TouchableOpacity } from "react-native"

const MapButton = ({onPress,children}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                padding:10,
                borderRadius:30,
                backgroundColor:"lightblue"
            }}>
            <Text style={{
                color:"black"
            }}>
                {children}
            </Text>
        </TouchableOpacity>  
    )

}

export default MapButton