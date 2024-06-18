import { StyleSheet, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const StopButton = ({onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress && onPress}>
                <MaterialCommunityIcons name={"close-circle"} size={40} color="red" style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        right:0,
        top:20,
        padding:20,
        zIndex:9999,

    }
})

export default StopButton