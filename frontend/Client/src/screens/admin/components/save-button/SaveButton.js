import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SaveButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>
                Save
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"pink",
        padding:10,
        justifyContent:'center',
    },
    buttonText:{
        color:"black",
        textAlign:'center'
    },
})

export default SaveButton;