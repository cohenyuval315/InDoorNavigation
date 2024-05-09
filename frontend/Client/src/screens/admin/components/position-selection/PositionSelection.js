import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const PositionSelection = ({initialX,initialXBy,initialYBy,initialY,onChangeX,onChangeY,maxWidth,maxHeight}) => {
    const minHeight = 0;
    const minWidth = 0;
    const [x,setX] = useState(initialX || `${minWidth}`);
    const [y,setY] = useState(initialY || `${minHeight}`);
    const [incrementXBy,setIncrementXBy] = useState(`${initialXBy.toFixed(0)}`);
    const [incrementYBy,setIncrementYBy] = useState(`${initialYBy.toFixed(0)}`);

    useEffect(() => {
        onChangeX(parseInt(x))
    }, [x])

    useEffect(() => {
        onChangeY(parseInt(y))
    }, [y])

    useEffect(() => {
        if(x){
            setX(`${normalizeX(x)}`)
        }
        if(y){
            setY(`${normalizeY(y)}`)
        }
    },[maxHeight,maxWidth]);

    const onXChange = (value) => {
        const val = normalizeX(value);
        setX(`${val}`)
        onChangeX(val)
    }
    const onYChange = (value) => {     
        const val = normalizeY(value);
        setY(`${val}`)
        onChangeY(val)
    }
    const normalizeX = (value) => {
        let val = parseInt(value);
        if(val > maxWidth){
            val = maxWidth;
        }
        if(val < minWidth){
            val = minWidth;
        }  
        return val.toFixed(2);
    }
    const normalizeY = (value) => {
        let val = parseInt(value);
        if(val > maxHeight){
            val = maxHeight;
        }
        if(val < minHeight){
            val = minHeight;
        }   
        return val.toFixed(2);
    }
    const onIncrementXByChange = (value) => {
        setIncrementXBy(`${parseFloat(value).toFixed(0)}`);
    }

    const onIncrementYByChange = (value) => {
        setIncrementYBy(`${parseFloat(value).toFixed(0)}`);
    }

    const incrementX = () => {
        setX(prev => `${normalizeX(parseInt(prev) + parseInt(incrementXBy))}`);
    }
    const decrementX = () => {
        setX(prev => `${normalizeX(parseInt(prev) - parseInt(incrementXBy))}`);
    }

    const incrementY = () => {
        setY(prev => `${normalizeY(parseInt(prev) + parseInt(incrementYBy))}`);
    }

    const decrementY = () => {
        setY(prev => `${normalizeY(parseInt(prev) - parseInt(incrementYBy))}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <Text style={styles.label}>
                    X:
                </Text>
                <TextInput style={styles.textInput}
                    value={x}
                    onChangeText={onXChange}
                    keyboardType="numeric"
                />
                <TextInput style={styles.incrementInput}
                    value={incrementXBy}
                    onChangeText={onIncrementXByChange}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={incrementX}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={decrementX}>
                    <Text style={styles.buttonText}>
                        -
                    </Text>
                </TouchableOpacity>                     
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>
                    Y:
                </Text>                
                <TextInput style={styles.textInput}
                    value={y}
                    onChangeText={onYChange}
                    keyboardType="numeric"
                />
                <TextInput style={styles.incrementInput}
                    value={incrementYBy}
                    onChangeText={onIncrementYByChange}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={incrementY}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={decrementY}>
                    <Text style={styles.buttonText}>
                        -
                    </Text>
                </TouchableOpacity>                     
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical:5
    },
    inputRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        
    },
    button:{
        flex:1,
        borderColor:'black',
        borderWidth:1, 
        borderRadius:20,     
        backgroundColor:"lightgray", 
        padding:5, 
    },
    buttonText:{
        color:"black",
        textAlign:'center',
        fontSize:20,       
    },
    textInput:{
        flex:1,
        backgroundColor:"lightblue",
        borderRadius:10,
        color:"black",
        textAlign:'center',
        fontSize:20,
        borderColor:'black',
        borderWidth:1,
    },
    incrementInput:{
        flex:1,
        backgroundColor:"pink",
        borderRadius:10,
        color:"black",
        textAlign:'center',
        fontSize:20,
        borderColor:'black',
        borderWidth:1,
    },
    label:{
        color:"black",
        fontSize:16,
        paddingHorizontal:5,
    }
})

export default PositionSelection;