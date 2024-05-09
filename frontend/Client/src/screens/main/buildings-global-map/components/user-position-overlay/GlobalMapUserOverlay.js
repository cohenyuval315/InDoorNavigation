import React,{ useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import PulsingCircle from "./PulsingCircle";
import UserMapAvatar from "./UserMapAvatar";
import useGPS from "../../../../../hooks/useGPS";
import { getIsraelPointByGlobalCoordinates } from "../../../../../static-maps/israel";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { WINDOW_HEIGHT } from "../../../../../utils/scaling";


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
    const {
      data,
      isGPSAvailable,
      geoCoordinates,
      isLocationServicesEnabled,
      loadingLocationServicesStatus,
      onIntervalChange,
      onFailureIntervalChange,
      interval,
      failureInterval,
      HaltGPS,
      ContinueGPS,
      errorMessage,
      resetErrorMessage  
      
    } = useGPS(1000,30000);
    const [userMapCoordinates,setUserMapCoordinates] = useState(null);
    const offsetFunction = (globalCoordinates) => getIsraelPointByGlobalCoordinates(globalCoordinates,WINDOW_WIDTH,WINDOW_HEIGHT);

    useEffect(() => {
      geoCoordinates && setUserMapCoordinates(offsetFunction(geoCoordinates));
    }, [geoCoordinates])


    if (
        !isGPSAvailable || 
        !isLocationServicesEnabled || 
        loadingLocationServicesStatus || 
        !userMapCoordinates
      ){
      return null;
    }

    return (
        <Animated.View style={{
            position:"absolute",
            zIndex:22,
            left:userMapCoordinates.x,
            bottom:userMapCoordinates.y,
            justifyContent:"center",
            alignItems:'center',
        }}>
            <PulsingCircle/>
            <UserMapAvatar />
        </Animated.View>
    )
}

export default GlobalMapUserOverlay;