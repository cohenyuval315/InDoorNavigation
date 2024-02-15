/* eslint-disable prettier/prettier */

import { Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import {NativeModules} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const {SensorsModule} = NativeModules;
const CustomTextInput = ({initialValue,onChangeText}) => {
    const [value,setValue] = useState(initialValue ? initialValue : '');
    const handleTextOnChange = (value) => {
        setValue(value);
        onChangeText&&onChangeText(value);
    }
    return (
        <TextInput 
            value={value}
            onChangeText={handleTextOnChange}
        />
    )
}

const TestComp = () => {
    const [location, setLocation] = useState(null);
    const [locationInterval, setLocationByInterval] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const intervalId = setInterval(() => {
            Geolocation.getCurrentPosition(
                position => {
                    setLocationByInterval(position.coords);
                },
                error => setError(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        }, 1000); // Update location every 5 seconds

        return () => {
            clearInterval(intervalId); // Clear the interval when the component unmounts
        };
    }, []);

    useEffect(() => {
        // Request permission and start watching for location changes
        Geolocation.getCurrentPosition(
            position => {
                setLocation(position.coords);
            },
            error => setError(error.message),
            { 
                enableHighAccuracy: true, 
                timeout: 20000, 
                maximumAge: 1000,
                distanceFilter: 1
            }
        );

        const watchId = Geolocation.watchPosition(
            position => {
                setLocation(position.coords);
            },
            error => setError(error.message),
            { 
                enableHighAccuracy: true, 
                timeout: 20000, 
                maximumAge: 1000,
                distanceFilter: 1
            }
        );

        return () => {
            // Clear the location watcher when the component unmounts
            Geolocation.clearWatch(watchId);
        };
    }, []);

    const url = '';
    const wsurl = '';
    const as = async () => {
        SensorsModule.test((val)=>{
            console.log(val)
        });
        const sy = SensorsModule.testSync()
        console.log(SensorsModule);
        setMessage(sy);
    }
    useEffect(()=>{
        as();
    },[])
    
    const [message,setMessage] = useState('s');
    const [messages,setMessages] = useState([]);
    return (
        <View>
            <Text style={{
            }}>
                {message}
            </Text>
            {location ? (
                <View>
                    <Text>Latitude: {location.latitude}</Text>
                    <Text>Longitude: {location.longitude}</Text>
                    <Text>Altitude: {location.altitude}</Text>
                </View>
            ) : error ? (
                <Text>Error: {error}</Text>
            ) : (
                <Text>Loading...</Text>
            )}   
            {locationInterval ? (
                <View>
                    <Text>Latitude: {locationInterval.latitude}</Text>
                    <Text>Longitude: {locationInterval.longitude}</Text>
                    <Text>Altitude: {locationInterval.altitude}</Text>
                </View>
            ) : error ? (
                <Text>Error: {error}</Text>
            ) : (
                <Text>Loading...</Text>
            )}                         
        </View>
    )
}

/** admin only , create route and data */
const DataCollectorScreen = () => {
    const [route,setRoute] = useState();
    return (
        <View>
            <TestComp/>
            <Text>
                yes
            </Text>
            <CustomTextInput />
        </View>
    )
}
export default DataCollectorScreen;