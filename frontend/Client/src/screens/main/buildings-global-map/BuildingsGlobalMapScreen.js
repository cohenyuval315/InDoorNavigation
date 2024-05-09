import { Text, View,StyleSheet,Linking,Platform, Dimensions,TouchableOpacity, TextInput, Alert, Button  } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
// import { getIsraelPointByGlobalCoordinates } from "../../static-maps/israel";
import { useSelector } from "react-redux";
import { selectAllBuildings } from "../../../app/building/buildings-slice";
import { selectActiveBuilding, setActiveBuilding } from "../../../app/active/active-slice";
import BuildingsGlobalMap from "./BuildingsGlobalMap";

// import Status from "../../app/status";
// import {fetchBuildings} from './../../app/building/buildings-slice'
// import LoadingScreen from "../general/loading-screen/LoadingScreen";
// import GlobalMap from "./components/global-map/GlobalMap";
// import { showError } from "../../utils/alerts";
// import { isMapServiceAvailable, openMap } from "../../services/3rd-party/map-service-provider";
// import DrawerToggleButton from "../../layouts/app-drawer/DrawerToggleButton";
// import { getGlobalGeoCoordinatesByGPS } from "../../sensors/GPS";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BuildingsGlobalMapScreen = memo((props) => {
    
    
    const buildings = useSelector(selectAllBuildings)
    const activeBuilding = useSelector(selectActiveBuilding);

    const onBuildingSelect = (building) => {
        setActiveBuilding(building)
    }

    // const bottomSheetRef = useRef(null);
    // const imageZoomRef = useRef(null);

    // const [selectedBuilding,setSelectedBuilding] = useState(null);
    // const [isGPSAvailable,setIsGPSAvailable] = useState(null);
    // const [isMapServiceInstalled,setIsMapServiceInstalled] = useState(null);
    // const [userMapCoordinates,setUserMapCoordinates] = useState(null);
    // const [locationEnabled, setLocationEnabled] = useState(true); 
    // const [noDirectionsErrorMessage,setNoDirectionsErrorMessage] = useState('');
    // const [timeCounter, setTimeCounter] = useState(0);
    // const [setMessage] = useState()
    // const [loadingMessages,setLoadingMessages] = useState(["restart gps","connecting to websocket"]);

    // const platformMap = Platform.OS === 'android' ? 'Google Maps' : Platform.OS === 'ios' ? 'Apple Maps' : null;

    // const recheckTimeLength = 1;
    // const offsetFunction = (globalCoordinates) => getIsraelPointByGlobalCoordinates(globalCoordinates,windowWidth,windowHeight);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setTimeCounter((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    // useEffect(()=>{
    //     isMapServiceAvailable().then((val)=>{
    //         setIsMapServiceInstalled(val);
    //     })
    // },[])

    // const LocationIsDisabled = () => {
    //     return !locationEnabled && (
    //         <Alert
    //             title="Location Services Disabled"
    //             message="Please enable location services to use this feature."
    //             buttons={[
    //             { text: 'OK', onPress: () => console.log('OK Pressed') }
    //             ]}
    //         />
    //     )
    // }
    // const onGPSError = (error) => {
    //     if(error.code === 2){ // No Location Services
    //         // {"ACTIVITY_NULL": 4, "PERMISSION_DENIED": 1, "POSITION_UNAVAILABLE": 2, "TIMEOUT": 3, "code": 2, "message": "No location provider available."}
    //         setLocationEnabled(false);
    //     }
    //     setNoDirectionsErrorMessage(error.message);        
    // }

    // const onGPSSuccessCallback = (position) => {
    //         // {
    //         //  "coords": {
    //         //         "accuracy": 13.399999618530273, 
    //         //         "altitude": 64.2, 
    //         //         "heading": 0, 
    //         //         "latitude": 31.934605, 
    //         //         "longitude": 34.80656666666666, 
    //         //         "speed": 0
    //         //     }, 
    //         //     "extras": {
    //         //         "maxCn0": 34, 
    //         //         "meanCn0": 26, 
    //         //         "satellites": 6
    //         //     }, 
    //         //     "mocked": false, 
    //         //     "timestamp": 1710794540908
    //         // }            
   
        
    //     const userGeoLocation = {
    //         latitude:position.coords.latitude,
    //         longitude:position.coords.longitude
    //     }
    //     const userPoint = offsetFunction(userGeoLocation)
    //     setUserMapCoordinates(userPoint);
    //     setIsGPSAvailable(true);
    //     setLocationEnabled(true);
    // }
    

    // useEffect(() => {
    //     if (timeCounter === 0) {
    //         getGlobalGeoCoordinatesByGPS(onGPSSuccessCallback,onGPSError);
    //         setTimeCounter(recheckTimeLength);
    //     }

    //     let timer;
    //     if (timeCounter === 0) {
    //         timer = setTimeout(() => {
    //             setIsGPSAvailable(null);
    //         }, recheckTimeLength * 1000);
    //     }

    //     return () => clearTimeout(timer);

    // }, [timeCounter]); 
        
    // const onBuildingSelect = (building) => {
    //     setSelectedBuilding(building);
    // }

    // const onBuildingDeSelect = () => {  
    //     setSelectedBuilding(null);
    // }

    // const onBuildingPress = (building) => {
    //     setSelectedBuilding(building);
    // }

    // const onBuildingSearchItemPress = (building) => {
    //     setSelectedBuilding(building);
    // }

    // const onBuildingMapPress = (building) => {
    //     props.navigation.navigate('BuildingMap', { building:building })
    // }


    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     switch(buildingsStatus){
    //         case Status.IDLE:{
    //             dispatch(fetchBuildings())
    //             break;
    //         }
    //     }
    // },[dispatch])

    

    // const directionsAvailable = false;
    // const noDirectionsMessage = "No GPS Reception";
    // const onDirectionPress = (building) => {

    // }

    // const getLoadingMessage = () => {
    //     const messages = [];

    //     if(userMapCoordinates === null){
    //         messages.push("getting geo coordinates")
    //     }
    //     return messages;
    // }

    // const getNoDirectionMessages = () => {
    //     const messages = [];
    //     if(!locationEnabled){
    //         messages.push("no location services")
    //     }else{
    //         if(!isGPSAvailable){
    //             messages.push(`no GPS reception.`)
    //         }
    //         if(!isMapServiceInstalled){
    //             messages.push(`${platformMap} is not installed.`)
    //         }
    
    //     }
    //     return messages;
    // }

    // const renderScreen = () => {
    //     switch(buildingsStatus){
    //         case Status.IDLE:{
    //             return <LoadingScreen/>
    //         }
    //         case Status.PENDING:{
    //             return <LoadingScreen/>
    //         }
    //         case Status.FAILED:{
    //             showError(buildingsError)
    //             return <LoadingScreen/> // for now
    //         }

            

    //         case Status.SUCCEEDED:{
    //             const buildingsWithCoordinates = Object.values(buildings).map((building)=>{
    //                 return {
    //                     ...building,
    //                     mapCoordinates:offsetFunction(building.globalCoordinates)
    //                 }
    //             });  
    //             const directionsAvailable = 
    //                 isGPSAvailable && 
    //                 isMapServiceInstalled &&
    //                 locationEnabled;
    //             const messages = getLoadingMessage()

    //         }
    //     }
    // }

    return (
        <View style={styles.container}>
            <BuildingsGlobalMap />
            {/* <DrawerToggleButton {...props}/> */}
            {/* <GlobalMap
                    buildings={buildingsWithCoordinates}
                    directionsAvailable={directionsAvailable}
                    userMapCoordinates={userMapCoordinates}
                    noDirectionsMessage={noDirectionsErrorMessage}
                    loadingMessages={messages}
                    onDirectionPress={onDirectionPress}
                    bottomSheetRef={bottomSheetRef}
                    imageZoomRef={imageZoomRef}
                    width={windowWidth}
                    height={windowHeight}
                    selectedBuilding={selectedBuilding}
                    onBuildingDeSelect={onBuildingDeSelect}
                    onBuildingSelect={onBuildingSelect}
                    onBuildingPress={onBuildingPress}
                    onBuildingSearchItemPress={onBuildingSearchItemPress}
                    onBuildingMapPress={onBuildingMapPress}
                /> */}
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        flex:1
    },
})



export default BuildingsGlobalMapScreen;