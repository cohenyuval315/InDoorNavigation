import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AddButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>
                Add
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"lightgreen",
        padding:10,
        justifyContent:'center',
    },
    buttonText:{
        color:"black",
        textAlign:'center'
    },
})

export default AddButton;