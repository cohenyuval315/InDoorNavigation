import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
    sensors,    
    startUpdates,
    stopUpdate,
    stopUpdates,
    isSensorAvailable,
    getSensorInformation,
    setUpdateInterval

 } from '../services/sensors';
import { SensorKey, sensorKeys } from '../services/sensors/SensorKey';
 
// gyroscope,
// accelerometer,
// magnetometer,
// barometer,
// orientation,

function start(sensor){
    startUpdates(sensor);
}

function stop(sensor){
    stopUpdate(sensor);
}

const useSensor = (sensor,interval = 1,windowSize=-1,onLoadCallback=null,onEventCallback=null,onEventWindowDataUpdate=null) => {
    const maxWindowSize = 11;

    if (!sensorKeys.includes(sensor)){
        throw new Error("unknown sensor key");
    }
    
    if(isNaN(windowSize)){
        throw new Error("window size must be number");
    }

    if(isNaN(interval)){
        throw new Error("interval size must be number");
    }

    if(onEventCallback !==null && typeof onEventCallback !== "function"){
        throw new Error("event callback must be a function");
    }

    if(onLoadCallback !==null && typeof onLoadCallback !== "function"){
        throw new Error("load callback must be a function");
    }

    if(onEventWindowDataUpdate !==null && typeof onEventWindowDataUpdate !== "function"){
        throw new Error("onEventWindowDataUpdate callback must be a function");
    }

    const [isAvailableSensor, setIsAvailableSensor] = useState(false);
    const [sensorLoading, setSensorLoading] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [sensorWindowSize,setSensorWindowSize] = useState(windowSize <= 0 ? 0 : windowSize > maxWindowSize ? maxWindowSize : windowSize)
    const [sensorInterval, setSensorInterval] = useState(interval || 1);
    const [eventCallback,setEventCallback] = useState(onEventCallback ? () => onEventCallback : null);
    const [eventWindowDataUpdateCallback,setEventWindowDataUpdateCallback] = useState(onEventWindowDataUpdate ? () => onEventWindowDataUpdate : null);

    const dataRef = useRef([]);
    const lastEventRef = useRef(null);
    const subscriptionRef = useRef(null);

    const minIntervalRef = useRef(null);
    const maxIntervalRef = useRef(null);

    
    const loadIsSensorAvailable = async () => {
        setSensorLoading(true);
        // const isAvail = await isSensorAvailable(sensor);
        const information = await getSensorInformation(sensor);
        const isAvail =  information['isAvailable']
        console.log("INFO:",information);
        setIsAvailableSensor(isAvail)
        setSensorLoading(false);
        console.log(`${sensor} sensor is ${isAvail ? "available" : "not available"} ...`)
    }


    const loadInitialConfiguration = async () => {
        stop(sensor); 
        setUpdateInterval(sensor, sensorInterval * 1000);
        const maxInterval = 10;
        const minInterval = 0;
        minIntervalRef.current = minInterval;
        maxIntervalRef.current = maxInterval;
        if (sensorInterval > maxInterval){
            setSensorInterval(maxInterval)
        }
        if (sensorInterval < minInterval){
            setSensorInterval(minInterval)
        }            
    }

    useEffect(() => {
        loadIsSensorAvailable();
    }, []);


    useEffect(() => {
        async function load (){
            console.log(`loading ${sensor} sensor configurations ...`);
            await loadInitialConfiguration()
            if(onLoadCallback){
                console.log(`on ${sensor} sensor load ...`)
                await onLoadCallback();
            }
            
        }
        if(!sensorLoading && isAvailableSensor){
            load()
        }
    },[sensorLoading])


    const onIntervalChange = (value) => {
        if(isNaN(value)){
            throw new Error("interval must be number");
        }
        if(isListening){
            stop(sensor);
        }
        
        let newInterval = value;
        if (maxIntervalRef.current && value > maxIntervalRef.current){
            newInterval = maxIntervalRef.current
        }
        if (minIntervalRef.current && value < minIntervalRef.current){
            newInterval = minIntervalRef.current
        }         
        setUpdateInterval(sensor,newInterval * 1000);
        setSensorInterval(newInterval);

        if(isListening){
            start(sensor);
        }        
        
    }

    const onWindowSizeChange = (value) => {
        if(isNaN(value)){
            throw new Error("window size must be number");
        }
        if(isListening){
            stop(sensor);
        }
        let windowSize = value;
        if (windowSize > maxWindowSize){
            windowSize = maxWindowSize
        }
        if (windowSize <= 0){
            windowSize = 0;
        }
        setSensorWindowSize(windowSize);

        if(isListening){
            start(sensor);
        }
    }


    const onEventCallbackChange = (newCallback) => {
        if(typeof newCallback === "function"){
            setEventCallback(() => newCallback)
        }else{
            console.error("callback must be a function")
        }
    }

    
    const onEventWindowDataUpdateChange = (newCallback) => {
        if(typeof newCallback === "function"){
            setEventWindowDataUpdateCallback(() => newCallback)
        }else{
            console.error("callback must be a function")
        }
    }



    const handleWindowNewEvent = async (event) => {
        if (onEventWindowDataUpdate !== null){
            const newData = await eventWindowDataUpdateCallback(dataRef.current,event,sensorWindowSize);
            dataRef.current = newData;
        }else{
            if (sensorWindowSize > 0) {
                dataRef.current = [...dataRef.current, event].slice(-sensorWindowSize);
            }
        }

    }

    const startSensor = async () => {
        if (!isListening) {
            start(sensor);
            setIsListening(true);
            subscriptionRef.current = sensors[sensor].subscribe(async (event) => {
                lastEventRef.current = event;
                await handleWindowNewEvent(event);
                if(eventCallback){
                    eventCallback(event);
                }                        
            });
        }
    }


    const stopListening = () => {
        if (isListening) {
            console.log(`stop listening sensor ${sensor} ...`)
            setIsListening(false);
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        }
    }

    const stopSensor = () => {
        if (isListening) {
            console.log(`stoping sensor ${sensor} ...`)
            stopListening();
            stop(sensor)
        }
    }


    const getFirstEvent = () => {
        return new Promise((resolve, reject) => {
            const subscription = sensors[sensor].subscribe((event) => {
                if (event) {
                    subscription.unsubscribe();
                    resolve(event);
                }
            });
        });
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getLastEvent = async (shouldStartSensor = true, shouldStopAfterEvent = true) => {
        if (!isListening && shouldStartSensor && isAvailableSensor) {
            console.log(`starting sensor ${sensor} to get event...`)
            start(sensor);
            const event = await getFirstEvent();
            if(shouldStopAfterEvent){
                console.log(`stoping sensor ${sensor} after recv event ...`)
                stop(sensor)
            }
            return event;
        }else{
            console.log(`get last ${sensor} event...`)
            if(lastEventRef.current){
                return lastEventRef.current;
            }
        }

    }

    const getDataWindow = () => {
        if(sensorWindowSize > 0){
            if(dataRef.current){
                return dataRef.current;
            }
        }
        return [];
    }

    useEffect(() => {
        return () => {
            stopListening();
        };
    }, []);

  return {
        lastEvent: lastEventRef,
        sensorData: dataRef,
        sensorLoading: sensorLoading,
        getLastEvent: getLastEvent,
        getDataWindow:getDataWindow,
        startSensor: startSensor,
        stopSensor: stopSensor,
        stopListening: stopListening,
        onIntervalChange: onIntervalChange,
        onWindowSizeChange: onWindowSizeChange,
        onEventCallbackChange: onEventCallbackChange,
        onEventWindowDataUpdateChange:onEventWindowDataUpdateChange
  }
}
export default useSensor;
