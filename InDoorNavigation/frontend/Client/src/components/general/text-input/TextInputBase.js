import { StyleSheet, TextInput, View } from "react-native";

const TextInputBase = ({value,onChangeText,multiline}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={value || ""}
                onChangeText={onChangeText}
                multiline={multiline} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        width:"100%"
    },
    textInput:{
        color:"black",
        backgroundColor:"lightgray",
        textAlign:'center',
    }
})


export default TextInputBase;