import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ButtonBase from "../../ButtonBase";

const SaveButton = ({onPress}) => {
    return (
        <ButtonBase 
            onButtonPress={onPress}
            styles={{
                ...styles.button
            }}
        >
            <Text style={styles.buttonText}>
                Save
            </Text>
        </ButtonBase>
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