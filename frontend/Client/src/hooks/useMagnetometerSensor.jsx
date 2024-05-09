import { useEffect } from "react";
import { SensorKey } from "../services/sensors/SensorKey";
import useSensor from "./useSensor";

const useMagnetometerSensor = (interval = 1,windowSize=-1,onLoadCallback=null,onEventCallback=null,onEventWindowDataUpdate=null) => {
    const {
        lastEvent: magnetometerLastEvent,
        sensorData: magnetometerSensorData,
        sensorLoading: magnetometerSensorLoading,
        getLastEvent: magnetometerGetLastEvent,
        getDataWindow: magnetometerGetDataWindow,
        startSensor: magnetometerStartSensor,
        stopSensor: magnetometerStopSensor,
        stopListening: magnetometerStopListening,
        onIntervalChange: magnetometerOnIntervalChange,
        onWindowSizeChange: magnetometerOnWindowSizeChange,
        onEventCallbackChange: magnetometerOnEventCallbackChange,
        onEventWindowDataUpdateChange: magnetometerOnEventWindowDataUpdateChange,
    } = useSensor(SensorKey.MAGNETOMETER, interval, windowSize, onLoadCallback,onEventCallback,onEventWindowDataUpdate);

    return {
        magnetometerLastEvent,
        magnetometerSensorData,
        magnetometerSensorLoading,
        magnetometerGetLastEvent,
        magnetometerGetDataWindow,
        magnetometerStartSensor,
        magnetometerStopSensor,
        magnetometerStopListening,
        magnetometerOnIntervalChange,
        magnetometerOnWindowSizeChange,
        magnetometerOnEventCallbackChange,
        magnetometerOnEventWindowDataUpdateChange,
  
    };
};

export default useMagnetometerSensor;

