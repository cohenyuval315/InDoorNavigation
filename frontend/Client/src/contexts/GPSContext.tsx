// GPSContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Geolocation, GeolocationStreamOptions } from '../sensors/gps-service';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { Observer, Subscription } from 'rxjs';

const GPSContext = createContext<any | null>(null);

export const GPSProvider = ({ children }: {children:any}) => {
  const [isGPSListening,setIsGPSListening] = useState(false);
  const [isGPSAvailable,setIsGPSAvailble] = useState(false);
  const [hasLocationService, setHasLocationService] = useState(false);
  const [hasGPSPermissions,setHasGPSPermissions] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const currentLocationOptions = {
    maximumAge:0,
    timeout:1000,
    enableHighAccuracy:true,
  }

  const getIsGPSAvailable = async () => {
    try {
      const response = await Geolocation.getInstance().getCurrentGPSPosition(currentLocationOptions);
      return true;
    }catch(error){
      return false;
    }
  }

  const getIsGPSListening = () => {
    const response = Geolocation.getInstance().isStreaming();
    if (response) {
      return true
    } else {
      return false;
    }
  }

  

  const startGPS = async (config: GeolocationStreamOptions | undefined) => {
    const isListening = getIsGPSListening();
    if (!isListening){
      Geolocation.getInstance().startStream(config,true);
    }
  }

  const stopGPS = () => {
    const isListening = getIsGPSListening();
    if (isListening){
      Geolocation.getInstance().stopStream();
    }
  }

  const isGPSStreaming = () => {
    return Geolocation.getInstance().isStreaming();
  }

  const observeGPS = (observer: Partial<Observer<GeolocationResponse | null>> | ((value: GeolocationResponse | null) => void) | undefined):Subscription =>  {
    return Geolocation.getInstance().subscribeGeoLocation(observer);
  }



  return (
    <GPSContext.Provider value={{

      getIsGPSAvailable,
      getIsGPSListening,
      startGPS,
      stopGPS,
      isGPSStreaming,
      observeGPS,
        
    }}>
      {children}
    </GPSContext.Provider>
  );
};

export const useGPSContext = () => {
  return useContext(GPSContext);
};
