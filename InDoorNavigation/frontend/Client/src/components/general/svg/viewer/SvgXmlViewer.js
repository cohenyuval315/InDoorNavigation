
import { memo } from "react";
import { Dimensions, View } from "react-native";
import { SvgXml } from "react-native-svg";

const SvgXmlViewer = memo(({
    width,
    height,
    data,
    styles = {},
}) => {
    const viewBox =`0 0 ${width} ${height}`
    return (
        <View style={{ 
                position: 'absolute',
                ...styles
            }}>
            <SvgXml 
                xml={data} 
                viewBox={viewBox}
            />
        </View>
    )
});

export default SvgXmlViewer;