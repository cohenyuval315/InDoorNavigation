import { StyleSheet, Switch, Text, View } from "react-native";

const HighTurbuanceSwitch = ({value,onChange}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                high turbuance? :
            </Text>
        <Switch 
            style={styles.switch}
            value={value} 
            onValueChange={onChange}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    switch:{

    },
    label:{
        fontSize:16,
        color:'black'
    }
})
export default HighTurbuanceSwitch;