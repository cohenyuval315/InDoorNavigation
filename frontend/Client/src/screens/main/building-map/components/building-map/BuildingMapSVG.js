
import { memo } from "react";
import { Dimensions, View } from "react-native";
import { SvgXml } from "react-native-svg";



const BuildingMapSVG = memo(({
    data,
    styles = {},
}) => {
    const mapSvgData = data.file;
    const mapFloor = data.floor;
    const mapHeight = data.height;
    const mapWidth = data.width;
    console.log(`rrerender ${mapFloor}`);
    const viewBox =`0 0 ${mapWidth} ${mapHeight}`
    return (
        <View style={{ 
                position: 'absolute',
                ...styles
            }}>
            <SvgXml 
                xml={mapSvgData} 
                // width={width} 
                // height={height} 
                viewBox={viewBox}
                // width?: NumberProp;
                // height?: NumberProp;
                // viewBox?: string;
                // preserveAspectRatio?: string;
                // color?: ColorValue;
                // title?: string;
            />
        </View>
    )
});

export default BuildingMapSVG;