import { StyleSheet, Switch, Text, View } from "react-native";

const TestSwitch = ({title,value,onChange}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {title}
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
export default TestSwitch;