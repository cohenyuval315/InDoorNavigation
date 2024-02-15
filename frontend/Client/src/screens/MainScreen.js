/* eslint-disable prettier/prettier */
import React,{useEffect} from 'react'
import { View,Text } from 'react-native';
// import * as Sensors from 'react-native-sensors-module'


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