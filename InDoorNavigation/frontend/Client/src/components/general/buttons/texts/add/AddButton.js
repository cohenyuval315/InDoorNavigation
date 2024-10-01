import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ButtonBase from "../../ButtonBase";

const AddButton = ({onPress}) => {
    return (
        <ButtonBase onButtonPress={onPress} styles={{
            ...styles.button
        }}>
            <Text style={styles.buttonText}>
                Add
            </Text>
        </ButtonBase>
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