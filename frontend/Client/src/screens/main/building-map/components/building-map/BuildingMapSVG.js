
import { memo } from "react";
import { Dimensions, View } from "react-native";
import { SvgXml } from "react-native-svg";



const BuildingMapSVG = memo(({
    data,
    width,
    height
}) => {
    const mapSvgData = data.file;
    const mapFloor = data.floor;
    const mapHeight = data.height;
    const mapWidth = data.width;
    console.log(`rerender ${mapFloor}`);
    return (
        <View style={{ 
                position: 'absolute',
            }}>
            <SvgXml 
                xml={mapSvgData} 
                width={width} 
                height={height} 
            />
        </View>
    )
});

export default BuildingMapSVG;