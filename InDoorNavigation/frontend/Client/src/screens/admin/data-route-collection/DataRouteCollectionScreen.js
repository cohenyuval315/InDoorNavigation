import { useEffect, useMemo, useRef, useState } from "react";
import {  ScrollView, Text, TouchableOpacity, View } from "react-native";
import BuildingDropDown from "../../../components/features/building/dropdown";
import RouteBuilder from "./components/route-builder";
import ActiveRouteOverlay from "./components/active-route-overlay";
import {  fetchBuildingByMapId, selectMapStatus, selectMapsDims, selectMinFloor } from "../../../app/map/map-slice";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import { useConfirmationModal } from "../../../contexts/ConfirmationModalContext";
import {  fetchBuildingGraphById, selectGraphStatus, selectProcessingError, selectProcessingRoutes, selectProcessingStatus, uploadProcessingRoute } from "../../../app/admin/admin-slice";
import client from "../../../server/api-client";
import { UserSpatialDataStreamService } from "../../../services/UserSpatialDataStreamService";
import FloorSelection from "../../../components/features/floors/selection";
import SwitchBase from "../../../components/general/switch";
import BuildingMap from "../../../components/features/building/map";
import Status from "../../../app/status";



const DataRouteCollectionScreen = () => {
    const dispatch = useDispatch()
    const {openConfirm} = useConfirmationModal()

    const mapStatus = useSelector(selectMapStatus)
    const graphStatus = useSelector(selectGraphStatus);
    const minFloor = useSelector(selectMinFloor);
    const mapsDims = useSelector(selectMapsDims);
    const processingRoute = useSelector(selectProcessingRoutes);
    const processingStatus = useSelector(selectProcessingStatus);
    const processingError = useSelector(selectProcessingError)
    

    const [buildingID,setBuildingID] = useState(null);
    const [routeName,setRouteName] = useState('routetest');
    const [route,setRoute] = useState([]);
    const [searchedRoute,setSearchedRoute] = useState(null);
    const [currentFloorIndex ,setCurrentFloorIndex] = useState(0);
    
    const [isTest,setIsTest] = useState(false);
    const [isUnsure,setIsUnsure] = useState(false);
    const [isStart, setIsStart] = useState(false);

    const [loadingBuildingData,setLoadingBuildingData] = useState(false);

    const containerRef = useRef(null);
    const prevBuildingID = useRef(null);

    const checkpointsRef = useRef([])
    const checkpointIndexRef = useRef(null);
    const allDataRef = useRef([]);


    useEffect(()=>{
        if((buildingID && mapStatus === Status.IDLE && graphStatus === Status.IDLE) || (
            buildingID && prevBuildingID.current !== buildingID
        )){
            // console.log("fetching data....");
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


    useEffect(() => {
        onReset();
        if (route.length > 0){
            alignRouteMap(0);
        }else{
            setCurrentFloorIndex(0);
        }
    },[route])


    useEffect(() => {
        const userStream = UserSpatialDataStreamService.getInstance().startStream().then((stream) => {
            return UserSpatialDataStreamService.getInstance().subscribe({
                next:(data) => onDataNext(data),
                error:(err) => onDataError(err),
                complete:onDataComplete,
            })
        })
        return () => {
            userStream.then((sub) => {
                sub.unsubscribe();
            })
        }
    },[])

    

    const onDataNext = (data) => {
        if(allDataRef.current){
            allDataRef.current.push(data)
        }
        
    }
    const onDataComplete = () => {
        console.log("route data complete");
    }
    
    const onDataError = (error) => {
        console.log("route data error", error);
    }


    const searchRoute = async () => {
        if(searchedRoute){
            setSearchedRoute(null);
            return;
        }
        const res = await client.getBuildingProcessingRoute(buildingID,routeName);
        if(res){
            console.log(res);
            setSearchedRoute(res);
        }else{
            setSearchedRoute({message:"failed"});
        }
    }


    const activeRoute = useMemo(() => {
        return (
            <ActiveRouteOverlay 
                route={route}
                floorIndex={currentFloorIndex}
            />
        )
    },[route,currentFloorIndex])


    // useEffect(() => {   
    //     const searchRouteName = "routetest3";
    //     switch(processingStatus){
    //         case Status.IDLE : {
    //             if(buildingID && routeName){
    //                 console.log("IDLE")
    //                 console.log(buildingID)
    //                 console.log(routeName)
    //                 dispatch(fetchProcessingRoute({buildingId:buildingID,routeName:searchRouteName}));
                    
    //             }
    //             break;
    //         }
                
    //         case Status.SUCCEEDED:{
    //             console.log("completed")
    //             if (!processingRoute){
    //                 console.log("not found ", searchRouteName)
    //                 setError('SOMETHING WRONG')
    //             }else{
    //                 console.log("found ", searchRouteName)
    //                 console.log(Object.keys(processingRoute))

    //                 let sensors = [...processingRoute.sensorsData];
    //                 sensors.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    //                 const startTime = sensors[0].timestamp
    //                 const lastTime = sensors[processingRoute.sensorsData.length - 1].timestamp
    //                 console.log("first",startTime)
    //                 console.log("last:",lastTime)
    //                 const d1 = new Date(startTime)
    //                 const d2 = new Date(lastTime)
    //                 console.log(d1)
    //                 console.log(d2)
    //                 const diff = d2 - d1;
    //                 console.log("diff",diff)
    //                 setError('')
                    
    //             }
                
    //             break;
    //         }
    //         case Status.FAILED: {
    //             console.log("FAILED!...")
    //             console.log(processingError)
    //             setError(processingError)
    //             break;
    //         }
    //         case Status.PENDING:{
    //             console.log("PENDING PROCESSING...")
    //             setError('')
    //             break;
    //         }
    //     }

    // },[processingStatus,buildingID,routeName])



    const getRouteData = () => {
        const data = {
            buildingId:buildingID,
            routeName:routeName,
            route:route,
            checkpoints:checkpointsRef.current,
            data:{
                data:allDataRef.current,
                isTest:isTest,
                route:route,
            }
        }
        return data;
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
            allDataRef.current = [];
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
                // setSearchedRoute(data)
                // console.log(data.data.alldata.length)
                // console.log(data.data.alldata.filter((i) => i.wifi))
                dispatch(uploadProcessingRoute({
                    buildingId:buildingID,
                    data:data
                }))
                // dispatch(fetchProcessingRoute({buildingId:buildingID,routeName:routeName}))
            })
      };


    const handleFloorOnChange = (value) => {
        setCurrentFloorIndex(value)
    }

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
            }}>
                <BuildingDropDown val={buildingID} onChange={handleBuildingChange} />
                {buildingID && !loadingBuildingData && mapsDims && (
                    <FloorSelection initialFloor={currentFloorIndex} onChange={handleFloorOnChange}/>
                )}
                <Text>
                    current: {checkpointIndexRef && checkpointIndexRef.current && checkpointIndexRef.current}
                </Text>
                <SwitchBase title={"test"} value={isTest} onChange={onIsTestChange}/>
                {buildingID && !loadingBuildingData && mapsDims && (
                    <>
                        <RouteBuilder route={route} onChange={onRouteChange} />
                        <BuildingMap
                            currentFloorIndex={currentFloorIndex}
                            containerRef={containerRef}
                            cropHeightScale={0}
                            cropWidthScale={0}
                            imageProps={{
                                panToMove:true,
                            }}
                            floorChildren={
                                <>
                                    {activeRoute}
                                </>
                            }
                        />
                        <View style={{

                        }}>
                            <View>
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
                            <View style={{
                                height:100,
                                zIndex:30,
                            }} nestedScrollEnabled>
                                <View>
                                    <View style={{
                                        flexDirection:"row",
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }}>
                                    <TextInput style={{
                                        flex:1,
                                        backgroundColor:"white",
                                        color:"black"
                                    }}   value={routeName} 
                                        onChangeText={(val) => {
                                        setRouteName(val)
                                    }}/>
                                    <TouchableOpacity onPress={searchRoute}>
                                        <Text style={{
                                            color:"black",
                                            padding:10,
                                            backgroundColor:"red"
                                        }}>
                                            {!searchedRoute ? "search" : "clear"}
                                        </Text>
                                    </TouchableOpacity>
                                    </View>
                                    <ScrollView style={{
                                        maxHeight:200
                                    }}>
                                    <Text style={{
                                            color:"black"
                                        }}>
                                        {searchedRoute && JSON.stringify(searchedRoute,null,2)}
                                    </Text>
                                    </ScrollView>
                                </View>
                            </View>                            
                        </View>
                            </>
                        )}
            </View>

        </View>
    )
}
export default DataRouteCollectionScreen;