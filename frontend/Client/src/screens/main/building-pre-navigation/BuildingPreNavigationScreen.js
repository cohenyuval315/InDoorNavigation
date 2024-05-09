import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, Text, View } from "react-native";
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

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                hello
            </Text>
            <BuildingMap
                centerOn={centerOn}
                containerRef={containerRef}
                opacitiesRef={opacitiesRef}
                rotationRef={rotationRef}
                rotateChildren={true}
            >
                <PathesRoutes/>
            </BuildingMap>
            <View>
                <Text style={styles.text}>
                    he
                </Text>
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