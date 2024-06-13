import { useEffect, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BuildingPOIIcon = ({POI,rotationRef,onPOIPress}) => {
    let iconName = "close-circle-outline" 

    // iconName = POI.details.icon;
    
    const iconSize = 20; 
    const centerX = POI.center.x;
    const centerY = POI.center.y;
    const iconPositionX = centerX - iconSize / 2; 
    const iconPositionY = centerY - iconSize / 2;   

    let rotationValue = 0;

    if (rotationRef && rotationRef.current){
        rotationValue = rotationRef.current._value
    }
    
    const [animatedRotation] = useState(new Animated.Value(rotationValue));

    const rotate = animatedRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });    



    useEffect(() => {
        if (rotationRef && rotationRef.current){
            const subscription = rotationRef.current.addListener((value) => {
                Animated.timing(animatedRotation, {
                toValue: -value.value,
                duration: 100, // Adjust duration as needed
                easing: Easing.linear,
                useNativeDriver: true,
                }).start();
                
            });
            return () => rotationRef.current.removeListener(subscription);
        }

    }, [rotationRef]); 


    return (

        <Animated.View style={{
            position:"absolute",
            // zIndex:999,
            left:iconPositionX,
            top: iconPositionY,             
            transform: [{ rotate }],
        }}>
            <TouchableOpacity style={{
                height:"100%",
                width:"100%",
            }} onPress={onPOIPress}>
                <Text style={{
                    backgroundColor:"white",
                    borderRadius:30,
                }}>
                    <MaterialCommunityIcons name={iconName}  size={iconSize} color={"black"} />
                </Text>
            </TouchableOpacity> 
      </Animated.View>                 
    )
  }
  export default BuildingPOIIcon;