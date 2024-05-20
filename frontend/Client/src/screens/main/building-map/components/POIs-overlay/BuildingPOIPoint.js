import { useEffect, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BuildingPOIPoint = ({POI,rotationRef,onPOIPress}) => {
    const iconName = POI.details.icon;
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

    const rotate = animatedRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });    
    
    
    return (
        <Animated.View style={{
            position:"absolute",
            left:iconPositionX,
            bottom: iconPositionY,             
            transform: [{ rotate }],
            // backgroundColor:"red",
        }}>
            <TouchableOpacity style={{
            }} onPress={onPOIPress}>
                <Text style={{
                    backgroundColor:"black",
                    borderRadius:30,
                }}>
                    <MaterialCommunityIcons name={iconName}  size={iconSize} color={"white"} />
                </Text>
            </TouchableOpacity> 
      </Animated.View>                 
    )
  }
  export default BuildingPOIPoint;