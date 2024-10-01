import { Animated, BackHandler, Dimensions, Easing, Text, View } from "react-native";
import {MapFlexLayout} from "../../../layouts/map-layout";
import { useEffect, useRef, useState } from "react";
import ImageZoom from "../../../components/general/image-zoom";
import { israelMapSVGXML } from "../../../static-maps/israel/israel.js";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, setActiveBuilding } from "../../../app/active/active-slice";
import GlobalMapBuildingsOverlay from "../components/global-map-buildings-overlay/GlobalMapBuildingsOverlay";
import GlobalMapUserOverlay from "../components/global-map-user-position/GlobalMapUserOverlay";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { GeolocationService } from "../../../services/GpsService";
import { SvgXml } from "react-native-svg";
import MapOverlay from "../../../layouts/map-overlay";
import LoadingMessagesWidget from "../../../components/features/widgets/loading-messages";
import GlobalMapWarningButton from "../components/buttons/global-map-warning";



const BuildingsGlobalMap = () => {
    const dispatch = useDispatch();
    const selectedBuilding = useSelector(selectActiveBuilding);

    const [centerOn,setCenterOn] = useState(null);
    const [userGeoPosition, setUserGeoPosition] = useState(null);
    
    const imageZoomRef = useRef();

    const zoomInScale = 2;
    const zoomInDuration = 300;
    const minScale = 1.2;

    const defaultCenterOn = {
        x: 0,
        y: 0,
        scale: 1.2,
        duration: 300,
    }    
    

    useEffect(() => {
        if(!GeolocationService.getInstance().isStreaming()){
            GeolocationService.getInstance().startStream();
        }
        GeolocationService.getInstance().subscribeGeoLocation({
            complete:() => onComplete(),
            error:(error) => onPositionError(error),
            next:(position) => {onPosition(position);
            }
        })
        return () => {
            
        }
    },[])

    const onPosition = (position) => {
        if (!position){
            return;
        }
            const coords = position.coords;
            const {accuracy,heading,latitude,longitude,altitude,speed} = coords;
            setUserGeoPosition(coords);
    }

    const onPositionError = (error) => {

    }
    const onComplete = () => {

    }
    
    

    useEffect(() => {
   
        if(selectedBuilding){
            const centerX = WINDOW_WIDTH/2
            const CenterY = WINDOW_HEIGHT/2
            const buildingCenterOn = {
                x: Math.abs(centerX - selectedBuilding.mapCoordinates.x * WINDOW_WIDTH / 100) / 2,
                y: Math.abs(CenterY - selectedBuilding.mapCoordinates.y * WINDOW_HEIGHT / 100) / 2,
                scale: zoomInScale,
                duration: zoomInDuration,
            }
            setCenterOn(buildingCenterOn);

        }else{
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
                minScale={minScale}
            >

                <View style={{flex:1}}>
                    <SvgXml 
                        xml={israelMapSVGXML}
                        width={WINDOW_WIDTH}
                        height={WINDOW_HEIGHT}
                    >
                    </SvgXml>
                </View>

                <GlobalMapBuildingsOverlay />
                <GlobalMapUserOverlay />

            </ImageZoom>
            
            <MapOverlay>
                <View style={{
                    position: "absolute",
                    left: "3%",
                    bottom: "16%",
                }}>
                    <LoadingMessagesWidget/>
                </View>
                <View style={{
                    position:"absolute",
                    bottom:"17%",
                    right:"3%",
                }}>
                    <GlobalMapWarningButton
                        userGeoPosition={userGeoPosition}
                    />
                </View>
            </MapOverlay>

        </MapFlexLayout>
    )
}



export default BuildingsGlobalMap;