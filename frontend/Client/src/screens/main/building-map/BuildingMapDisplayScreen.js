import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
// import BuildingMap from "./../components/building-map/BuildingMap";
import client from "../../../services/server/api-client";
import BuildingMap from "../components/BuildingMap";
import { useSelector } from "react-redux";
import { selectMap,selectMapData, selectMapError, selectMapStatus } from "../../../app/map/map-slice";
import Status from "../../../app/status";
import { LoadingScreen } from "../../general";
import BuildingMapSVG from "./components/building-map/BuildingMapSVG";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../utils/scaling";
import BuildingPOIsMapBottomDrawer from "./components/search-bar-bottom-drawer/BuildingPOIsMapBottomDrawer";
import LoadingModal from "../../../components/modals/loading";
import BuildingMapDisplayMap from "./BuildingMapDisplayMap";



const BuildingMapDisplayScreen = (props) => {
    const mapStatus = useSelector(selectMapStatus);
    const mapError = useSelector(selectMapError);
    const [loading,setLoading] = useState(true);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [mapComponent, setMapComponent] = useState(null);

    useEffect(() => {
        switch(mapStatus){
            case Status.SUCCEEDED:{
                setLoading(false);
                break;
            }
            // case Status.FAILED:{
            //     console.error(mapError)
            //     setLoading(true);
            // }
            // case Status.IDLE:{
            //     console.error("map was not even called ...")
            //     setLoading(true);
            // }
            // case Status.PENDING:{
            //     setLoading(true);
            // }
                
        }
    }, [mapStatus])

    useEffect(() => {
        const timer = setTimeout(() => {
            setMapComponent(
                <BuildingMapDisplayMap /> 
            );
        });
    
        return () => clearTimeout(timer);
    }, [props]);


    if (loading) {
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <BuildingPOIsMapBottomDrawer />
            {mapComponent || (
                <LoadingModal visible={true} />
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:"100%",
        width:"100%"
    },
    backButton:{
        backgroundColor:"white",
        borderRadius:5,
        position: 'absolute', 
        top: 27, 
        left: 10,
        padding:5,
        zIndex:2, 
    }
})

export default BuildingMapDisplayScreen;