
import { Alert, Animated, FlatList, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBuildings } from "../../../app/building/buildings-slice";
import { Children, useCallback, useEffect, useMemo, useRef, useState, version } from "react";
import { selectMap, selectMapsDims, selectMinFloor } from "../../../app/map/map-slice";
import BuildingDropDown from "../components/building-dropdown";
import TitleInput from "../components/title-input";
import AddButton from "../components/add-button";
import FloorSelection from "../components/floor-selection";
import AdminBuildingMap from "../components/building-map/AdminBuildingMap";
import AdminBuildingFloorMap from "../components/building-map/AdminBuildingFloorMap";
import { generateUUID } from "../../../utils/uuid";
import { CardinalDirection, Direction } from "../../../constants/constants";
import CategorySelection from "../components/category-selection";
import PositionSelection from "../components/position-selection";
import PositionOverlay from "../components/position-overlay";
import SaveButton from "../components/save-button";
import { calculateBottomLeftOffset } from "../../../utils/map-data";
import POIsDropDown from "../components/POIs-dropdown";
import { createTimestamp } from "../../../utils/time";
import HighTurbuanceSwitch from "../components/high-turbuance-switch";
import { useDeviceOrientationChange } from "react-native-orientation-locker";
import useWIFI from "../../../hooks/useWIFI";
import AvailableDirections from "./components/available-directions";
import PointData from "./components/point-data";
import useGPS from "../../../hooks/useGPS";
import useRotation from "../../../hooks/useRotationVector";

import useLinearAcceleration from "../../../hooks/_old/useLinearAcceleration";
import useOrientation from "../../../hooks/_old/useOrientation";
import useSensor from "../../../hooks/useSensor";
import { SensorKey } from "../../../services/sensors/SensorKey";
import useGravitySensor from "../../../hooks/_old/useGravitySensor";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import TestSwitch from "../components/test-switch";
import UnsureSwitch from "../components/unsure-switch";
import DataModalButton from "../components/data-modal-button";
import ConfirmationModal from "../../../components/modals/confirmation";
import { openConfirm } from "../../../components/modals/confirmation/ConfirmationModal";
import DeviceOrientationSelection from "../components/device-orientation-selection";
import useMagnetometerSensor from "../../../hooks/_old/useMagnetometerSensor";
import MapModal from "../../../components/map/modals/MapModal";
import PointOverlay from "../components/point-overlay/PointOverlay";
import SensorsService from "../../../sensors/sensors-service";
import { fetchProcessingMap, selectProcessingError, selectProcessingMap, selectProcessingStatus, uploadProcessingMap } from "../../../app/admin/admin-slice";
import Status from "../../../app/status";
import GeoLocalization from "../../../navigation/GeoLocalization";
import { Geolocation } from "../../../sensors/gps-service";

// magnetometerData
// magnetometerUncalibData
// rotationVectorData
// gravityData

// 
// 


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

const DataPointCollectionScreen = () => {
    const {getWifiData} = useWIFI();
    const [floorIndex,setFloorIndex] = useState(0);
    const rotationRef = useRef(new Animated.Value(0));
    const mapsDims = useSelector(selectMapsDims);
    const minFloor = useSelector(selectMinFloor)
    const maxWidth = SCREEN_WIDTH;
    const currentDims = mapsDims[floorIndex]

    const floor = floorIndex + minFloor;
    
    
    const ratio = SCREEN_WIDTH / currentDims.width;
    const maxHeight = ratio * currentDims.height;

    


    const [dataPoints, setDataPoints] = useState([]);
    const [version,setVersion] = useState("v1");
    const [isHighTurbuance,setIsHighTurbuance] = useState(false);
    const [isTest,setIsTest] = useState(false);
    const [isUnsure,setIsUnsure] = useState(false);
    const [deviceOrientation,setDeviceOrientation] = useState({ roll: 0, pitch: 0, yaw: 0 });
    
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const [buildingID,setBuildingID] = useState(null);
    const [POIID,setPOIID] = useState(null);
    

    const [title,setTitle] = useState(null)
    const [mapDirection,setMapDirection] = useState(Direction.UP);
    const [availableDirections,setAvailableDirections] = useState([]);
    const [points,setPoints] = useState([]);
    const [savedPoints,setSavedPoints] = useState([]);

    const {subscribeGPS} =useGPS()
    const gpsData = useRef(null);
    const magData = useRef(null);
    const gravData = useRef(null);
    const rotData = useRef(null)
    const magUnData = useRef(null);
    const magErr = useRef(null);
    const gravErr = useRef(null);
    const rotErr = useRef(null)
    const magUnErr = useRef(null);

    // useEffect(() => {
    //     const subscription = Geolocation.getInstance().subscribeGeoLocation({
    //         next: (value) => {
    //             if(value){
    //                 console.log(value);
    //                 gpsData.current = value;
    //             }
    //         }
    //     })
    //     return () => {
    //         subscription.unsubscribe();
    //     };
    // }, []);


    const onNext = (data,sensorKey) => {
        switch(sensorKey){
            case SensorKey.MAGNETOMETER:{
                magData.current = data;
                break;
            }
            case SensorKey.MAGNETOMETERUNCALIBRATED:{
                magUnData.current = data;
                break;
            }
            case SensorKey.ROTATIONVECTOR:{
                rotData.current = data;
                break;
            }
            case SensorKey.GRAVITY:{
                gravData.current = data;
                break;
            }
        }
    }
    const onError = (err,sensorKey) => {
        switch(sensorKey){
            case SensorKey.MAGNETOMETER:{
                magErr.current = err;
                break;
            }
            case SensorKey.MAGNETOMETERUNCALIBRATED:{
                magUnErr.current = err;
                break;
            }
            case SensorKey.ROTATIONVECTOR:{
                rotErr.current = err;
                break;
            }
            case SensorKey.GRAVITY:{
                gravErr.current = err;
                break;
            }
        }
    }

    const setupService = async (sensorKey,interval) => {
        const service = await SensorsService.getInstance().sensor(sensorKey)
        service.configSensorInterval(interval);
        service.startSensor();
        const s = service.subscribe({
            next:(data) => onNext(data,sensorKey),
            error:(err) => onError(err,sensorKey),
        })
        return s;
    }

    useEffect(() => {
        const mag = setupService(SensorKey.MAGNETOMETER,100);
        const magUn = setupService(SensorKey.MAGNETOMETERUNCALIBRATED,100);
        const grav = setupService(SensorKey.GRAVITY,100);
        const rot = setupService(SensorKey.ROTATIONVECTOR,100);
            
        return () => {
            mag.then((s)=>{
                s.unsubscribe()
            })
            magUn.then((s)=>{
                s.unsubscribe()
            })
            grav.then((s)=>{
                s.unsubscribe()
            })
            rot.then((s)=>{
                s.unsubscribe()
            })
        }
        
    },[])

    const generateTitle = () => {
        let poi = POIID ? POIID : "None";
        const currentTimestamp = createTimestamp(new Date());
        const numPoints = savedPoints.filter((p) => p.x === x && p.y === y && p.floor === floor).length
        const numPointsSaved = points.filter((p) => p.x === x && p.y === y && p.floor === floor).length
        const pointIndex = numPoints + numPointsSaved;
        let generatedTitle = `${buildingID}@${poi}@POINT@F${floor}@${x}@${y}@${mapDirection}@${currentTimestamp}@${pointIndex}`
        return generatedTitle
    }


    useEffect(()=>{
        const newTitle = generateTitle()
        setTitle(newTitle);
    },[
        mapDirection,
        buildingID,
        POIID,
        floor,
        x,
        y,
    ])

   
    const handleBuildingChange = (value) => {
        setBuildingID(value);
    }

    const handleTitleOnChange = (value) => {
        setTitle(value)
    }

    const handleFloorOnChange = (value) => {
        setFloorIndex(value)
    }
    const handleOnXChange = (value) => {
        setX(value)
    }
    const handleOnYChange = (value) => {
        setY(value)
    }
    const onHighTurChange = (value)  => {
        setIsHighTurbuance(value)
    }

    const onIsTestChange = (value)  => {
        setIsTest(value)
    }

    const onIsUnsureChange = (value)  => {
        setIsUnsure(value)
    }
    const onAvailableDirectionsChange = (value) => {
        setAvailableDirections(value)
    }
    const onDeviceOrientationChange = (value) =>{
        setDeviceOrientation(value)
    }

    const getData = async () => {
        const wifiData = await getWifiData();
        if(typeof wifiData == "string"){
            console.log(wifiData)
            return;
        }
        const magnetometerData = magData.current;
        const magnetometerUncalibData = magUnData.current;
        const rotationVectorData = rotData.current;
        const gravityData = gravData.current;
        const gpsData = await Geolocation.getInstance().getCurrentGPSPosition({
            enableHighAccuracy:true,
            maximumAge:0,
            timeout:3000
        })
        const dataPoint = {
            id:generateUUID(),
            title:generateTitle(),
            timestamp:createTimestamp(new Date()),
            test:isTest,
            uncertain:isUnsure,
            floor:floor,
            x:x,
            y:y,           
            deviceOrientation:deviceOrientation, 
            direction:mapDirection,
            isHighTurbuance:isHighTurbuance,
            magnetometerData:magnetometerData,
            magnetometerUncalibData:magnetometerUncalibData,
            wifiData:wifiData,
            buildingID:buildingID,
            rotationVectorData:rotationVectorData,
            gravityData:gravityData,
            gpsData:gpsData
        }
        // console.log(dataPoint)
        return dataPoint
    }



    const addNewDataPoint = async () => {
        const newDataPoint = await getData();
        if (newDataPoint){
            setPoints(prev => [...prev,newDataPoint]);
        }
    }

    const dispatch = useDispatch();

    const savePoints = async (points) => {
        const data = {
            points:points,
            buildingId:buildingID,
            version:version
        }
        dispatch(uploadProcessingMap({buildingId:buildingID,data:data}));
    }

    const processingMap = useSelector(selectProcessingMap);
    const processingStatus = useSelector(selectProcessingStatus);
    const processingError = useSelector(selectProcessingError);
    useEffect(() => {   
        const searchVersion = "v99";
        switch(processingStatus){
            case Status.IDLE : {
                if(buildingID && searchVersion){
                    dispatch(fetchProcessingMap({buildingId:buildingID,version:searchVersion}));                    
                }
                break;
            }
                
            case Status.SUCCEEDED:{
                if (!processingMap){
                    console.log("not found ", searchVersion)
                }else{
                    console.log(Object.keys(processingMap))
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

    },[processingStatus,buildingID,version])    


    const onSavePoints = () => {
        Alert.alert(
            'Confirmation',
            "are u sure to save all",
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                    // setSavedPoints(prev => [...prev,...points])
                    setSavedPoints(points)
                    setPoints([]);
                    savePoints(points);
                },
              },
            ],
            { cancelable: false }
          );
    }

    const onPointDelete = (index) => {
        //onConfirm()
        Alert.alert(
            'Confirmation',
            "are u sure to delete",
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                    setPoints(prev => prev.filter((_,i) => i != index));
                },
              },
            ],
            { cancelable: false }
          );
    }

    useEffect(() => {
        
        Animated.timing(rotationRef.current, {
            toValue: directionAngles[mapDirection],
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [mapDirection]);

    
    const userPosition = useMemo(() => {
        const userSize = currentDims.height / 33;
        return (
            <PositionOverlay size={userSize} floor={floorIndex} x={x} y={y} rotationRef={rotationRef}/> 
        )

    }, [floorIndex,x,y,rotationRef.current]);   

    const pointsOverlay = useMemo(() => {
        console.log(savedPoints)
        console.log(points)
        const savedPs = savedPoints.filter((p) => p.floor === floor);
        const currentPs = points.filter((p) => p.floor === floor);
        const size = 3;
        return (                
            <>
                {savedPs.map((p) => {
                    return (
                        <PointOverlay 
                            key={`saved_${p.id}`} 
                            color={"green"}  
                            x={p.x}
                            y={p.y}
                            floor={floorIndex}
                            size={size}
                        />
                    )
                })}
                {currentPs.map((p) => {
                    return (
                        <PointOverlay 
                            key={`saved_${p.id}`} 
                            color={"blue"} 
                            x={p.x}
                            y={p.y}
                            floor={floorIndex}
                            size={size}
                        />
                    )
                })}                
            </>
           
        )

    }, [floorIndex,savedPoints,points]);  

    return (
        <View style={{
            flex:1,

        }}>
            <ScrollView style={{
            }}>

            
            <BuildingDropDown val={buildingID} onChange={handleBuildingChange} />
            <FloorSelection initialFloor={floorIndex} onChange={handleFloorOnChange}/>
            <TitleInput value={title} onChange={handleTitleOnChange} />
            <View style={{

            }}>
                <TextInput
                    style={{
                        color:"black"
                    }}
                    value={version}
                    onChangeText={(text)=>setVersion(text)}
                    multiline={false} 
                />
            </View>                
            <DeviceOrientationSelection val={deviceOrientation} onChange={onDeviceOrientationChange}/>
            <HighTurbuanceSwitch value={isHighTurbuance} onChange={onHighTurChange}/>
            <TestSwitch value={isTest} onChange={onIsTestChange}/>
            
            <UnsureSwitch value={isUnsure} onChange={onIsUnsureChange}/>
            <PositionSelection 
                onChangeX={handleOnXChange}
                onChangeY={handleOnYChange}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                initialX={x}
                initialXBy={maxWidth/10}
                initialYBy={maxHeight/10}
                initialY={y}
            />
        
            <AdminBuildingFloorMap
                floorIndex={floorIndex}
            >
                 {userPosition}
                 {pointsOverlay}
            </AdminBuildingFloorMap>

            <AddButton onPress={addNewDataPoint}/>
            <View style={{
                paddingVertical:10,
            }}>

            </View>   

            </ScrollView>
            <DataModalButton dataLength={points.length} onSave={onSavePoints}>
                <FlatList
                    style={{padding:20}}
                    scrollEnabled
                    data={points}
                    renderItem={({item,index}) => {
                        return (
                            <PointData point={item} onDelete={() => onPointDelete(index)}/>
                        )
                    }}
                    keyExtractor={(item,index) => {
                        return `point_data_${item.timestamp}_${index}`;
                    }}
                />
            </DataModalButton>
            <View>
                <Text style={{color:'black'}}>
                    total save: {savedPoints.length}
                </Text>
            </View>
        </View>
    )
}
export default DataPointCollectionScreen;