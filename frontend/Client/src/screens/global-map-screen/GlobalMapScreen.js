import { Text, View,StyleSheet,Linking,Platform, Dimensions,TouchableOpacity, TextInput, Alert  } from "react-native";
import { useEffect, useRef, useState } from "react";
import SearchBarBottomSheet from "./components/search-bar/SearchBarBottomSheet";
import MapView, { Marker } from "react-native-maps";
import { Svg, SvgXml,SvgFromXml } from "react-native-svg";

import ActualAsset from "../../assets/israel"
import ImageZoom from "react-native-image-pan-zoom";
import { globalCoordinatesToFloats } from "../../static-maps/utils";
import { israelLocationMapSVG } from "../../static-maps/israel/IsraelSVGMap";
import { getIsraelPointByGlobalCoordinates } from "../../static-maps/israel";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { selectAllBuildings, selectBuildings, selectBuildingsError, selectBuildingsStatus } from "../../app/building/buildings-slice";
import Status from "../../app/status";
import {fetchBuildings} from './../../app/building/buildings-slice'
import LoadingScreen from "../LoadingScreen";
import GlobalMap from "./components/global-map/GlobalMap";
import { showError } from "../../utils/alert";

import DrawerToggleButton from "../../layouts/app-drawer/DrawerToggleButton";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GlobalMapScreen = (props) => {
    const buildings = useSelector(selectAllBuildings)
    const buildingsStatus = useSelector(selectBuildingsStatus)
    const buildingsError = useSelector(selectBuildingsError)

    const bottomSheetRef = useRef(null);
    const imageZoomRef = useRef(null);

    const [selectedBuilding,setSelectedBuilding] = useState(null);

    const onBuildingSelect = (building) => {
        setSelectedBuilding(building);
    }

    const onBuildingDeSelect = () => {  
        setSelectedBuilding(null);
    }

    const onBuildingPress = (building) => {
        setSelectedBuilding(building);
    }

    const onBuildingSearchItemPress = (building) => {
        setSelectedBuilding(building);
        
    }

    const onBuildingMapPress = (building) => {
        props.navigation.navigate('BuildingMap', { building:building })
    }


    const dispatch = useDispatch();
    useEffect(()=>{
        switch(buildingsStatus){
            case Status.IDLE:{
                dispatch(fetchBuildings())
                break;
            }
        }
    },[dispatch])


    const renderScreen = () => {
        switch(buildingsStatus){
            case Status.IDLE:{
                return <LoadingScreen/>
            }
            case Status.PENDING:{
                return <LoadingScreen/>
            }
            case Status.FAILED:{
                showError(buildingsError)
                return <LoadingScreen/> // for now
            }
            case Status.SUCCEEDED:{
                return <GlobalMap
                    buildings={Object.values(buildings)}
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

                />
            }
        }
    }

    return (
        <View style={styles.container}>
            <DrawerToggleButton {...props}/>
            {renderScreen()}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})



export default GlobalMapScreen;