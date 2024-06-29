import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Animated as NativeAnimated } from 'react-native';
import { sensors, setUpdateInterval } from '../../../sensors';
import { Svg, Circle, Path } from 'react-native-svg';
import { useAnimatedStyle,interpolate } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const timeInterval = 1000;

setUpdateInterval("accelerometer", timeInterval);

const calculateSpeed = (acceleration) => {
    const initialSpeed = 0;
    const timeIntervalInSec = timeInterval / 1000;
    const magnitude = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);
    const speed = initialSpeed + magnitude * timeIntervalInSec;
    
    return speed;
  };
  

const transformOrigin = (
    anchorPoint,
    originalCenterPoint,
    transforms,
  ) => {
    const result = [
      {translateX: anchorPoint.x - originalCenterPoint.x},
      {translateY: anchorPoint.y - originalCenterPoint.y},
      ...transforms,
      {translateX: -(anchorPoint.x - originalCenterPoint.x)},
      {translateY: -(anchorPoint.y - originalCenterPoint.y)},
    ];
    return result;
  };

const transformOriginWorklet = (
    anchorPoint ,
    originalCenterPoint,
    transforms,
  ) => {
    'worklet';
    const result = [
      {translateX: anchorPoint.x - originalCenterPoint.x},
      {translateY: anchorPoint.y - originalCenterPoint.y},
      ...transforms,
      {translateX: -(anchorPoint.x - originalCenterPoint.x)},
      {translateY: -(anchorPoint.y - originalCenterPoint.y)},
    ];
    return result;
  };

const RotatedComponentOnLayout = () => {
    const [componentDimensions, setComponentDimensions] = useState({
      width: 0,
      height: 0,
    });
  
    const targetAnchorPoint = {x: 0, y: 0};
    const originalAnchorPoint = {
      x: componentDimensions.width / 2,
      y: componentDimensions.height / 2,
    };
  
    return (
      <Text
        onLayout={event => {
          const {width, height} = event.nativeEvent.layout;
          setComponentDimensions({width: width, height: height});
        }}
        style={{
          padding: 12,
          backgroundColor: '#00FFFF',
          transform: transformOrigin(targetAnchorPoint, originalAnchorPoint, [
            {rotateZ: '-30deg'},
          ]),
        }}>
        Some Text
      </Text>
    );
  };


const ArrowHead = (props) => {
    return (
      <Svg width={10} height={10} x={-5} y={-5} style={props.style}>
        <Path
          d="M 5 0 L 10 5 L 0 5 Z"
          fill={props.fill}
          transform={`rotate(${props.rotate} ${5} ${5})`}
        />
      </Svg>
    );
  };

const SpeedMeter = () =>{
    const [speed, setSpeed] = useState(0);
    const maxSpeed = 100;
    const arrowRotation = useRef(new NativeAnimated.Value(0)).current;
    const subscriptionRef = useRef();
    const squareStyle = {

    }
    const squareSize = 30;
    // const animatedValue = useRef(new Animated.Value(0)).current;
    // const animatedStyleZ1 = useAnimatedStyle(() => {
    //     const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    //     return {
    //       transform: transformOriginWorklet(
    //         {x: squareSize, y: squareSize},
    //         {x: squareSize / 2.0, y: squareSize / 2.0},
    //         [{rotateZ: degree}],
    //       ),
    //     };
    //   });
    


    useEffect(() => {
        subscriptionRef.current = sensors["accelerometer"].subscribe(({ x, y, z, timestamp }) => {
            const acceleration = { x, y, z };
            const calculatedSpeed = calculateSpeed(acceleration).toFixed(0);            
            if(speed >= maxSpeed){
                setSpeed(0);          
            }else{
                setSpeed(calculatedSpeed);        
            }
        
        })
        return () => {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
        };
    }, []);

    useEffect(() => {
        NativeAnimated.timing(arrowRotation, {
          toValue: speed,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }, [speed]);

      const rotate = arrowRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
      });
      const targetAnchorPoint = {x: squareSize / 2, y: 0};
      const originalAnchorPoint = {x: squareSize / 2, y: squareSize / 2};
    return (
        <TouchableOpacity style={{
            position:"absolute",
            right:"3%",
            bottom:"15%"
        }}>
            <Svg width={80} height={80} style={{
                position:"relative",
                
            }}>
                <Circle cx={40} cy={40} r={40} fill="white" stroke="gray" strokeWidth={2} />
                <NativeAnimated.View style={[
                    {
                        position:"absolute",
                        
                        zIndex:90,
                        left:33.5,
                        top:40,
                        opacity:0.6,
                        
                    },
                    {
                        transform:transformOrigin(
                            targetAnchorPoint,
                            originalAnchorPoint,
                            [
                                {rotate:rotate}
                            ])
                    }
                ]}>
                    <FontAwesomeIcons name="long-arrow-down" color={"red"} size={squareSize}/>

                </NativeAnimated.View>
                <View style={{
                    justifyContent:"center",
                    alignItems:"center",
                    zIndex:100,
                    fontWeight:'bold',
                    color:"black",
                    height:"100%"
                }}>
                    <Text style={{
                        color:"black",
                        fontSize:20,
                        fontWeight:"bold"
                    }}>
                        {speed} 

                    </Text>
                    <Text style={{
                        color:"black",
                        fontWeight:"bold"
                    }}>
                            m/s
                    </Text>
                </View>
                {/* <Animated.View style={[squareStyle, animatedStyleZ1]} />                  */}
            </Svg>     
  
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white"
    },
    speedText: {
      fontSize: 24,
    },
  });
  
export default SpeedMeter;