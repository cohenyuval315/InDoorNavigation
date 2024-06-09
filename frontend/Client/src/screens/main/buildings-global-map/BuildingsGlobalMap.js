import { Animated, BackHandler, Dimensions, Easing, Text, View } from "react-native";
import {MapFlexLayout} from "../../../layouts/map-layout";
import { useEffect, useRef, useState } from "react";
import ImageZoom from "../../../components/map/image-zoom";
import { israelMapSVGXML } from "../../../static-maps/israel";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, setActiveBuilding } from "../../../app/active/active-slice";
import GlobalMapSVG from "./components/global-map/GlobalMapSVG";
import GlobalMapBuildingsOverlay from "./components/buildings-overlay/GlobalMapBuildingsOverlay";
import GlobalMapUserOverlay from "./components/user-position-overlay/GlobalMapUserOverlay";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import GlobalMapLoadingOverlay from "./components/loading-messages";
import useLoadingMessages from "../../../hooks/useLoadingMessages";
import LoadingComponent from "./components/widgets-overlay/LoadingComponent";
import BuildingsGlobalMapBottomDrawer from "./components/search-bar-bottom-drawer/BuildingsGlobalMapBottomDrawer";
import useGPS from "../../../hooks/useGPS";


const BuildingsGlobalMap = () => {
    // const {loadingMessages,removeMessageByText,addMessage} = useLoadingMessages();
    const imageZoomRef = useRef();
    const dispatch = useDispatch();
    const [centerOn,setCenterOn] = useState(null);
    const selectedBuilding = useSelector(selectActiveBuilding);
    const {subscribeGPS,unsubscribeGPS} = useGPS();
    const [userGeoPosition, setUserGeoPosition] = useState(null);
    

    const [isLowAccuracy,setIsLowAccuracy] = useState(false);
    const [errorMessage,setErrorMessage] = useState(null);;

    const onPosition = (position) => {
        if (!position){
            return;
        }
            const coords = position.coords;
            const {accuracy,heading,latitude,longitude,altitude,speed} = coords;

    }

    const onPositionError = (error) => {
        setErrorMessage(error.message);
    }
    
    useEffect(() => {
        subscribeGPS(onPosition,onPositionError);
        return () => unsubscribeGPS();
    },[]) 


    useEffect(() => {
   
        if(selectedBuilding){
            const centerX = WINDOW_WIDTH/2
            const CenterY = WINDOW_HEIGHT/2
            const buildingCenterOn = {
                x: Math.abs(centerX - selectedBuilding.mapCoordinates.x * WINDOW_WIDTH / 100) / 2,
                y: Math.abs(CenterY - selectedBuilding.mapCoordinates.y * WINDOW_HEIGHT / 100) / 2,
                scale: 2,
                duration: 300 ,
            }
            setCenterOn(buildingCenterOn);

        }else{
            const defaultCenterOn = {
                x: 0,
                y: 0,
                scale: 1,
                duration: 300 ,
            }            
            setCenterOn(defaultCenterOn);
        }
        const backAction = () => {
            if (selectedBuilding){
                dispatch(setActiveBuilding(null));
                return true;
            }else{
                return true; // for now TODO
            }
        };     
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
      
        return () => backHandler.remove();
    }, [selectedBuilding])
    

    return (
        <MapFlexLayout>
            <View style={{
                flex:1,
                backgroundColor:"black"
            }}>
                <ImageZoom 
                    style={{
                        flex:0
                    }}
                    ref={imageZoomRef} 
                    cropWidth={WINDOW_WIDTH}
                    cropHeight={WINDOW_HEIGHT}
                    imageWidth={WINDOW_WIDTH}
                    imageHeight={WINDOW_HEIGHT}
                    panToMove={!selectedBuilding}
                    enableDoubleClickZoom={!selectedBuilding}
                    pinchToZoom={!selectedBuilding}
                    centerOn={centerOn}
                    minScale={1}
                >

                    <GlobalMapSVG 
                        width={WINDOW_WIDTH}
                        height={WINDOW_HEIGHT}
                        xml={israelMapSVGXML}
                    />
              
                    <GlobalMapBuildingsOverlay />
                    <GlobalMapUserOverlay />
                    <GlobalMapLoadingOverlay />
                </ImageZoom>
            </View>
            <View style={{
                flex:1,
            }}>
                <BuildingsGlobalMapBottomDrawer/>
                {/* <LoadingComponent messages={['hello']}/> */}
            </View>

            

        </MapFlexLayout>
    )
}

export default BuildingsGlobalMap;