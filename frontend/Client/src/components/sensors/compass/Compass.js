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
import {sensors,setUpdateInterval} from '../../../services/sensors'
setUpdateInterval("magnetometer", 1000);

const Compass = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const subscriptionRef = useRef();

  useEffect(() => {
    subscriptionRef.current = sensors["magnetometer"].subscribe(({ x, y, z, timestamp }) => {
        const angle = Math.atan2(y, x) * 180 / Math.PI;
      Animated.timing(rotation, {
        toValue: angle,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();        
    });    

    return () => {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
    };
  }, []);
  return (
    <TouchableOpacity style={{
        position:"absolute",
        right:0,
        bottom:"80%",
        zIndex:20,
    }}>
      <Animated.View style={[
        { transform: [{ rotate: rotation.interpolate({ inputRange: [-180, 180], outputRange: ['-180deg', '180deg'] }) }] }
      ]}>
        <Image source={require('./../../assets/compass.png')} style={{
            backgroundColor:"white",
            width:100,
            height:100,
            borderRadius:59,
        }} />
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {

    },

    image: {
      flex: 1,
      resizeMode: 'contain',
    },
    indicatorContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    indicator: {
      position: 'absolute',
      top: '50%',
      left: '46%',
      width: 0,
      height: 0,
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderBottomWidth: 12,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'red',
      transform: [{ translateY: -12 }, { translateX: -4 }],
    },
  });
export default Compass;