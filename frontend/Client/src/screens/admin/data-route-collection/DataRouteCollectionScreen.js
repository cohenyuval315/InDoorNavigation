import { useEffect, useMemo, useRef, useState } from "react";
import {  Text, TouchableOpacity, View } from "react-native";
import BuildingDropDown from "../components/building-dropdown";
import UnsureSwitch from "../components/unsure-switch";
import TestSwitch from "../components/test-switch";
import AdminBuildingMap from "../components/building-map/AdminBuildingMap";
import RouteBuilder from "./components/route-builder";
import ActiveRouteOverlay from "./components/active-route-overlay";
import {  selectMinFloor } from "../../../app/map/map-slice";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import { SensorKey } from "../../../services/sensors/SensorKey";
import SensorsService from "../../../sensors/sensors-service";
import { WifiService } from "../../../sensors/wifi-service";
import { useConfirmationModal } from "../../../contexts/ConfirmationModalContext";
import { fetchProcessingRoute, selectProcessingError, selectProcessingRoutes, selectProcessingStatus, uploadProcessingRoute } from "../../../app/admin/admin-slice";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import Status from "../../../app/status";
import useGPS from "../../../hooks/useGPS";

WifiService.getInstance().startStream();

const DataRouteCollectionScreen = () => {
    const minFloor = useSelector(selectMinFloor);
    const processingRoute = useSelector(selectProcessingRoutes);
    const processingStatus = useSelector(selectProcessingStatus);
    const processingError = useSelector(selectProcessingError)
    const dispatch = useDispatch()
    const {openConfirm} = useConfirmationModal()
    const [isTest,setIsTest] = useState(false);
    const [isUnsure,setIsUnsure] = useState(false);
    const [isStart, setIsStart] = useState(false);

    const [floorsOpacities,setFloorOpacities] = useState([1,1])

    const [buildingID,setBuildingID] = useState(null);
    const [routeName,setRouteName] = useState('routetest');

    const [route,setRoute] = useState([]);
    const [currentFloorIndex ,setCurrentFloorIndex] = useState(0);
 
    const checkpointsRef = useRef([])
    const checkpointIndexRef = useRef(null);

    const sensorsDataRef = useRef([]);
    const wifiRef = useRef([]);
    const GPSDataRef = useRef([]);
    const {subscribeGPS} = useGPS()
    useEffect(() => {
        const subscription = subscribeGPS({
            next: (value) => {
                if(value){
                    GPSDataRef.current.push(value)
                }
            }
        })
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    useEffect(() => {
        const subscription = WifiService.getInstance().subscribeWifi({
            next: (value) => {
                wifiRef.current.push(value)
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const activeRoute = useMemo(() => {
        return (
            <ActiveRouteOverlay 
                route={route}
                floorIndex={currentFloorIndex}
            />
        )
    },[route,currentFloorIndex])

    const setupService = async (sensorKey,interval) => {
        const service = await SensorsService.getInstance().sensor(sensorKey)
        service.configSensorInterval(interval);
        service.startSensor();
        const s = service.subscribe({
            next:onNext,
            error:onError,
        })
        return s;
    }

    useEffect(() => {
        const acc = setupService(SensorKey.ACCELEROMETER,100);
        const grav = setupService(SensorKey.GRAVITY,5000);
        const gyr = setupService(SensorKey.GYROSCOPE,100);
        const gyroUn = setupService(SensorKey.GYROSCOPEUNCALIBRATED,5000);
        const lin = setupService(SensorKey.LINEARACCELERATION,5000);
        const mag = setupService(SensorKey.MAGNETOMETER,100);
        const magUn = setupService(SensorKey.MAGNETOMETERUNCALIBRATED,5000);
        const rot = setupService(SensorKey.ROTATIONVECTOR,100);
        const sd = setupService(SensorKey.STEPDETECTOR,100);
        
        return () => {
            acc.then((s)=>{
                s.unsubscribe()
            })
            grav.then((s)=>{
                s.unsubscribe()
            })
            gyr.then((s)=>{
                s.unsubscribe()
            })
            gyroUn.then((s)=>{
                s.unsubscribe()
            })
            lin.then((s)=>{
                s.unsubscribe()
            })
            mag.then((s)=>{
                s.unsubscribe()
            })
            magUn.then((s)=>{
                s.unsubscribe()
            })
            rot.then((s)=>{
                s.unsubscribe()
            })
            sd.then((s)=>{
                s.unsubscribe()
            })
        }
    },[])

    useEffect(() => {   
        const searchRouteName = "routetest3";
        switch(processingStatus){
            case Status.IDLE : {
                if(buildingID && routeName){
                    console.log("IDLE")
                    console.log(buildingID)
                    console.log(routeName)
                    dispatch(fetchProcessingRoute({buildingId:buildingID,routeName:searchRouteName}));
                    
                }
                break;
            }
                
            case Status.SUCCEEDED:{
                console.log("completed")
                if (!processingRoute){
                    console.log("not found ", searchRouteName)
                }else{
                    console.log("found ", searchRouteName)
                    console.log(Object.keys(processingRoute))

                    let sensors = [...processingRoute.sensorsData];
                    sensors.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                    const startTime = sensors[0].timestamp
                    const lastTime = sensors[processingRoute.sensorsData.length - 1].timestamp
                    console.log("first",startTime)
                    console.log("last:",lastTime)
                    const d1 = new Date(startTime)
                    const d2 = new Date(lastTime)
                    console.log(d1)
                    console.log(d2)
                    const diff = d2 - d1;
                    console.log("diff",diff)

                    
                }
                
                break;
            }
            case Status.FAILED: {
                console.log("FAILED!...")
                console.log(processingError)
                break;
            }
            case Status.PENDING:{
                console.log("PENDING PROCESSING...")
                break;
            }
        }

    },[processingStatus,buildingID,routeName])

    useEffect(() => {
        onReset();
        if (route.length > 0){
            alignRouteMap(0);
        }else{
            setCurrentFloorIndex(0);
        }
    },[route])

    const getRouteData = () => {
        const data = {
            routeName:routeName,
            checkpoints:checkpointsRef.current,
            sensorsData:sensorsDataRef.current,
            wifiData:wifiRef.current,
            buildingId:buildingID,
            isTest:isTest,
            route:route,
            gpsData:GPSDataRef.current
        }
        console.log(
            data.routeName,
            data.checkpoints.length,
            data.sensorsData.length,
            data.wifiData.length,
            data.buildingId,
            data.isTest,
            data.route.length
        )
        return data;
    }


    const onNext = (data) => {
        try{
            sensorsDataRef.current.push(data);
        }catch(error){
            console.log(error)
        }
        
        
        
    }

    const onError = (error) => {
        try{
            sensorsDataRef.current.push(error)
        }catch(error){
            console.log(error)
        }
    }


    const alignRouteMap = (index) => {
        if (route.length > index && index >= 0){
            const checkpoint = route[index];
            const currentFloor = checkpoint.mapCoordinates.floor // 0
            const floorIndex = currentFloor - minFloor;
            if(currentFloorIndex != floorIndex){
                setCurrentFloorIndex(floorIndex);
            }
        }
    }

      const handleStart = () => {
        if (route.length > 1){
            checkpointIndexRef.current = 0;
            wifiRef.current = [];
            sensorsDataRef.current = [];
            GPSDataRef.current = [];
            wifiRef.current = [];
            checkpointsRef.current = [{
                index:0,
                point:route[0],
                time:new Date(),
            }];
            
            setIsStart(true);
        }
      };


      const onReset = () => {
        setIsStart(false);
        checkpointIndexRef.current = null;
      }
      
    
      const handleRecord = async () => {
        console.log("num:",checkpointIndexRef.current)
        if(!isStart){
            return
        }
        if(isNaN(checkpointIndexRef.current)){
            return;
        }
        checkpointIndexRef.current = checkpointIndexRef.current + 1;
        if (route.length > checkpointIndexRef.current){
            alignRouteMap(checkpointIndexRef.current);
            checkpointsRef.current.push({
                index: checkpointIndexRef.current,
                point:route[checkpointIndexRef.current],
                time:new Date(),
            });

        }
        if(route.length - 1 == checkpointIndexRef.current){
            await handleOnFinish();
        }        
      };
    
      const handleOnFinish = async () => {
        setIsStart(false)
        console.log("FINISH");
        // checkpointIndexRef.current = 0;
        // console.log(checkpointsRef);
        // console.log(sensorsDataRef.current)
        alignRouteMap(route[0]);
        const data = getRouteData();
        openConfirm(
            "save route",
            "are u sure to save?",
            () => {
                dispatch(uploadProcessingRoute({buildingId:buildingID,data:data}))
                // dispatch(fetchProcessingRoute({buildingId:buildingID,routeName:routeName}))
                
     
            })
       

      };

      const handleReset = () => {
        onReset();
      }





    const onIsTestChange = (value)  => {
        setIsTest(value)
    }

    const onIsUnsureChange = (value)  => {
        setIsUnsure(value)
    }
    const handleBuildingChange = (value) => {
        setBuildingID(value);
    }

    const onRouteChange = (value) => {
        setRoute(value)
    }


    return (
        <View style={{
            flex:1,

        }}>
            <View style={{
                width:"100%",
                height:"100%"
            }} nestedScrollEnabled>
                <TextInput style={{
                    backgroundColor:"black"
                }}   value={routeName} onChangeText={(val) => {
                    setRouteName(val)
                }}/>
                <BuildingDropDown val={buildingID} onChange={handleBuildingChange} />
                <TestSwitch value={isTest} onChange={onIsTestChange}/>
                <UnsureSwitch value={isUnsure} onChange={onIsUnsureChange}/>
                <RouteBuilder route={route} onChange={onRouteChange} />

                <AdminBuildingMap 
                    currentFloorIndex={currentFloorIndex} 
                    floorsOpacities={floorsOpacities}>
                    
                   
                    {activeRoute}
                </AdminBuildingMap>



                {isStart ? (
                    <View style={{
                        padding:10,
                    }}>
                        <TouchableOpacity onPress={handleRecord} style={{
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

                        <TouchableOpacity onPress={handleReset} style={{
                            padding:20,
                            backgroundColor:"lightblue"
                        }}>
                            <Text style={{
                                color:"black",
                                textAlign:'center'
                            }}>
                                reset
                            </Text>
                        </TouchableOpacity>                        
                    </View>
                ): (
                    <>
                        <TouchableOpacity style={{
                            padding:20,
                            backgroundColor:"lightblue"
                        }}  onPress={handleStart}>
                            <Text style={{
                                color:"black",
                                textAlign:'center'
                            }}>
                                start
                            </Text>
                        </TouchableOpacity>
                        

                    </>
                )}

                
            </View>
        </View>
    )
}
export default DataRouteCollectionScreen;