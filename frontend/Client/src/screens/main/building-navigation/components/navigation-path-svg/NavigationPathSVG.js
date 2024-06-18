import { SvgXml } from "react-native-svg";
import MapOverlay from "../../../../../layouts/map-overlay";
import { Animated } from "react-native";

const NavigationPathSVG = ({pathSVG}) => {
    if(!pathSVG){
        return null;
    }
    return (
        <MapOverlay>
                <Animated.View> 
                    <SvgXml
                        xml={pathSVG.path}
                    />
                </Animated.View>
        </MapOverlay>
    )
}

export default NavigationPathSVG;