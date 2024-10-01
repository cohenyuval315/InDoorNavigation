import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectMap, selectMapPOIs, selectMapsDims, selectMinFloor, selectNumberOfFloors, selectPOIsMaps } from "../../../../app/map/map-slice";
import ImageZoom from "../../../general/image-zoom";
import SvgXmlViewer from "../../../general/svg/viewer";
import MapOverlay from "../../../../layouts/map-overlay";
import { selectActivePOI, setActivePOI } from "../../../../app/active/active-slice";
import BuildingPOIMarker from "../../poi/marker";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../utils/scaling/scaling";

const BuildingMap = ({
    
    containerRef,
    currentFloorIndex,
    onPOIPress,
    cropWidthScale = 0.5,
    cropHeightScale = 0.5,
    floorChildren,
    fixedFloorChildren,
    mapChildren,
    fixedMapChildren,
    imageProps={},

}) => {
    const dispatch = useDispatch();
    const maps = useSelector(selectMap);
    const numberOfFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);
    const mapDims = useSelector(selectMapsDims);

    const poisData = useSelector(selectPOIsMaps)
    const POIs = useSelector(selectMapPOIs)
    const selectedPOI = useSelector(selectActivePOI);

    const handleOnPOIPress = (POI) => {
        onPOIPress && onPOIPress(POI);
        dispatch(setActivePOI(POI))
    }   
    
    const degreeRotation = { inputRange: [0, 360], outputRange: ['0deg', '360deg'] }
    
    
    
    return (
        <ImageZoom style={styles.container}
            ref={containerRef}
            cropWidth={WINDOW_WIDTH * cropWidthScale}
            cropHeight={WINDOW_HEIGHT * cropHeightScale}
            imageWidth={mapDims.width}
            imageHeight={mapDims.height}
            // minScale={minScale}
            // centerOn={centerOn}
            useHardwareTextureAndroid
            // // useNativeDriver
            enableCenterFocus={false}
            // onMove={onPanMove} 
            {...imageProps}             

                 
        >   
            <Animated.View style={{
                flex:1,
                // transform: [{ rotate: rotationRef.current.interpolate(degreeRotation)}],
            }}>
                {Array.from({ length: numberOfFloors }, (_, index) => {
                    const mapFloor = maps[index]
                    const mapPOIs = poisData[index]
                    const floorPOIs = POIs.filter((POI) => POI.floor - minFloor === index);
                    return (
                        <Animated.View 
                            key={`map_svg_${index}`} 
                            style={[{
                                zIndex: currentFloorIndex === index ? 1 : 0,
                                display:currentFloorIndex === index ? "flex" : "none",
                            },styles.floorMapContainer]} 
                            >

                                <Animated.View style={{
                                    flex:1,
                                    // transform: [{ rotate: rotationRef.current.interpolate(degreeRotation)}],
                                }}>
                                    <SvgXmlViewer
                                        width={mapDims.width}
                                        height={mapDims.height}
                                        data={mapFloor.map}
                                        styles={{

                                        }}
                                    />

                                    <MapOverlay styles={{
                                    }}>
                                            {floorPOIs.map((POI,index) => {
                                                return (
                                                    <BuildingPOIMarker 
                                                        key={`POI_${POI.id}_${index}`} 
                                                        POI={POI}
                                                        onPOIPress={()=>handleOnPOIPress(POI)}
                 
                                                        isSelected={selectedPOI && selectedPOI.id === POI.id}
                                                    />                        
                                                )
                                            })} 
                                    </MapOverlay>

                                    <MapOverlay styles={{
                                        pointerEvents:'none'
                                    }}>    
                                        <SvgXmlViewer
                                            width={mapDims.width}
                                            height={mapDims.height}
                                            data={mapPOIs.map}
                                            styles={{

                                            }}                                    
                                        />
                                    </MapOverlay>

                                    {floorChildren}

                                </Animated.View>

                                {fixedFloorChildren}

                            
                        </Animated.View>
                    )
                })}    

                {mapChildren}
            </Animated.View>

            {fixedMapChildren}
        </ImageZoom>                        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        zIndex:0,
    },
    floorMapContainer:{
        position:"absolute",
        height:"100%",
        width:"100%",
    }
})

export default BuildingMap;