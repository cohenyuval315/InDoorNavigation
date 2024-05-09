import { StyleSheet, Text, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import GlobalMapSVG from "./GlobalMapSVG";
import GlobalMapBuildingsOverlay from "../buildings-overlay/GlobalMapBuildingsOverlay";
import SearchBarBottomSheet from "../search-bar-bottom-drawer/BuildingsGlobalMapBottomDrawer";
import { useEffect, useState } from "react";
import { getIsraelPointByGlobalCoordinates } from "../../../../static-maps/israel";
import GlobalMapUserOverlay from "../user-position-overlay/GlobalMapUserOverlay";
import { israelLocationMapSVG } from "../../../../static-maps/israel/IsraelSVGMap";
import GlobalMapButtonsOverlay from "../buttons-overlay/GlobalMapButtonsOverlay";
import GlobalMapLoadingOverlay from "../loading-messages/GlobalMapLoadingOverlay";
import GlobalMapModal from "../modals/GlobalMapModal";

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
    userMapCoordinates,
    onBuildingSearchItemPress,
    onBuildingMapPress,
    loadingMessages,
    directionsAvailable,
    onDirectionPress,
    noDirectionsMessage
}) => {

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
                    buildings={buildings}
                    height={height}
                    width={width}
                    onBuildingPress={onBuildingPress}
                    selectedBuilding={selectedBuilding}
                />
                <GlobalMapUserOverlay
                    userMapCoordinates={userMapCoordinates}
                />


            </ImageZoom>

            <GlobalMapModal 
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                <Text style={{
                    color:"black"
                }}>
                    {noDirectionsMessage}
                </Text>
                
            </GlobalMapModal>

            {!directionsAvailable && (
                <GlobalMapButtonsOverlay
                    openModal={() => setIsModalVisible(true)}
                />
            )}

            <GlobalMapLoadingOverlay
                loadingMessages={loadingMessages}
            />

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