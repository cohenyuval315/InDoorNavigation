import { Animated, Easing } from "react-native";
import { useEffect, useRef, useState } from "react";

const PulsingCircle = ({  }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const maxScale = 2;
    const duration = 3000;
    const minOpacity = 0;
    const maxOpacity = 0.8;
    const minScale = 0;
    const radius = 50;
    const borderRadius = 50;
    const color = "#0080ff";
    
  
    useEffect(() => {
      function animateRing() {
        const pulse = Animated.parallel([
          Animated.timing(scale, {
            toValue: maxScale,
            duration: duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: minOpacity,
            duration: duration,
            useNativeDriver: true,
          }),
        ]).start(() => {
            opacity.setValue(maxOpacity);
            scale.setValue(minScale);
            animateRing(); 
        });
      }
      animateRing(); // Start the first pulse
    }, []);
  
    return (
      <Animated.View
        style={{
            position:"absolute",
            pointerEvents:"none",
            width: radius,
            height: radius,
            backgroundColor: color,
            borderRadius: borderRadius,
            opacity:opacity,
            transform: [{ scale:scale }],
        }}
      />
    );
  };
  

  export default PulsingCircle;