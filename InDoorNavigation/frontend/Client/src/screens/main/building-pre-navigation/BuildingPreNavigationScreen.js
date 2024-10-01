import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Alert, Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, selectActivePath } from "../../../app/active/active-slice";
import { selectMapsDims, selectMinFloor, selectNumberOfFloors } from "../../../app/map/map-slice";
// import BuildingMap from "../components/BuildingMap";
import LoadingModal from "../../../components/general/modals/loading";
import { clearNavigationRoute, fetchNavigationPath, resetNavigationStatus, resetPaths, selectNavigationDestinationPOI, selectNavigationError, selectNavigationPathDistance, selectNavigationPathTimeLength, selectNavigationRouteSVG, selectNavigationStatus, selectUserAccessibility, selectUserPosition, setDestinationPOI } from "../../../app/navigation/navigation-slice";
import Status from "../../../app/status";
import { useFocusEffect } from "@react-navigation/native";
import MapOverlay from "../../../layouts/map-overlay";
import FloorLevelSelector from "../../../components/features/floors/dropdown";
import NavigationRouteData from "../components/route-data/NavigationRouteData";
import BuildingMap from "../../../components/features/building/map";
import NavigationRouteSVG from "../components/navigation-route-svg/NavigationRouteSVG";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DestinationMarker from "../components/buttons/markers/destination-marker";
import PressMarker from "../components/buttons/markers/press-marker";


// ADD TIME TO ACCEPT IF IT NOT MOCK , SO HE GOT 3 SEC TO ACCEPT OR IT GO BACK. TODO
const BuildingPreNavigationScreen = (props) => {
    const mock = props.route.params.mock
    const dispatch = useDispatch();
    const building = useSelector(selectActiveBuilding);
    const minFloor = useSelector(selectMinFloor);
    const numFloors = useSelector(selectNumberOfFloors);
    const userPosition = useSelector(selectUserPosition);
    const accessibility = useSelector(selectUserAccessibility)
    const navigationError = useSelector(selectNavigationError);
    const navigationStatus = useSelector(selectNavigationStatus);
    const destinationPOI = useSelector(selectNavigationDestinationPOI);
    const mapDims = useSelector(selectMapsDims);
    const navigationRoute = useSelector(selectNavigationRouteSVG);
    const pathDistance = useSelector(selectNavigationPathDistance);
    const pathTimeLength = useSelector(selectNavigationPathTimeLength);


    const containerRef = useRef(null);

    const [floorIndex,setFloorIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [marker,setMarker] = useState(null);

    const [isRequestMock,setIsRequestMock] = useState(false);

    const floors = Array.from({length:numFloors}).map((_,index) => {
        return {
            label: `floor ${index + minFloor}`,
            value: index
        }
    })

    const target = destinationPOI?.center;
    const markerSize = 100;
    // const minScale = 1.3;
    const cropWidthScale = 0;
    const cropHeightScale = 0;


    const [lastMockUserPosition,setLastMockUserPosition] = useState(null);
    

    useEffect(() => {
        if(!mock && userPosition){
            setFloorIndex(userPosition.floor - minFloor)
        }
    },[userPosition])


    useEffect(() => {
        if(mock){
            setFloorIndex(destinationPOI.center.floor - minFloor)
        }
    },[])

    useFocusEffect(
        useCallback(() => {
            if(mock){
                setLoading(false);
                return;
            }
            handleNavigationRoute(userPosition);
    },[navigationStatus]))

    useEffect(() => {
        if(isRequestMock){
            setLastMockUserPosition(marker);
            handleNavigationRoute(marker);
            setIsRequestMock(false);
        }
    },[isRequestMock,navigationStatus]);

    useEffect(() => {
        const cleanup = () => {
            dispatch(setDestinationPOI(null));
            dispatch(clearNavigationRoute());
            dispatch(resetNavigationStatus())
        }
        return () => cleanup()
    },[])



    const onContinuePress = () => {
        const params = {
            mock:mock,
            userPosition:mock ? lastMockUserPosition : null,
            navigationRoute:navigationRoute
        }
        props.navigation.navigate('building-navigation',params);
    }

    const onCancelPress = () => {
        goBackToBuildingMap();
    }


    const onPathFindingError = () => {
        Alert.alert('Path Error', 'Could not find valid path with the current preferences', [
            {
              text: 'Ok',
              onPress: () => {
                    if(mock){
                        return;
                    }
                    return goBackToBuildingMap()
                },
              style: 'cancel',
            },
          ],{
            cancelable:false,

          });
    }
    

    const goBackToBuildingMap = () => {
        props.navigation.navigate('building-map');
        
    }
    
    const handleNavigationRoute = (sourcePosition) => {
        switch(navigationStatus){
            case Status.IDLE : {
                const buildingId = building.id;
                dispatch(fetchNavigationPath({
                    buildingId,
                    destinationPOI,
                    currentLocation:sourcePosition,
                    accessibility
                }))
            }
            case Status.PENDING: {
                setLoading(true);
                break;
            }
            case Status.FAILED: {
                setLoading(false);
                onPathFindingError()
                break;
            }
            case Status.SUCCEEDED: {
                setLoading(false);
                break;
                
            }
        }
    }



    const onPress = (location) => {
        const x = location.locationX;
        const y = location.locationY;
        const floor = floorIndex + minFloor;
        const markerPos = {x,y,floor}
        setMarker(markerPos);
    }

    const onRequestMockPress = () => {
        dispatch(resetNavigationStatus());
        setIsRequestMock(true);
    }


    

    return (
        <>
            {loading && (
                <LoadingModal visible={true}/>
            )}
            <View style={styles.container}>
                <BuildingMap
                    cropWidthScale={cropWidthScale}
                    cropHeightScale={cropHeightScale}
                    containerRef={containerRef}
                    currentFloorIndex={floorIndex}
                    imageProps={{
                        // centerOn:centerOnRef.current,
                        // onMove:onPanMove,
                        panToMove:true,
                        minScale:0.3,
                        maxScale:1,
                        enableCenterFocus:false,
                        onClick:mock ? onPress : null
                    }}
                    
                    fixedMapChildren={
                        <>
                            {!navigationError && !loading && (
                                <NavigationRouteSVG 
                                    currentFloorIndex={floorIndex} 
                                    route={navigationRoute}
                                />
                            )}
                            {mock && marker && (
                                <PressMarker
                                    floor={marker.floor}
                                    x={marker.x}
                                    y={marker.y}
                                    floorIndex={floorIndex}
                                    markerSize={markerSize}
                                />
                            )}
                            {mock && target &&  ( 
                                <DestinationMarker
                                    floor={target.floor}
                                    x={target.x}
                                    y={target.y}
                                    floorIndex={floorIndex}
                                    markerSize={markerSize}
                                />
                            )}              
                        </>
                    }
                />
     
                {!navigationError && !loading && (
                    <NavigationRouteData
                        isMock={mock}
                        marker={marker}
                        lastMockUserPosition = {lastMockUserPosition}
                        pathDistance={pathDistance}
                        pathTimeLength={pathTimeLength}
                        onRequestMockPress={onRequestMockPress}
                        onCancelPress={onCancelPress}
                        onContinuePress={onContinuePress}
                    />
                )}

                <MapOverlay>
                    <View style={{
                        position:"absolute",
                        bottom:"20%",
                        right:"2%",
                    }}>
                        <FloorLevelSelector
                            floors={floors}
                            onFloorChange={setFloorIndex}
                            selectedFloor={floorIndex}
                        />
                    </View>
                </MapOverlay>


            </View>
        </>

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