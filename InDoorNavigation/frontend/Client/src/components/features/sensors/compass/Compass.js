import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import SensorsService, { SensorKey } from '../../../../services/SensorsService';


const Compass = ({rotation,onPress}) => {
  const arrowRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.timing(arrowRotation, {
        toValue: rotation,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();        
      
    return () => {
    };
  }, [rotation]);

  const rot = arrowRotation.interpolate(
    { 
      inputRange: [-180, 180], 
      outputRange: ['-180deg', '180deg'] 
    }
  )
  const fetch = async () => {
    const magnetometer = await SensorsService.getInstance().sensor(SensorKey.MAGNETOMETER)
    const unsubscribe = magnetometer.subscribe({
      next:() => {},
      complete:() => {},
      error:() => {},
    })
    return unsubscribe;
  }
 
  useEffect(() => {
    
    return () => {

    }
  },[])

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Animated.View style={[
        { 
          transform: [
            { 
              rotate: rot
            }
          ],
          backgroundColor:"white",
          borderRadius:30,
        },
        
      ]}>
      <View style={styles.indicatorContainer}>
        <Image source={require('../../../../assets/compass.png')} style={{
            backgroundColor:"transparent",
            width:50,
            height:50,
        }} />
        
          <View style={styles.indicator} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
      // flex:1,
      // justifyContent:"center",
      // alignItems:"center",
    },

    image: {
      flex: 1,
      resizeMode: 'contain',
    },

    indicatorContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',

    },
    indicator: {
      width: 0,
      height: 0,

      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderBottomWidth: 12,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',

      borderBottomColor: 'red',
      position: 'absolute',
      top: '50%',
      left: '50%',

      transform: [
        { translateX: -4 },
        { translateY: -(12/4)*3 }, 
      ],
    },
  });
export default Compass;