
import { Alert, Animated, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchBuildingByMapId, selectMap, selectMapStatus, selectMapsDims, selectMinFloor } from "../../../app/map/map-slice";
import BuildingDropDown from "../../../components/features/building/dropdown";
import AddButton from "../../../components/general/buttons/texts/add";
import FloorSelection from "../../../components/features/floors/selection";
import { generateUUID } from "../../../utils/id/uuid";
import { Direction } from "../../../constants/enums";
import PositionSelection from "./components/position-selection";
import PositionOverlay from "../components/position-overlay";
import { createTimestamp } from "../../../utils/time/time";
import PointData from "./components/point-data";
import DataModalButton from "../components/data-modal-button";

import DeviceOrientationSelection from "../components/device-orientation-selection";
import PointOverlay from "../components/point-overlay/PointOverlay";
import SensorsService, { SensorKey } from "../../../services/SensorsService";
import { fetchBuildingGraphById, fetchProcessingMap, selectGraphStatus, selectProcessingError, selectProcessingMap, selectProcessingStatus, uploadProcessingMap } from "../../../app/admin/admin-slice";
import { GeolocationService } from "../../../services/GpsService";
import client from "../../../server/api-client";
import { directionAngles } from "../../../constants/constants";
import SwitchBase from "../../../components/general/switch";
import TextInputBase from "../../../components/general/text-input";
import BuildingMap from "../../../components/features/building/map";
import BuildingMapGraphDataOverlay from "../../main/components/building-map-graph";
import Status from "../../../app/status";
import { WifiService } from "../../../services/WifiService";




const DataPointCollectionScreen = () => {
    const dispatch = useDispatch();
    const mapsDims = useSelector(selectMapsDims);
    const minFloor = useSelector(selectMinFloor)
    const mapStatus = useSelector(selectMapStatus)
    const graphStatus = useSelector(selectGraphStatus);
    const processingMap = useSelector(selectProcessingMap);
    const processingStatus = useSelector(selectProcessingStatus);
    const processingError = useSelector(selectProcessingError);

    const [version,setVersion] = useState("loc1");
    const [title,setTitle] = useState(null)
    

    const [floorIndex,setFloorIndex] = useState(0);
    const [searchedData,setSearchedData] = useState(null);
    const [message,setMessage] = useState('')
    
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const [buildingID,setBuildingID] = useState(null);


    const [isWifi,setIsWifi] = useState(true);
    const [isWifiOne,setIsWifiOne] = useState(true);
    const [isMang,setIsMang] = useState(true);
    const [isGps,setIsGps] = useState(true);

    const [points,setPoints] = useState([]);
    const [savedPoints,setSavedPoints] = useState([]);


    const [isHighTurbuance,setIsHighTurbuance] = useState(false);
    const [isTest,setIsTest] = useState(false);
    const [isUnsure,setIsUnsure] = useState(false);
    const [deviceOrientation,setDeviceOrientation] = useState({ roll: 0, pitch: 0, yaw: 0 });
    const [mapDirection,setMapDirection] = useState(Direction.UP);
    const [availableDirections,setAvailableDirections] = useState([]);

    const [loadingBuildingData,setLoadingBuildingData] = useState(false);

    const rotationRef = useRef(new Animated.Value(0));

    const containerRef = useRef(null);
    const prevBuildingID = useRef(null);
    const gpsData = useRef(null);
    const magData = useRef(null);
    const magUnData = useRef(null);
    const wifiData = useRef(null);



    const userPosition = useMemo(() => {
        if(!mapsDims){
            return null;
        }
        const userSize = mapsDims.height / 33;
        return (
            <PositionOverlay size={userSize} floor={floorIndex} x={x} y={y} rotationRef={rotationRef}/> 
        )

    }, [floorIndex,x,y,rotationRef.current,mapsDims]);   

    const pointsOverlay = useMemo(() => {
        if(!minFloor){
            return null;
        }
        const savedPs = savedPoints.filter((p) => p.floor === floorIndex + minFloor);
        const currentPs = points.filter((p) => p.floor === floorIndex + minFloor);
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

    }, [floorIndex,savedPoints,points,minFloor]);  

    const graphOverlay = useMemo(()=>{
        if(graphStatus !== Status.SUCCEEDED){
            return null;
        }
        return(
            <BuildingMapGraphDataOverlay floorIndex={floorIndex} />
        )
    },[floorIndex,graphStatus])

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


    useEffect(()=>{
        if((buildingID && mapStatus === Status.IDLE && graphStatus === Status.IDLE) || (
            buildingID && prevBuildingID.current !== buildingID
        )){
            console.log("fetching data....");
            dispatch(fetchBuildingByMapId(buildingID));
            dispatch(fetchBuildingGraphById(buildingID));
            setLoadingBuildingData(true);
        }
        prevBuildingID.current = buildingID;
    },[buildingID])
  

    useEffect(() => {
        const mapFin = mapStatus === Status.SUCCEEDED || mapStatus === Status.FAILED;
        const graphFin = graphStatus === Status.SUCCEEDED || graphStatus === Status.FAILED;
        if(mapFin && graphFin){
            setLoadingBuildingData(false)
        }
  
    },[dispatch,mapStatus,graphStatus])

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
        }
    }
    const onError = (err,sensorKey) => {

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

        return () => {
            mag.then((s)=>{
                s.unsubscribe()
            })
            magUn.then((s)=>{
                s.unsubscribe()
            })
        }
        
    },[])


    const generateTitle = () => {
        let poi = "";
        const currentTimestamp = createTimestamp(new Date());
        const numPoints = savedPoints.filter((p) => p.x === x && p.y === y && p.floor === floorIndex + minFloor).length
        const numPointsSaved = points.filter((p) => p.x === x && p.y === y && p.floor === floorIndex + minFloor).length
        const pointIndex = numPoints + numPointsSaved;
        let generatedTitle = `${buildingID}@${poi}@POINT@F${floorIndex + minFloor}@${x}@${y}@${mapDirection}@${currentTimestamp}@${pointIndex}`
        return generatedTitle
    }


    useEffect(()=>{
        const newTitle = generateTitle()
        setTitle(newTitle);
    },[
        mapDirection,
        buildingID,
        floorIndex + minFloor,
        x,
        y,
    ])

    const getData = async () => {
        let wifiData = null;
        let magnetometerData = null;
        let magnetometerUncalibData = null;
        let gpsData = null;

        setMessage('loading...')

        if(isWifi){
            if(isWifiOne){
                const samePoints = points.filter((p) => p.x == x && p.y == y)
                const atleastOneWifi = samePoints.some(obj => obj.wifiData !== null);
                if (atleastOneWifi){
                    setMessage("already have wifi");
                    return 
                }
            }
            
            wifiData = WifiService.getInstance().getCurrentWifiData();
            setMessage("fetching wifi data for this point...")
            if(typeof wifiData == "string"){
                setMessage("cannot fetch wifi data for this point yet...",wifiData)
                return;
            }else{
                setMessage('got wifi,')
            } 
            
        }

       
        if (isMang){
            magnetometerData = magData.current;
            magnetometerUncalibData = magUnData.current;
            if (!magnetometerData){
                setMessage(prev => prev + "failed to recv mang")
                return 
            }else{
                setMessage(prev => prev + ",got mang")
            }
            if (!magnetometerUncalibData){
                setMessage(prev => prev + "failed to recv uncalib mang")
                return 
            }else{
                setMessage(prev => prev + ",got uncalib mang")
            }
        }

        if(isGps){
            try {
                gpsData = await GeolocationService.getInstance().getCurrentGPSPosition({
                    enableHighAccuracy:true,
                    maximumAge:0,
                    timeout:3000
                })
                setMessage(prev => prev + ",got gps")
            }catch(error){
                setMessage(prev => prev + "cant get gps")
            }
        }


        const dataPoint = {
            id:generateUUID(),
            title:generateTitle(),
            timestamp:createTimestamp(new Date()),
            rawDate:new Date(),
            test:isTest,
            uncertain:isUnsure,
            floor:floorIndex + minFloor,
            x:x,
            y:y,           
            deviceOrientation:deviceOrientation, 
            direction:mapDirection,
            isHighTurbuance:isHighTurbuance,
            magnetometerData:magnetometerData,
            magnetometerUncalibData:magnetometerUncalibData,
            wifiData:wifiData,
            buildingID:buildingID,
            gpsData:gpsData
        }
 
        if(isGps || isWifi){
            setMessage(prev => prev + ",got sensors");
        }else{
            setMessage(",got sensors")
        }
        
        return dataPoint
    }

    const addNewDataPoint = async () => {
        const newDataPoint = await getData();
        if (newDataPoint){
            setPoints(prev => [...prev,newDataPoint]);
        }
    }

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
                    const data = {
                        points:points,
                        buildingId:buildingID,
                        version:version
                    }
                    console.log("version saving...",version)
                    dispatch(uploadProcessingMap({buildingId:buildingID,data:data}));
                    // savePoints(points);
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

    const onToggleSearchPress = async () => {
        if(searchedData){
            setSearchedData(null)
        }else{
            const response = await client.getBuildingProcessingPoints(buildingID,version)
            if(response.ok){
                const res = await response.json()
                setSearchedData(res);
            }else{
                setSearchedData({
                    message:"failed"
                })
            }
        }
    }
   
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

    const onIsWifiChange = () => {
        setIsWifi(prev => !prev);
    }
    const onIsWifiOneChange = () => {
        setIsWifiOne(prev => !prev);
    }
    const onIsMangChange = () => {
        setIsMang(prev => !prev);
    }    
    const onIsGpsChange = () => {
        setIsGps(prev => !prev);
    }


    // useEffect(() => {   
    //     switch(processingStatus){
    //         case Status.IDLE : {
    //         }
                
    //         case Status.SUCCEEDED:{
    //             if (!processingMap){
    //                 setError('SOMETHING WRONG')
    //             }else{
    //                 setError('')
    //             }
    //             break;
    //         }
    //         case Status.FAILED: {
    //             setError(processingError)
    //             break;
    //         }
    //         case Status.PENDING:{
    //             setError('')
    //             console.log("PENDING PROCESSING...")
    //         }
    //     }

    // },[processingStatus,buildingID,version])    




    useEffect(() => {
        Animated.timing(rotationRef.current, {
            toValue: directionAngles[mapDirection],
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [mapDirection]);

    



    return (
        <View style={{flex:1}}>
            <ScrollView>
                <BuildingDropDown val={buildingID} onChange={handleBuildingChange} />
                {buildingID && !loadingBuildingData && mapsDims && (
                    <>
                        <FloorSelection initialFloor={floorIndex} onChange={handleFloorOnChange}/>
                    </>
                )}
                <TextInputBase value={title} onChangeText={handleTitleOnChange}  multiline={true}/>
                <DeviceOrientationSelection val={deviceOrientation} onChange={onDeviceOrientationChange}/>
                <SwitchBase title={"high turb"} value={isHighTurbuance} onChange={onHighTurChange}/>
                <SwitchBase title={"gps"} value={isGps} onChange={onIsGpsChange}/>
                <SwitchBase title={"wifi"} value={isWifi} onChange={onIsWifiChange}/>
                <SwitchBase title={"one wifi per point"} value={isWifiOne} onChange={onIsWifiOneChange}/>
                <SwitchBase title={"test"} value={isTest} onChange={onIsTestChange}/>
                <SwitchBase title={"mag"} value={isMang} onChange={onIsMangChange}/>
                <SwitchBase title={"unsure"} value={isUnsure} onChange={onIsUnsureChange}/>
                {buildingID && !loadingBuildingData && mapsDims && (
                    <>
                        <PositionSelection 
                            onChangeX={handleOnXChange}
                            onChangeY={handleOnYChange}
                            maxHeight={mapsDims.height}
                            maxWidth={mapsDims.width}
                            initialX={x}
                            initialXBy={mapsDims.width/10}
                            initialYBy={mapsDims.height/10}
                            initialY={y}
                        />
                        <View style={{
                            height:500,
                        }}>
                            <BuildingMap
                                containerRef={containerRef}
                                currentFloorIndex={floorIndex}
                                cropHeightScale={1}
                                cropWidthScale={1}
                                imageProps={{
                                    // panToMove:true,
                                    minScale:0.3,
                                    scale:0.3
                                }}
                                floorChildren={
                                    <>
                                        {userPosition}
                                        {pointsOverlay}
                                    </>
                                }
                            />
                        </View>
                    </>
                )}

            </ScrollView>

                <Text style={{color:"black"}}>
                    {message}
                </Text>

                <AddButton onPress={addNewDataPoint}/>

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
                <View style={{
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center",
                    width:"100%"
                }}>
    
                    <TextInput
                        style={{
                            color:"black"
                        }}
                        value={version}
                        onChangeText={(text)=>setVersion(text)}
                        multiline={false} 
                    />
                        
                    <TouchableOpacity onPress={onToggleSearchPress} style={{
                        padding:10,
                    }}>
                        <Text style={{
                            color:"black",
                            backgroundColor:"red",
                            padding:10,
                            borderRadius:30,
                            width:"100%"
                        }}>
                        {!searchedData ? "search" : "clear"} 
                        </Text>
                    </TouchableOpacity>
                </View>

                    
                <ScrollView style={{height:100,}}>
                    <Text style={{color:"black"}}>
                        {searchedData ? JSON.stringify(searchedData,null,2) :(
                            <Text>
                                empty
                            </Text>
                        )}
                    </Text>
                </ScrollView>     
        </View>
    )
}
export default DataPointCollectionScreen;