import { useEffect, useMemo, useState } from "react";
import { CardinalDirection, Direction } from "../../../constants/constants";
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BuildingDropDown from "../components/building-dropdown";
import UnsureSwitch from "../components/unsure-switch";
import TestSwitch from "../components/test-switch";
import AdminBuildingMap from "../components/building-map/AdminBuildingMap";
import { generateUUID } from "../../../utils/uuid";
import RouteOverlay from "./components/route-overlay";
import RouteBuilder from "./components/route-builder";
import PositionOverlay from "../components/position-overlay";
import ActiveRouteOverlay from "./components/active-route-overlay";

const directionAngles = {
    [Direction.DOWN]: 180,
    [Direction.UP]: 0,
    [Direction.LEFT]: -90,
    [Direction.RIGHT]: 90,
    [Direction.UP_LEFT]: -45,
    [Direction.UP_RIGHT]: 45,
    [Direction.DOWN_LEFT]: -135,
    [Direction.DOWN_RIGHT]: 135,
};

const directions = Object.values(Direction)

const buildingCardinalDirections = {
    [Direction.DOWN]:CardinalDirection.NORTH,
    [Direction.UP]:CardinalDirection.SOUTH,
    [Direction.LEFT]: CardinalDirection.EAST,
    [Direction.RIGHT]: CardinalDirection.WEST,    
    [Direction.UP_LEFT]: CardinalDirection.SOUTH_EAST,
    [Direction.UP_RIGHT]: CardinalDirection.SOUTH_WEST,
    [Direction.DOWN_LEFT]:CardinalDirection.NORTH_EAST,
    [Direction.DOWN_RIGHT]:CardinalDirection.NORTH_WEST,
}


const DataRouteCollectionScreen = () => {
    const [isTest,setIsTest] = useState(false);
    const [isUnsure,setIsUnsure] = useState(false);

    const [floorsOpacities,setFloorOpacities] = useState([1,1])

    /** TIMER */
    const [timeLength, setTimeLength] = useState(3);
    const [time, setTime] = useState(timeLength);
    const [isTimeActive, setIsTimeActive] = useState(false);

    /** GENERAL INFO */
    const [buildingID,setBuildingID] = useState(null);
    const [routeName,setRouteName] = useState();


    /** PATH INITIAL STATE */
    const [initialDeviceOrientationDirection,setInitialDeviceOrientationDirection] = useState();
    const [initialDirection,setInitialDirection] = useState()

    const [initialPosition,setInitialPosition] = useState();
    const [targetPosition,setTargetPosition] = useState();

    /** PATH DATA */
    const [checkpoints,setCheckpoints] = useState();

    


    const [route,setRoute] = useState([]);
    const [pathType,setPathType] = useState();
    
    const [isManual,setIsManual] = useState();
    const [automaticInterval,setAutomaticInterval] = useState()
    
    const [deviceMovement,setDeviceMovement] = useState();
    const [deviceMovementInterval,setDeviceMovementInterval] = useState(null); // null = static
    const [userMovement,setUserMovement] = useState()
    const [accelerometerData,setAccelerometerData] = useState();
    const [gyroscopeData,setGyroscope] = useState();
    const [magnetometerData, setMagnetometerData] = useState();
    const [wifiData,setWifiData] = useState();
    const [GPSData,setGPSData] = useState()
    

    const [accelerometerInterval,setAccelerometerInterval] = useState();
    const [magnetometerInterval,setMagnetometerInterval] = useState();
    const [gyroscopeInterval,setGyroscopeInterval] = useState();
    const [wifiInterval,setWifiInterval] = useState();
    const [deviceOrientation,setDeviceOrientation] = useState();
    const [rotationVector,setRotationVector] = useState();    
    const [GPSInterval,setGPSInterval] = useState();

    const [stepsTimestamps,setStepsTimestamps] = useState();

    const [startTime,setStartTime] = useState(0);

    const [routeData,setRouteData] = useState();

    const [data,setData] = useState()
    
    const [devicesDetails] = useState({
        device:{

        },
        magnetometer:{
            name:"MXG4300S Magnetometer",
            vendor:"",
            powerConsumption:"1.95 mA",
            version:2
        },
        accelerometer:{
            name:"LSM6DSOTR Accelerometer",
            powerConsumption:"0.15 mA",
            vendor: "STM",
            version:15933
        },
        gyroscope:{
            name:"LSM6DSOTR Gyroscope",
            powerConsumption:"0.65 mA",
            vendor: "STM",
            version:1
        }
    })

    const onIsTestChange = (value)  => {
        setIsTest(value)
    }

    const onIsUnsureChange = (value)  => {
        setIsUnsure(value)
    }
    const handleBuildingChange = (value) => {
        setBuildingID(value);
    }

    // useEffect(() => {
        
    //     Animated.timing(rotationRef.current, {
    //         toValue: directionAngles[],
    //         duration: 100,
    //         useNativeDriver: true,
    //     }).start();

    // }, []);
    const [marker,setMarker] = useState();
    
    const getData = () => {
        const r = {
            id:generateUUID(),
            routeName:routeName,
            test:isTest,
            uncertain:isUnsure,
            checkpoints:checkpoints,
            buildingID:buildingID,
            deviceMovement:deviceMovement,
            deviceMovementInterval:deviceMovementInterval,
            initialDeviceOrientationDirection:initialDeviceOrientationDirection,
            initialDirection:initialDirection,
            initialCardinalDirection:buildingCardinalDirections[initialDirection],
            totalTime:totalTime,
            


            

        }
        return r;
    }

    const save = () => {

    }

    const addToRoute = () => {

    }
    const routeOverlay = useMemo(() => {
        return (
            <RouteOverlay points={[]} /> 
        )
    }, []);   
    const onRouteChange = (value) => {
        setRoute(value)
    }
    const onStartPress = () => {
        if (route.length <= 1) {
            return;
        }
    

    }

    const userPosition = () => {
        return (
            <>
            </>
        )
    }
    
    const activeRoute = useMemo(() => {
        return (
            <ActiveRouteOverlay 
                route={route}
            />
        )
    },[route])

    return (
        <View style={{
            flex:1,

        }}>
            <ScrollView style={{
                width:"100%",
                height:"100%"
            }}>
                <BuildingDropDown val={buildingID} onChange={handleBuildingChange} />
                <TestSwitch value={isTest} onChange={onIsTestChange}/>
                <UnsureSwitch value={isUnsure} onChange={onIsUnsureChange}/>
                <RouteBuilder route={route} onChange={onRouteChange} />


                <AdminBuildingMap floorsOpacities={floorsOpacities}>
                    {userPosition}
                    {activeRoute}
                </AdminBuildingMap>
                <TouchableOpacity style={{
                    padding:20,
                    backgroundColor:"lightblue"
                }}>
                    <Text style={{
                        color:"black",
                        textAlign:'center'
                    }}>
                        Start
                    </Text>
                </TouchableOpacity>
                <View style={{
                    padding:10,
                }}>
                    <TouchableOpacity style={{
                        padding:20,
                        backgroundColor:"lightblue"
                    }}>
                        <Text style={{
                            color:"black",
                            textAlign:'center'
                        }}>
                            record checkpoint
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </View>
    )
}
export default DataRouteCollectionScreen;