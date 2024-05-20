import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectActivePath } from "../../../app/active/active-slice";
import { selectNumberOfFloors } from "../../../app/map/map-slice";
import BuildingMap from "../components/BuildingMap";
import LoadingModal from "../../../components/modals/loading";
import RouteSVG from "../components/PathSVG";
import MapOverlay from "../../../layouts/map-overlay";

const PathesRoutes = () => {
    const examplePath = {

    }
    return (
        <MapOverlay>
                <RouteSVG
                    width={300}
                    height={700}
                    routeCoordinates={[
                        [50, 50],  // Start
                        [50, 150], // Stop 1
                        [150, 150],// Stop 2
                        [150, 250],// Destination
                    ]}
                    boxSize={20} // Size of the boxes
                />
        </MapOverlay>
    )
}

const BuildingPreNavigationScreen = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    const numberOfFloors = useSelector(selectNumberOfFloors);
    const initialOpacitiesValues = Array.from({ length: numberOfFloors }, (_, index) => index === 0 ? new Animated.Value(1) : new Animated.Value(0))

    const containerRef = useRef(null);
    const rotationRef = useRef(new Animated.Value(0)); 
    const opacitiesRef = useRef(initialOpacitiesValues);
    const [centerOn,setCenterOn] = useState(null);


    const s = useSelector(selectActivePath);
    console.log(s)
    // const buildingMapData = props.route.params.buildingMapData;
    // const mapSvgData = props.route.params.mapSvgData;
    // const initialFloorIndex = props.route.params.floorIndex;
    // const building = props.route.params.building;

    // const [loading,setLoading] = useState(true);
    // const [floorIndex,setFloorIndex] = useState(initialFloorIndex);
    // const [pathes,setPathes] = useState(null);
    // const [selectedPath,setSelectedPath] = useState(null);

    // useEffect(()=>{
    //     const fetchPathes = async () => {
    //         setLoading(true);
    //         const data = [1];
    //         setPathes(data)
    //         setSelectedPath(data[0]);
    //         setLoading(false);
    //     }
    //     fetchPathes();
    // },[])

    const calculateBestPathes = () => {

    }

    const displayPathes = () => {

    }

    const handleOnPathSelect = () => {

    }

    const handleOnGoNow = () => {
        props.navigation.navigate("navigation",{
            buildingMapData,
            mapSvgData,
            floorIndex,
            building,
            selectedPath
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
    const onCancel = () => {
        props.navigation.goBack();
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching data
            // Simulate loading delay
            await new Promise(resolve => setTimeout(resolve, 100));
            // Simulate data retrieval
            const simulatedData ={
                data:{
                    routes:[
                        {
                            route:[
                                [50, 50],  // Start
                                [50, 150], // Stop 1
                                [150, 150],// Stop 2
                                [150, 250],// Destination
                            ]
                        },
                        {

                        },
                        {

                        }
                    ]
                }
            };
            const errorData= {error:'error'}
            setData(simulatedData);
            setLoading(false); // Set loading to false after data retrieval
        };

        // Call the fetchData function
        fetchData();

        // Clean-up function
        return () => {
            // If cleanup is needed, you can do it here
        };
    }, []); 
    useLayoutEffect(() => {
        if (!loading && containerRef.current) {
            console.log("BuildingMap component is fully rendered");
            // Perform any actions after the BuildingMap component is fully rendered
        }
    }, [loading]);

    if(loading && !data){
        return (
            <LoadingModal visible={true}/>
        )
    }

    if(data && data.error){
        onCancel();
        props.navigation.navigate('error-message',{error:data.error})
        return;
        
        
    }

    const onContinuePress = () => {
        props.navigation.navigate('building-navigation')
    }

    const onCancelPress = () => {
        props.navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor:'lightgray',
                flexDirection:'row',
            }}>
                <TouchableOpacity style={{
                    flex:1,
                    flexDirection:'row',
                    justifyContent:'center',
                    borderColor:'black',
                    borderWidth:1,
                    padding:20,
                    backgroundColor:'pink'
                }}>
                    <Text style={styles.text}>
                        Path1:
                    </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex:1,
                    flexDirection:'row',
                    justifyContent:'center',
                    borderColor:'black',
                    borderWidth:1,
                    padding:20,                    
                }}>
                    <Text style={styles.text}>
                        Path2:
                    </Text>  
                </TouchableOpacity>
              
            </View>
            <BuildingMap
                centerOn={centerOn}
                containerRef={containerRef}
                opacitiesRef={opacitiesRef}
                rotationRef={rotationRef}
                rotateChildren={true}
            >
                <PathesRoutes/>
            </BuildingMap>
            <View style={{
                backgroundColor:"lightblue"
            }}>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    padding:10,
                }}>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            fontSize:16,
                            color:'black',
                            fontWeight:'bold',
                        }}>
                            Time Length: 
                        </Text>
                        <Text style={{
                            fontSize:16,
                            color:'black',
                            fontWeight:'bold',
                        }}>
                            30min
                        </Text>
                    </View>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            fontSize:16,
                            color:'black',
                            fontWeight:'bold',
                        }}>
                            Distance:
                        </Text>     
                        <Text style={{
                            fontSize:16,
                            color:'black',
                            fontWeight:'bold',
                        }}>
                            100m
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