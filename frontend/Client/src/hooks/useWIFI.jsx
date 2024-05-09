import React, { useEffect, useRef, useState } from 'react';
import { createTimestamp } from '../utils/time';
import {NativeModules} from 'react-native';
const {WifiModule} = NativeModules;

const useWIFI = (initialInterval=5,initialWindowSize=10) => {
    const [wifiData,setWifiData] = useState([])
    const [interval,setInterval] = useState(initialInterval);
    const [windowSize,setWindowSize] = useState(initialWindowSize);
    const [wifiNetworks,setWifiNetworks] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);


    const startInterval = () => {
        setIsRunning(true);
        intervalRef.current = setInterval(async () => {
            await addData();
        }, interval * 1000);
    };

    const pauseInterval = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    const stopInterval = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setWifiData([]);
    };

    const addData = async () => {
        const data = await getWifiData();
        setWifiNetworks(data);
        setWifiData(prevData => {
            const newData = [
                ...prevData,
                {
                    timestamp: createTimestamp(new Date()),
                    data: data
                }
            ];
            return newData.slice(Math.max(0, newData.length - windowSize), newData.length);
        });
    };


    const getWifiData = async () => {
        const data = await WifiModule.reScanAndLoadWifiList();
        // console.log("getWifiData:" ,data)
        return data;
    }
    const initialLoad = async () => {
        const data = await WifiModule.loadWifiList();
        // console.log("WIFIinitialLoad:" ,data)
        setWifiNetworks(data);
    }

    useEffect(() => {
        initialLoad();
    },[])

    useEffect(() => {
        if (isRunning) {
            startInterval();
        } else {
            pauseInterval();
        }
        // Cleanup function to clear interval on unmount or on isRunning change
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const getWifiNetworkString = () => {
        return JSON.stringify(wifiNetworks, null, 2);
    }
    const getWifiDataString = () => {
        return JSON.stringify(wifiNetworks, null, 2);
    }
    
    const onWindowSizeChange = (value) => {
        setWindowSize(value)
    }
    const onIntervalChange = (value) => {
        setInterval(value)
    }
    
  return {
    wifiData,
    interval,
    wifiNetworks,
    isRunning,
    windowSize,
    
    addData,
    initialLoad,

    getWifiData,

    getWifiNetworkString,
    getWifiDataString,
    onWindowSizeChange,
    onIntervalChange,

    startInterval,
    pauseInterval,
    stopInterval,
   

  }
}
export default useWIFI;
