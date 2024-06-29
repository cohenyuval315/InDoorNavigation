import React, { useEffect, useRef, useState } from 'react';
import { useGPSContext } from '../contexts/GPSContext';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { PositionError } from '../services/GpsService';
// import { getGlobalGeoCoordinatesByGPS,GPS } from '../sensors/gps-service';
// import { setNumTriggers } from '../services/sensors';

const useGPS = () => {
    
    const {
        getIsGPSAvailable,
        getIsGPSListening,
        startGPS,
        stopGPS,
        isGPSStreaming,
        observeGPS,
    } = useGPSContext();

    const subscription = useRef<any|null>(null);

    const subscribeGPS = (
        onNext: (position:GeolocationResponse) => any, 
        onError: (error:PositionError) => any = () => {}, 
        onComplete: () => any = () => {}) => {
        subscription.current = observeGPS({
            next:onNext,
            error:onError,
            complete:onComplete
        })
    }
    const unsubscribeGPS = () => {
        if(subscription.current){
            subscription.current.unsubscribe();
            subscription.current = null;
        }
    }

    return {
        getIsGPSAvailable,
        getIsGPSListening,        
        startGPS,
        stopGPS,
        isGPSStreaming,
        observeGPS,  
        subscribeGPS, 
        unsubscribeGPS,     
    }
}

export default useGPS;

// const sGPS = GPS.getInstance();
// sGPS.setGPSConfigurations();
// const useGPS = (
//                 onEventWindowDataUpdate=null,
//                 initialPositionConfig=null,
//                 initialSubscriptionConfig=null,
//                 windowSize=-1,
//                 ) => {
//     const maxWindowSize = 10;
//     const minWindowSize = 0;    
    
//     const [isGPSAvailable,setIsGPSAvailable] = useState(false);
//     const [GPSWindowSize,setGPSWindowSize] = useState(windowSize < minWindowSize ? minWindowSize : windowSize > maxWindowSize ? maxWindowSize : windowSize);

//     const [isListening,setIsListening] = useState(false);
//     const [isWorking,setIsWorking] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [loadingLocationServicesStatu,setLoadingLocationServicesStatus] = useState(true)

//     const dataRef = useRef([]);
//     const lastPositionRef = useRef(null);
//     const subscriptionIdRef = useRef(null);
    
    
//     const [positionConfig,setPositionConfig] = useState(initialPositionConfig ? initialPositionConfig : {
//         timeout: 60 * 10 * 1000, 
//         maximumAge: 0, // 0 
//         enableHighAccuracy: true,
//     })

//     const [subscriptionConfig,setSubscriptionConfig] = useState(initialSubscriptionConfig ? initialSubscriptionConfig :{
//         // interval: 1000, android only
//         // fastestInterval: number, android only, max interval
//         timeout: 60 * 10 * 1000, // default
//         maximumAge: Infinity,//cached pos in milisrc, 0 no cache, INF => always cached regardless of age, default INF
//         enableHighAccuracy: true, // gps = true, wifi = false
//         distanceFilter: 100, // min distance before retuning new pos    
//         useSignificantChanges: false, // only on sign change
//     })

//     const [eventWindowDataUpdateCallback,setEventWindowDataUpdateCallback] = useState(onEventWindowDataUpdate ? () => onEventWindowDataUpdate : null);
//     const [isLocationServicesEnabled, setIsLocationServicesEnabled] = useState(true); 


//     useEffect(() => {
//         checkLocationServicesStatus();
//     }, []);



//     const checkLocationServicesStatus = async () => {
//         setLoadingLocationServicesStatus(true);
//         try {
//           await sGPS.getCurrentGPSPosition();
//           setIsLocationServicesEnabled(true);
//         } catch (error) {
//           setIsLocationServicesEnabled(false);
//           setErrorMessage(error.message);
//         } finally {
//           setLoadingLocationServicesStatus(false);
//         }
//       };


//     const handleWindowNewEvent = async (event) => {
//         if (onEventWindowDataUpdate !== null){
//             const newData = await eventWindowDataUpdateCallback(dataRef.current,event,GPSWindowSize);
//             dataRef.current = newData;
//         }else{
//             if (GPSWindowSize > 0) {
//                 dataRef.current = [...dataRef.current, event].slice(-GPSWindowSize);
//             }
//         }
//     }      
    
//     const onPositionConfigChange = (config) => {
//         setPositionConfig(config)
//     }
//     const onSubscriptionConfigChange = (config) => {
//         setSubscriptionConfig(config);
//     }

//     const onGPSError = (error) => {
//         const {
//             code,
//             message,
//             PERMISSION_DENIED,
//             POSITION_UNAVAILABLE,
//             TIMEOUT ,
//         } = error;
//         console.error(`GPS error: ${JSON.stringify(error)}`)
//         if(errorMessage != message){
//             setErrorMessage(errorMessage)
//         }
//         if(isWorking){
//             setIsWorking(false);
//         }
//     }


//     const onGPSSuccessCallback = (position) => {
//             // {
//             //  "coords": {
//             //         "accuracy": 13.399999618530273, 
//             //         "altitude": 64.2, 
//             //         "heading": 0, 
//             //         "latitude": 31.934605, 
//             //         "longitude": 34.80656666666666, 
//             //         "speed": 0
//             //     }, 
//             //     "extras": {
//             //         "maxCn0": 34, 
//             //         "meanCn0": 26, 
//             //         "satellites": 6
//             //     }, 
//             //     "mocked": false, 
//             //     "timestamp": 1710794540908
//             // }            
   
//         lastPositionRef.current = position
//         handleWindowNewEvent(position);
//         if(!isGPSAvailable){
//             setIsGPSAvailable(true);
//         }
//         if(!isLocationServicesEnabled){
//             setIsLocationServicesEnabled(true);
//         }
//         if(errorMessage){
//             setErrorMessage(null);
//         }
//         if(!isWorking){
//             setIsWorking(true);

//         }
//     }


//     const getLastPosition = () => {
//         if(lastPositionRef.current){
//             return lastPositionRef.current;
//         }
//     }

//     const getDataWindow = () => {
//         if(GPSWindowSize > 0){
//             if(dataRef.current){
//                 return dataRef.current;
//             }
//         }
//         return [];
//     }


//     const getPosition = async () => {
//         try{
//             const position = await sGPS.getCurrentGPSPosition(positionConfig);
//             return position;
//         }catch(error){
//             onGPSError(error);
//         }
//     }

//     const start = async () => {
//         if(!isListening){
//             try{
//                 subscriptionIdRef.current = await sGPS.requestWatchPosition(onGPSSuccessCallback,onGPSError,subscriptionConfig);
//                 setIsListening(true);
//             }catch(error){
//                 onGPSError(error);
//             }
                        
//         }
        
//     }

//     const stop = () => {
//         if(isListening){
//             if(subscriptionIdRef.current){
//                 sGPS.requestClearWatch(subscriptionIdRef.current);
//                 subscriptionIdRef.current = null;
//                 setIsListening(false);
//                 setIsWorking(null);
//             }
//         }
//     };

//   return {
//     isGPSAvailable,
//     GPSWindowSize,
//     isListening,
//     isWorking,
//     errorMessage,    
//     getLastPosition,
//     getDataWindow,
//     getPosition,
//     start,
//     stop,
//     onPositionConfigChange,
//     onSubscriptionConfigChange
//   }
// }
// export default useGPS;
