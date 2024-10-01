import { useRef } from "react";
import { Animated, View } from "react-native";
import { SvgXml } from "react-native-svg";

const BuildingMapUserOverlay = () => {
    const rotation = useRef(new Animated.Value(0)).current; 
    return (
        <Animated.View style={{ 
            position: "absolute", 
            left: 0,
            top: 0,
            transform: [{ rotate: rotation.interpolate({ inputRange: [0, 360], outputRange: ["0deg", "360deg"] }) }] }}>
            {/* <SvgXml xml={userSvgData} width={24} height={24} /> */}
        </Animated.View>  

    )
}

export default BuildingMapUserOverlay;