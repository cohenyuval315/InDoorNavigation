import { Animated } from "react-native"

const UserMapAvatar = ({size}) => {
    return (
        <Animated.View style={{
            width:size,
            height:size,
            backgroundColor:"blue",
            borderRadius:30,
            justifyContent:"center",
            alignItems:'center',
            borderColor:"lightgray",
            borderWidth:1,
            pointerEvents:"none",
        }}>

        </Animated.View>
    )
}

export default UserMapAvatar