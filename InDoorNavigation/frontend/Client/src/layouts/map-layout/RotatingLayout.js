import { Animated } from "react-native"

const RotatingLayout = ({rotationRef,children}) => {
    return (
        <Animated.View style={{
            flex:1,
            transform: [{ rotate: rotationRef.current.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
        }}>
            {children}
        </Animated.View>
    )
}
export default RotatingLayout