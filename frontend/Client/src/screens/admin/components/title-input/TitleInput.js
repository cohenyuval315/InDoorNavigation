import { useEffect, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"

const TitleInput = ({value,onChange}) => {
    const [title, setTitle] = useState(value || "Initial Value");

    const handleOnChange = (text) => {
        setTitle(text)
        onChange(text)
    }

    useEffect(() => {
        handleOnChange(title);
    }, []);

    useEffect(() => {
        setTitle(value);
    },[value])
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={title || ""}
                onChangeText={handleOnChange}
                multiline={true} 
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
export default TitleInput