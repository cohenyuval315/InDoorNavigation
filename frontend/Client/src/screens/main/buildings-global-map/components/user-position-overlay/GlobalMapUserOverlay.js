import React,{ useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import PulsingCircle from "./PulsingCircle";
import UserMapAvatar from "./UserMapAvatar";
import useGPS from "../../../../../hooks/useGPS";
import {getRelativeCoordsByIsrael  } from "../../../../../static-maps/israel";
import useLoadingMessages from "../../../../../hooks/useLoadingMessages";


// const UserMapAvatar = () => {
//     return (
//         <Animated.View style={{
//             width:10,
//             height:10,
//             backgroundColor:"blue",
//             borderRadius:30,
//             justifyContent:"center",
//             alignItems:'center',
//             borderColor:"lightgray",
//             borderWidth:1,
//         }}>

//         </Animated.View>
//     )
// }

// const PulsingCircle = ({  }) => {
//     const scale = useRef(new Animated.Value(1)).current;
//     const opacity = useRef(new Animated.Value(1)).current;
//     const maxScale = 2;
//     const duration = 3000;
//     const minOpacity = 0;
//     const maxOpacity = 0.8;
//     const minScale = 0;
//     const radius = 50;
//     const borderRadius = 50;
//     const color = "#0080ff";
    
  
//     useEffect(() => {
//       function animateRing() {
//         const pulse = Animated.parallel([
//           Animated.timing(scale, {
//             toValue: maxScale,
//             duration: duration,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacity, {
//             toValue: minOpacity,
//             duration: duration,
//             useNativeDriver: true,
//           }),
//         ]).start(() => {
//             opacity.setValue(maxOpacity);
//             scale.setValue(minScale);
//             animateRing(); 
//         });
//       }
//       animateRing(); // Start the first pulse
//     }, []);
  
//     return (
//       <Animated.View
//         style={{
//             position:"absolute",
//             width: radius,
//             height: radius,
//             backgroundColor: color,
//             borderRadius: borderRadius,
//             opacity:opacity,
//             transform: [{ scale:scale }],
//         }}
//       />
//     );
//   };
  

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const GlobalMapUserOverlay = () => {
    const {subscribeGPS,unsubscribeGPS} = useGPS();
    const {addLoadingMessage} = useLoadingMessages();
    const userMapCoordinates = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [isInitialPositionSet, setIsInitialPositionSet] = useState(false);
    const startMessageCallbackRef = useRef(null);
    const retryMessageCallbackRef = useRef(null);


    const onPosition = (position) => {
        if (!position){
            return;
        }
        const { latitude, longitude } = position.coords;
        const newCoordinates = getRelativeCoordsByIsrael({ latitude, longitude });        
        if (retryMessageCallbackRef.current){
            retryMessageCallbackRef.current()
        }
        if (startMessageCallbackRef.current){
            startMessageCallbackRef.current()
        }
        if (!isInitialPositionSet) {
            userMapCoordinates.setValue(newCoordinates);
            setIsInitialPositionSet(true);
          } else {
            Animated.timing(userMapCoordinates, {
              toValue: newCoordinates,
              duration: 500, // Adjust duration as needed
              easing: Easing.out(Easing.quad),
              useNativeDriver: false, // Animated.ValueXY doesn't support native driver
            }).start();
          }

    }

    const onPositionError = (error) => {
        console.log(error);
        if (startMessageCallbackRef.current){
            startMessageCallbackRef.current()
        }        
        if (retryMessageCallbackRef.current == null){
            retryMessageCallbackRef.current = addLoadingMessage("retrying user geo position")
        }
        
    }
    
    useEffect(() => {
        startMessageCallbackRef.current = addLoadingMessage("loading user geo positon");
        subscribeGPS(onPosition,onPositionError);
        return () => unsubscribeGPS();
    },[]) 

    if (!isInitialPositionSet) {
        return null;
    }


    return (
        <Animated.View style={{
            position: "absolute",
            zIndex: 22,
            top: userMapCoordinates.y.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
            }),
            left: userMapCoordinates.x.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
            }),            
            justifyContent: "center",
            alignItems: "center",
        }}>
            <PulsingCircle/>
            <UserMapAvatar />
        </Animated.View>
    )
}

export default GlobalMapUserOverlay;