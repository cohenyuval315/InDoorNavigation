import React from "react";
import { useEffect } from "react";
import useGPS from "../hooks/useGPS";
import { GeolocationStreamOptions, PositionError } from "../services/GpsService";


const GPSStream = ({ children = null }) => {
  const {     
    startGPS,
    stopGPS,
  } = useGPS();


  const config: GeolocationStreamOptions = {
    enableHighAccuracy:true,
    maximumAge:0,
    distanceFilter:0,
    // timeout,
    // useSignificantChanges
  }


  useEffect(() => {
    startGPS(config);
    return () => stopGPS();
  },[])

  return children;

};

export default GPSStream;
