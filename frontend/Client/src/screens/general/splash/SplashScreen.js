import { useState } from "react";
import { Text, View } from "react-native";

const SplashScreen = (props) => {
    const [timePassed, setTimePassed] = useState(false);
    setTimeout(function () {
        setTimePassed(true);
      }, 5000);

    if (!timePassed) 
    return (     
        <View style={{
            flex:1,
            backgroundColor:"red"
        }}>
            <Text style={{
                color:"blue"
            }}>
                splash
            </Text>
        </View>
    )
    props.navigation.navigate('empty');
    return null;    
}
export default SplashScreen;