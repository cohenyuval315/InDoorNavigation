import { Animated, View } from "react-native"


const MapOverlay = ({children,props,styles}) => {
    return (
        <Animated.View {...props} style={{
            position:"absolute",
            zIndex:10,
            width:"100%",
            height:"100%",
            pointerEvents:"box-none",
            ...styles
        }}>
            {children}
        </Animated.View>
    )
}

export default MapOverlay