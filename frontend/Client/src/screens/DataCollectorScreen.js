import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import {NativeModules} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const {WifiModule,AndroidSensorAccelerometer,RNSamsungHealth} = NativeModules;

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
        // console.log(NativeModules)
        // SensorsModule.test((val)=>{
        //     console.log(val)
        // });
        // const sy = SensorsModule.testSync()
        // console.log(SensorsModule);
        // setMessage(sy);
    }
    useEffect(()=>{
        as();
    },[])
    
    const [message,setMessage] = useState('');
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


const SensorsTest = () => {
    
    const [data,setData] = useState([]);
    useEffect(() => {
        
    },[])

    const onPress = () => {
        console.log(AndroidSensorAccelerometer)
        AndroidSensorAccelerometer.addListener((event)=>{
            setData(event);
        })

    }

    return (
        <View>
            <Text>
            sensors:
            </Text>
            <TouchableOpacity onPress={onPress} style={{
                backgroundColor:'red',
                padding:10,
            }}>
                <Text>
                    click me
                </Text>
            </TouchableOpacity>
            <Text>
                {JSON.stringify(data, null, 2)}
            </Text>

        </View>
    )
}   

const SamsungHealthTest = () => {
    const [data,setData] = useState();

    const load = async () => {
        try{
            // const auth = await RNSamsungHealth.authorize();
            console.log(RNSamsungHealth)
            console.log(Object.keys(RNSamsungHealth))
            const cons = RNSamsungHealth.getConstants()
            console.log(cons)
            RNSamsungHealth.connect(
                [RNSamsungHealth.STEP_COUNT],
            (err)=>{
                console.log("error:")
                console.log(err);
            },
            (success) => {
                console.log("success:")
                console.log(success);
            })

            RNSamsungHealth.readStepCount(
                Date.now(),
                Date.now(),
            (err)=>{
                console.log("error:")
                console.log(err);
            },
            (success) => {
                console.log("success:")
                console.log(success);
            })
        }catch(error){
            console.log(error);
        }

        // setData(data)
        //console.log(data2)
        
    }
    return (
        <View style={{
            marginTop:100
        }}>
            <Text>
                samsungHealth:
            </Text>
            <TouchableOpacity onPress={load} style={{
                backgroundColor:'lightgreen',
                padding:10,
            }}>
                <Text>
                    click me
                </Text>
            </TouchableOpacity>
            <ScrollView>
                <Text>
                    {JSON.stringify(data, null, 2)}
                </Text>
            </ScrollView>
        </View>
    )

}

const WifiTest = () => {
    const [wifiNetworks,setWifiNetworks] = useState();
    const onWifiPress = async () => {
        // console.log(AndroidSensorAccelerometer)
        // console.log()
        // console.log(NativeModules)
        await load()
        
    }
    
    const load = async () => {
        const data = await WifiModule.loadWifiList();
        const data2 = await WifiModule.reScanAndLoadWifiList();
        setWifiNetworks(data)
        //console.log(data2)
        
    }
    return (
        <View style={{
            marginTop:100
        }}>
            <Text>
                wifi:
            </Text>
            <TouchableOpacity onPress={onWifiPress} style={{
                backgroundColor:'blue',
                padding:10,
            }}>
                <Text>
                    click me
                </Text>
            </TouchableOpacity>
            <ScrollView>
                <Text>
                    {JSON.stringify(wifiNetworks, null, 2)}
                </Text>
            </ScrollView>
        </View>
    )

}

/** admin only , create route and data */
const DataCollectorScreen = () => {
    const [route,setRoute] = useState();
    return (
        <View style={{
            flex:1,
        }}>
       
            <TestComp/>
            <CustomTextInput />
            <SensorsTest/>
            <WifiTest/>
            <SamsungHealthTest/>
            
        </View>
    )
}

const RealDataCollector = () => {
    return (
        <View>
            {/**
             * Route / Location
             * Route =>
             * 
             */}
        </View>
    )
}


const RouteDataCollector = () => {
    return (
        <View>
            {/**
             * Route
             * Manual/Interval
             * Inital x 
             * Inital y
             * end x
             * end y
             * 
             * Inital Device Orientation
             * User Heading
             * User Movement Type
             * Device Movement Type
             * 
             * Checkpoint
             * Sensors Data
             *  
             * Manual:
             * 
             * Interval:
             * Interval Position Increment x
             * Interval Position Increment y
             * TimeLength
             *
             * 
             */}
        </View>
    )
}



const LocationDataCollector = () => {
    return (
        <View>
            {/**
             * Location
             * Map X
             * Map Y
             * Map Floor
             * GPS longitude
             * GPS langitude
             * Device Orientation
             * User Heading
             *
             *
             * Button Collect
             * Data Log List
             * Send all + Sensors Data
             */}
        </View>
    )
}


export default DataCollectorScreen;