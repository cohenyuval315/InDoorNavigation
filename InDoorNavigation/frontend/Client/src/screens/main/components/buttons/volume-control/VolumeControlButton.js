import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';



const VolumeControlButton = ({ volume,onVolumeChange }) => {
   // Volume range: 0.0 - 1.0
    //    const [volume, setVolume] = useState(0.5);
    // const onVolumeChange = (newVolume) => {
    //     setVolume(newVolume);
    // }
  const [sliderVisible, setSliderVisible] = useState(false); // State to toggle slider visibility

  const [isTTS,setIsTTS] = useState(false);
  const [icon,setIcon] = useState(null)



  const speakDirection = (text) => {
    if (!isTTS){
      return ;
    }
    Tts.speak(text,{
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: volume,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };
  
  useEffect(() => {
    const newIcon =setVolumeIconName(volume)
    setIcon(newIcon)
  },[volume])

  const toggleSlider = () => {
    setSliderVisible(!sliderVisible);
  };
  const setVolumeIconName = (v) => {
    if(v <= 0){
      return "volume-mute"
    }
    if (v < 0.1){
      return "volume-off"
    }
    if (v < 0.3){
      return "volume-low"
    }
    if (v < 0.65){
      return "volume-medium"
    }
    return "volume-high";
  }

  return (
    <>
    <TouchableOpacity style={styles.button} onPress={toggleSlider}>
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={24} color="black" />
      </View>
    </TouchableOpacity>
    {sliderVisible && (
        <View style={{
          position:"absolute",
          bottom:60,
          left:50,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius:20,

        }}>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={onVolumeChange}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#8E8E93"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {

    
  },
  button: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    marginRight: 10,
  },
  volumeText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default VolumeControlButton;
