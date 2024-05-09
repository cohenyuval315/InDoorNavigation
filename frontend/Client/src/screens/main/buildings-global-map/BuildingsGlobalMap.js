import { BackHandler, Dimensions, Text, View } from "react-native";
import {MapFlexLayout} from "../../../layouts/map-layout";
import { useEffect, useRef, useState } from "react";
import ImageZoom from "../../../components/map/image-zoom";
import { israelLocationMapSVG } from "../../../static-maps/israel/IsraelSVGMap";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, setActiveBuilding } from "../../../app/active/active-slice";
import { getIsraelPointByGlobalCoordinates } from "../../../static-maps/israel";
import GlobalMapSVG from "./components/global-map/GlobalMapSVG";
import GlobalMapBuildingsOverlay from "./components/buildings-overlay/GlobalMapBuildingsOverlay";
import GlobalMapUserOverlay from "./components/user-position-overlay/GlobalMapUserOverlay";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import GlobalMapLoadingOverlay from "./components/loading-messages";
import useLoadingMessages from "../../../hooks/useLoadingMessages";
import LoadingComponent from "./components/widgets-overlay/LoadingComponent";
import BuildingsGlobalMapBottomDrawer from "./components/search-bar-bottom-drawer/BuildingsGlobalMapBottomDrawer";


const BuildingsGlobalMap = () => {
    // const {loadingMessages,removeMessageByText,addMessage} = useLoadingMessages();
    const imageZoomRef = useRef();
    const dispatch = useDispatch();
    const [centerOn,setCenterOn] = useState(null);
    const selectedBuilding = useSelector(selectActiveBuilding);

    useEffect(() => {
   
        if(selectedBuilding){
            const centerX = WINDOW_WIDTH/2
            const CenterY = WINDOW_HEIGHT/2
            const buildingCenterOn = {
                x: Math.abs(centerX - selectedBuilding.mapCoordinates.x) / 2,
                y: Math.abs(CenterY - selectedBuilding.mapCoordinates.y) / 2,
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
                return false;
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
                >

                    <GlobalMapSVG 
                        width={WINDOW_WIDTH}
                        height={WINDOW_HEIGHT}
                        xml={israelLocationMapSVG.xml}
                    />
              
                    <GlobalMapBuildingsOverlay />
                    <GlobalMapUserOverlay />
                    {/* <GlobalMapLoadingOverlay loadingMessages={loadingMessages}/> */}
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