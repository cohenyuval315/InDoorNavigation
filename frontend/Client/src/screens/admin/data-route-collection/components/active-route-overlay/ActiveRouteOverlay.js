import { Text, View } from "react-native";
import MapOverlay from "../../../../../layouts/map-overlay";

const ActiveRouteOverlay = ({route}) => {
    const length = route.length;
    let start = "s";
    let target = "t";
    if (length == 0){
        start = "st";
        target = "st";
    }
    return (
        <MapOverlay >
            {route.map((waypoint,index) => {
                let title = index;
                if (index == 0) {
                    title = start;
                }
                if (index == length) {
                    title = target;
                }                

                if(index < length){
                    const nextWaypoint = route[index + 1];
                }
                return (
                    <View key={`route_${waypoint.details.title}_${index}`} style={{
                        position: "absolute",
                        top:100,
                        left:100,
                        borderRadius:30,

                    }}>
                        <View style={{
                            backgroundColor:"black"
                        }}>
                            <Text style={{
                                
                            }}>
                                {index}
                            </Text>
                        </View>
                    </View>
                )

            })}
        </MapOverlay>
    )
}
export default ActiveRouteOverlay;