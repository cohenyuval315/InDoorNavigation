import { useState } from "react";
import { View } from "react-native";

const MapFloorLayout = ({initialOpacity=1,children}) => {
    const [opacity,setOpacity] = useState(initialOpacity);
    return (
        <View style={{
            position:"absolute",
            height:"100%",
            width:"100%",
            opacity:opacity
        }}>
            {children}
        </View>
    )

}
export default  MapFloorLayout;