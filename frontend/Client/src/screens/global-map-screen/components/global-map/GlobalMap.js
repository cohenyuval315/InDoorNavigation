import { StyleSheet, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import GlobalMapSVG from "./GlobalMapSVG";
import GlobalMapBuildingsOverlay from "./GlobalMapBuildingsOverlay";
import SearchBarBottomSheet from "../search-bar/SearchBarBottomSheet";
import { useEffect, useState } from "react";
import { getIsraelPointByGlobalCoordinates } from "../../../../static-maps/israel";
import GlobalMapUserOverlay from "./GlobalMapUserOverlay";
import { israelLocationMapSVG } from "../../../../static-maps/israel/IsraelSVGMap";
import GlobalMapButtonsOverlay from "./GlobalMapButtonsOverlay";
import GlobalMapLoadingOverlay from "./GlobalMapLoadingOverlay";
import GlobalMapModal from "./GlobalMapModal";

const GlobalMap = ({
    buildings,
    imageZoomRef,
    bottomSheetRef,
    height,
    width,
    selectedBuilding,
    onBuildingDeSelect,
    onBuildingSelect,
    onBuildingPress,
    onBuildingSearchItemPress,
    onBuildingMapPress}) => {

    const [isModalVisible,setIsModalVisible] = useState(false);
    const [centerOn,setCenterOn] = useState(null);
    useEffect(()=>{
        if(selectedBuilding!==null){
            const buildingCoordinates = getIsraelPointByGlobalCoordinates(
                selectedBuilding.globalCoordinates,width,height)
            const centerX = width/2
            const CenterY = height/2
            const buildingCenterOn = {
                x: Math.abs(centerX - buildingCoordinates.x) / 2,
                y: Math.abs(CenterY - buildingCoordinates.y) / 2,
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
    },[selectedBuilding])

    const directionsAvailable = false;
    const noDirectionsMessage = "No GPS Reception";
    const onDirectionPress = (building) => {

    }

    const offsetFunction = (globalCoordinates) => getIsraelPointByGlobalCoordinates(globalCoordinates,width,height);
    const buildingsWithCoordinates = buildings.map((building)=>{
        return {
            ...building,
            mapCoordinates:offsetFunction(building.globalCoordinates)
        }
    });
    return (
        <View style={styles.container}>
            <ImageZoom ref={imageZoomRef} style={styles.mapContainer}
                cropWidth={width}
                cropHeight={height}
                imageWidth={width}
                imageHeight={height}
                panToMove={selectedBuilding===null}
                enableDoubleClickZoom={selectedBuilding===null}
                pinchToZoom={selectedBuilding===null}
                centerOn={centerOn}
            >
                <GlobalMapSVG xml={
                    israelLocationMapSVG.xml
                }/>
                <GlobalMapBuildingsOverlay
                    buildings={buildingsWithCoordinates}
                    height={height}
                    width={width}
                    onBuildingPress={onBuildingPress}
                    selectedBuilding={selectedBuilding}
                />
                <GlobalMapUserOverlay
                    offsetFunction={offsetFunction}
                />
                <GlobalMapButtonsOverlay
                    openModal={() => setIsModalVisible(true)}
                />
                <GlobalMapLoadingOverlay
                loadingMessages={["restart gps","connecting to websocket"]}
                />
                <GlobalMapModal 
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                />
            </ImageZoom>
            <SearchBarBottomSheet 
                bottomSheetRef={bottomSheetRef}
                onBuildingSearchItemPress={onBuildingSearchItemPress}
                selectedBuilding={selectedBuilding}
                isLock={selectedBuilding!==null}
                onBuildingDeSelect={onBuildingDeSelect}
                directionsAvailable={directionsAvailable}
                onDirectionPress={onDirectionPress}
                onBuildingMapPress={onBuildingMapPress}
                noDirectionsMessage={noDirectionsMessage}
            />          

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    mapContainer:{
        backgroundColor:"black",
        flex:1,
    }
})

export default GlobalMap;