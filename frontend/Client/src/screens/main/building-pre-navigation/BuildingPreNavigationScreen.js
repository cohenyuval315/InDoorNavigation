import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, selectActivePath } from "../../../app/active/active-slice";
import { selectMinFloor, selectNumberOfFloors } from "../../../app/map/map-slice";
import BuildingMap from "../components/BuildingMap";
import LoadingModal from "../../../components/modals/loading";
import RouteSVG from "../components/PathSVG";
import MapOverlay from "../../../layouts/map-overlay";
import { fetchNavigationPath, resetPaths, selectNavigationDestinationPOI, selectNavigationError, selectNavigationPathDistance, selectNavigationPathTimeLength, selectNavigationPaths, selectNavigationPathsSVGs, selectNavigationStatus, selectUserAccessibility, selectUserPosition, setDestinationPOI } from "../../../app/navigation/navigation-slice";
import Status from "../../../app/status";
import DropDownPicker from "react-native-dropdown-picker";
import NavigationPathsSVGs from "./components/navigation-paths-svgs/NavigationPathsSVGs";
import client from "../../../server/api-client";


const getSecondsTimeLengthString = (seconds) => {
    if (seconds < 60) {
        return `${seconds} seconds`;
    } else if (seconds < 3600) { // Less than one hour
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (remainingSeconds === 0) {
            return `${minutes} minutes`;
        } else {
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} minutes`;
        }
    } else { // One hour or more
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (minutes === 0 && remainingSeconds === 0) {
            return `${hours} hours`;
        } else if (remainingSeconds === 0) {
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes} hours`;
        } else {
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} hours`;
        }
    }
};

const BuildingPreNavigationScreen = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const destinationPOI = useSelector(selectNavigationDestinationPOI);
    const pathsSVGs = useSelector(selectNavigationPathsSVGs);
    const pathDistance = useSelector(selectNavigationPathDistance);
    const pathTimeLength = useSelector(selectNavigationPathTimeLength);
    
    


    const navigationError = useSelector(selectNavigationError);
    const navigationStatus = useSelector(selectNavigationStatus);
    const building = useSelector(selectActiveBuilding);
    const minFloor = useSelector(selectMinFloor);
    const numFloors = useSelector(selectNumberOfFloors);
    const [floorIndex,setFloorIndex] = useState(0);
    const userPosition = useSelector(selectUserPosition);
    const accessibility = useSelector(selectUserAccessibility)

    useEffect(() => {
        if(userPosition){
            console.log("pp",userPosition)
            setFloorIndex(userPosition.floor)
        }
    },[userPosition])


    const numberOfFloors = useSelector(selectNumberOfFloors);
    const initialOpacitiesValues = Array.from({ length: numberOfFloors }, (_, index) => index === 0 ? new Animated.Value(1) : new Animated.Value(0))

    const containerRef = useRef(null);
    const rotationRef = useRef(new Animated.Value(0)); 
    const opacitiesRef = useRef(initialOpacitiesValues);

    const [centerOn,setCenterOn] = useState(null);



    const displayPathes = () => {

    }

    const handleOnPathSelect = () => {

    }

    const handleOnGoNow = () => {
        props.navigation.navigate("navigation",{
  
        });
    }

    const renderTimeDistanceDisplay = () => {

    }

    const backButton = () => {

    }

    const savePath = (from,to) => {
        
    }

    // if(loading){
    //     return <LoadingScreen messages={[]}/>
    // }
    const onReject = () => {
        // add message TODO
        props.navigation.goBack();
        onLeave();
    }
    // const fetchPath = async () => {

    const onLeave = () => {
        dispatch(setDestinationPOI(null));
        dispatch(resetPaths());
    }
    // }

    useLayoutEffect(() => {
        const buildingId = building.id;
        if (!userPosition){
            // await client.getUserInitialWifiLocation();
        }
        dispatch(fetchNavigationPath({
            buildingId,
            destinationPOI,
            userPosition,
            accessibility
        }))

    }, []); 

    useEffect(() => {
        switch(navigationStatus){
            case Status.IDLE : {
                break;
            }
            case Status.FAILED: {
                setLoading(false);
                onReject()
                console.log(navigationError)
                break;
            }
            case Status.SUCCEEDED: {
                setLoading(false);
                break;
                
            }
            case Status.PENDING: {
                setLoading(true);
                break;
            }
        }

    },[navigationStatus])

    
    // useLayoutEffect(() => {
        
    //     if (!loading && containerRef.current) {
    //         console.log("BuildingMap component is fully rendered");
    //         // Perform any actions after the BuildingMap component is fully rendered
    //     }
    // }, [loading]);

    // if(loading){
    //     return (
    //         <LoadingModal visible={true}/>
    //     )
    // }



    const onContinuePress = () => {
        props.navigation.navigate('building-navigation')
    }

    const onCancelPress = () => {
        props.navigation.goBack();
        onLeave();
    }

    const [openDropdown,setOpenDropdown] = useState(false)
    const floors = Array.from({length:numFloors}).map((_,index) => {
        return {
            label: `floor ${index + minFloor}`,
            value: index
        }
    })

    if(loading){
        return <LoadingModal visible={true}/>
    }

    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor:'lightgray',
                flexDirection:'row',
            }}>
                <DropDownPicker
                    items={floors}
                    open={openDropdown}
                    setOpen={setOpenDropdown}
                    setValue={setFloorIndex}
                    value={floorIndex}
                    listMode="MODAL"
                />
              
            </View>
            <BuildingMap
                // centerOn={centerOn}
                containerRef={containerRef}
                containerRotationRef={rotationRef}
             
                // opacitiesRef={opacitiesRef}
                // rotationRef={rotationRef}
                // rotateChildren={true}
                centerOn={{
                    x:0,
                    y:0,
                    scale:0.3,
                    duration:300,
                }}
                currentFloorIndex={floorIndex}
                onPOIPress={() => {}}
                onPanMove={() => {}}
                rotationRef={rotationRef}
                opacitiesRef={opacitiesRef}
                rotateChildren={true}
                imageProps={{
                    maxScale:0.3,
                    // minScale:0.3,
                }}
                
                
            >
                <NavigationPathsSVGs currentFloorIndex={floorIndex} pathsSVGs={pathsSVGs} />
            </BuildingMap>
            <View style={{
                backgroundColor:"#0A4A6A",
                borderTopEndRadius:20,
                borderTopStartRadius:20,

            }}>
                <View style={{
                    justifyContent:'space-between',
                    padding:10,
                }}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-around',
                    }}>
                        <Text style={{
                            fontSize:16,
                            color:'white',
                            fontWeight:'bold',
                        }}>
                            Time Length: 
                        </Text>
                        <Text style={{
                            fontSize:16,
                            color:'white',
                            // fontWeight:'bold',
                        }}>
                            {getSecondsTimeLengthString(pathTimeLength)}
                        </Text>
                    </View>

                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-around',
                    }}>
                        <Text style={{
                            fontSize:16,
                            color:'white',
                            fontWeight:'bold',
                        }}>
                            Distance:
                        </Text>     
                        <Text style={{
                            fontSize:16,
                            color:'white',
                            
                        }}>
                            {pathDistance}m
                        </Text>                                   
                    </View>

                </View>

                <View style={{
                    flexDirection:'row',
                    justifyContent:"center"
                }}>
                    <TouchableOpacity style={{
                        padding:10,
                        paddingHorizontal:20,
                        backgroundColor:"lightgray",
                        borderRadius:30,
                        margin:20,
                    }} onPress={onCancelPress}>
                        <Text style={{
                            color:"black",
                            textAlign:'center'
                        }}>
                            cancel
                        </Text>
                    </TouchableOpacity>                     
                    <TouchableOpacity onPress={onContinuePress} style={{
                        padding:10,
                        paddingHorizontal:20,
                        backgroundColor:"lightgreen",
                        borderRadius:30,
                        margin:20,
                    }}>
                        <Text style={{
                            color:"black",
                            textAlign:'center'
                        }}>
                            Continue
                        </Text>
                    </TouchableOpacity>
  
                </View>            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    text:{
        color:"black"
    }
})

export default BuildingPreNavigationScreen;