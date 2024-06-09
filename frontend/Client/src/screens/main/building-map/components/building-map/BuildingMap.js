import { Animated, Dimensions, Text, TouchableOpacity, View } from "react-native";
import ImageZoom from "../../../../components/general/map/image-zoom";
import BuildingMapSVG from "./BuildingMapSVG";
import BuildingMapPOIsOverlay from "./BuildingMapPOIsOverlay";
import BuildingMapUserOverlay from "./BuildingMapUserOverlay";
import MapModal from "../../../../components/map/modals/MapModal";
import { useRef, useState } from "react";
import SearchBarBottomSheet from "../../../../components/map/search-bar/SearchBarBottomSheet";
import BuildingMapButtonsOverlay from "./BuildingMapButtonsOverlay";
import BuildingMapLoadingOverlay from "./BuildingMapLoadingOverlay";
import BuildingMapPathBuilder from "../path-builder/BuildingMapPathBuilder";


const BuildingMap = ({
    mapSvgData,
    POIs,
    mapHeight,
    mapWidth,
    windowHeight,
    windowWidth,
    onPressB2
}) => {
    const [floorIndex,setFloorIndex] = useState(0);
    const onPressB1 = () => {
        if(floorIndex === 0){
            setFloorIndex(1);
        }else{
            setFloorIndex(0);
        }
        
    }    
    const rotation = useRef(new Animated.Value(0)); 
    const setNewRotation = () => {
        const newRotationValue = rotation.current._value + 90;
        const boundedRotationValue = newRotationValue % 360;

        // Update the rotation value with the new angle
        Animated.timing(rotation.current, {
            toValue: boundedRotationValue,
            duration: 300, // Adjust duration as needed
            useNativeDriver: true, // Enable native driver for better performance
        }).start(({finished})=>{
            if (finished) {
                // Reset rotation value back to 0 after each animation completes
                rotation.current.setValue(newRotationValue % 360);
                // Update the image width and height
                // setImageWidth(rotatedWidth);
                // setImageHeight(rotatedHeight);
            }
        });
    };   
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [currentModal,setCurrentModal] = useState(null);

    const [selectedPOI,setSelectedPOI] = useState(null);
    const bottomSheetRef = useRef();

    const closeModal = () => {
        setCurrentModal(null);
        setIsModalVisible(false);
    }

    const renderModal = (currentModal) => {
        switch(currentModal){
            case "errors":{
                return (
                    <View>

                    </View>
                )
            }
            case "navigation_builder":{
                return (
                    <BuildingMapPathBuilder/>
                )
            }            
        }
    }

    console.log("width and height:",mapWidth,mapHeight,windowWidth,windowHeight)
    const POIOffsetFunction = (mapCoordinates) => {
        return {
            floor:mapCoordinates.floor,
            x:  mapCoordinates.x,
            y:  mapCoordinates.y 
        }
    }
    const handleOnPressB2 = () => {
        // setNewRotation()
        openModal("navigation_builder")
        
    }
    const searchBarProps = {
        bottomSheetRef:bottomSheetRef,
        selectedItem:selectedPOI,
        ItemComponent:() => {},
        isLock:selectedPOI !== null,
        items:POIs,
        SearchScreen:() => {},
        snapPoints: ["12%","50%"]
    }

    const openModal = (modalName) => {
        setCurrentModal(modalName)
        setIsModalVisible(true);
    }   
    
    return (
        <View style={{
            flex:1,


        }}>
            <Animated.View
                    style={[
                    {
                        flex:1,
                        

                    },
                    { 
                        
                    },
                    ]}
                >
                    <ImageZoom style={{
                        flex:1,
                        justifyContent:"center",
                        alignItems:"center",
                    }}
                        cropWidth={windowWidth}
                        cropHeight={windowHeight}
                        imageWidth={windowWidth}
                        imageHeight={windowHeight}
                        useNativeDriver
    
                        panToMove
                    >
                        <Animated.View style={{
                            flex:1,
                            backgroundColor:"red",
                            transform: [{ rotate: rotation.current.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
                        }}>
                            <BuildingMapSVG
                                data={mapSvgData}
                                width={windowWidth}
                                height={windowHeight}
                                mapHeight={mapHeight}
                                mapWidth={mapWidth}
                            />
                            <BuildingMapPOIsOverlay
                                floorIndex={floorIndex}
                                POIs={POIs}
                                width={windowWidth}
                                height={windowHeight}
                                rotationRef={rotation}
                            />
                            <BuildingMapUserOverlay/>     

                        </Animated.View>
                        <MapModal onClose={closeModal} visible={isModalVisible}>
                            {renderModal(currentModal)}
                        </MapModal>
                    </ImageZoom>
            </Animated.View>
            <BuildingMapLoadingOverlay loadingMessages={["hey"]}/>
            <BuildingMapButtonsOverlay
                            onPressB1={onPressB1}
                            onPressB2={handleOnPressB2}
                        />            
            <SearchBarBottomSheet {...searchBarProps}/>
        </View>
    )
}
export default BuildingMap;