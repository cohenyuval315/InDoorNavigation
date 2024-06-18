import { SvgXml } from "react-native-svg";
import MapOverlay from "../../../../../layouts/map-overlay";
import { Animated } from "react-native";

const NavigationPathsSVGs = ({currentFloorIndex,pathsSVGs}) => {
    if (!pathsSVGs){
        return null;
    }
    return (
        <MapOverlay>
            {pathsSVGs.map((pathSVG,index) => {
                return (
                    <Animated.View key={`path-svg-${index}`}
                        style={{
                            zIndex: currentFloorIndex === index ? 1 : 0,
                            display:currentFloorIndex === index ? "flex" : "none",
                        }}
                    > 
                        <SvgXml
                            xml={pathSVG.path}
                        />
                    </Animated.View>
                )
            })}
        </MapOverlay>
    )
}

export default NavigationPathsSVGs;