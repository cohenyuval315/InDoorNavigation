import { SvgXml } from "react-native-svg";
import MapOverlay from "../../../../layouts/map-overlay";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { selectMapsDims } from "../../../../app/map/map-slice";

const NavigationRouteSVG = ({currentFloorIndex,route}) => {
    // const route =  useSelector(selectNavigationRouteSVG);
    if (!route){
        return null;
    }    
    const mapsDims = useSelector(selectMapsDims);
    const width = mapsDims.width;
    const height = mapsDims.height;

    return (
        <MapOverlay>
            {route && route.map((routeFloorMap,index) => {
                return (
                    <Animated.View key={`path-svg-${index}`}
                        style={{
                            zIndex: currentFloorIndex === index ? 1 : 0,
                            display:currentFloorIndex === index ? "flex" : "none",
                        }}
                    > 
                        <SvgXml
                            xml={routeFloorMap.path || routeFloorMap.floorRouteSVG}
                            viewBox={`0 0 ${width} ${height}`}
                        />
                    </Animated.View>
                )
            })}
        </MapOverlay>
    )
}

export default NavigationRouteSVG;