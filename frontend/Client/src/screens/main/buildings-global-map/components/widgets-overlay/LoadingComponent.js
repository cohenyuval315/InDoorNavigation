import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

const LoadingComponent = ({ messages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through messages
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
      // Animate fade in and out
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} activeOpacity={1} >
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.messageText}>{messages[currentIndex]}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  touchable: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    pointerEvents:"none"
  },
  messageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  messageText: {
    color: 'white',
  },
});

export default LoadingComponent;
