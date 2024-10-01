import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const [timePassed, setTimePassed] = useState(false);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="green" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
    
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    // color:"black"
  },
});

export default LoadingScreen;