import DropDownPicker from "react-native-dropdown-picker";
import { DeviceOrientationType } from "../../../../constants/constants";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const DeviceOrientationSelection = ({val,onChange}) => {
    const [angles, setAngles] = useState(val);
    const handleInputChange = (key, value) => {
        let angle = parseFloat(value) || 0;
        switch (key) {
            case 'roll': // Roll
              // Ensure angle is within the range of -180 to 180 degrees
              angle = angle < -180 ? -180 : angle > 180 ? 180 : angle;
              break;
            case 'pitch': // Pitch
              // Ensure angle is within the range of -90 to 90 degrees
              angle = angle < -90 ? -90 : angle > 90 ? 90 : angle;
              break;
            case 'yaw': // yaw
              // Ensure angle is within the range of 0 to 360 degrees
              angle = angle < 0 ? 0 : angle > 360 ? 360 : angle;
              break;
            default:
              break;
          }
        setAngles(prevAngles => ({ ...prevAngles, [key]: parseFloat(angle) || 0 }));
      };

    useEffect(() => {
        onChange(val)
    },[angles])

    return (
        <View style={styles.container}>
            <View style={{
                justifyContent:'center'
            }}>
                <Text style={{color:'black'}}>
                    orientation:
                </Text>
            </View>
            <View style={styles.valuesContainer}>
                <View style={styles.row}>
                    <Text style={styles.text}>Roll Angle(x):</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={value => handleInputChange('roll', value)}
                        value={angles.roll.toString()}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Pitch Angle(y):</Text>
                    <TextInput
                        style={styles.textInput}
                    onChangeText={value => handleInputChange('pitch', value)}
                        value={angles.pitch.toString()}
                    />
                </View>
                    <View style={styles.row}>
                    <Text style={styles.text}>Azimuth Angle(z):</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={value => handleInputChange('yaw', value)}
                        value={angles.yaw.toString()}
                    />
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:10
    },
    textInput:{
        height: 40, borderColor: 'gray', borderWidth: 1 ,
        color:'black',
        paddingHorizontal:20,
    },
    text:{
        color:'black'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        
    },
    valuesContainer:{
        marginLeft:30,
        flex:1,
    }
})

export default DeviceOrientationSelection;