import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.321;
const BOTTOM_LAT = 29.440;
const LATITUDE_DELTA = LATITUDE - BOTTOM_LAT;
const LONGITUDE = 35.914;
const LONGITUDE_LEFT = 34.189;
const LONGITUDE_DELTA = LONGITUDE - LONGITUDE_LEFT;

const EmptyScreen = () => {
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      
      >
        <UrlTile
          urlTemplate="https://conze.pt/app/climate-data/data/meantemp/6/maptiles/{z}/{x}/{-y}.png"
          maximumZ={19}
          flipY={false}
          
        />
      </MapView>
      {/* <View style={styles.buttonContainer}>
        <View style={styles.bubble}>
          <Text>Custom Tiles</Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default EmptyScreen;
