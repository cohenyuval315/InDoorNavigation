
import { memo } from "react";
import { Dimensions, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";



const BuildingMapSVG = memo(({
    data,
    height,
    width,
    styles = {},
}) => {
    const mapSvgData = data.map;
    const viewBox =`0 0 ${width} ${height}`
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