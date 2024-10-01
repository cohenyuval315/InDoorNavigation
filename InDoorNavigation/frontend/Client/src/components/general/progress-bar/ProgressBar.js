import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native';

// Define styles
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5
  }
});


const ProgressBar = ({
  progress: targetProgress = 0,
  initialProgress = 0,
  style = {},
  fillStyle = {}
}) => {
  const [progress] = useState(new Animated.Value(initialProgress));
  const easingDuration = 500;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: targetProgress,
      duration: easingDuration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }).start();
  }, [targetProgress]);

  
  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], 
  });

  return (
    <View style={[styles.background, style]}>
      <Animated.View style={[styles.fill, fillStyle, { width: fillWidth }]} />
    </View>
  );
};

export default ProgressBar;
