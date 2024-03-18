import React,{useEffect} from 'react'
import { View,Text } from 'react-native';
// import * as Sensors from 'react-native-sensors-module'

// after EULA 
// and permissions
// connecting 
// after connecting ,show incomplte waze , search bar/ lock, map, full screen
//
// 


const MainScreen = () => {
    useEffect(()=>{
        console.log('start');
    },[])
    return (
        <View>
            <Text>
                hello
            </Text>
        </View>
    )
}

export default MainScreen