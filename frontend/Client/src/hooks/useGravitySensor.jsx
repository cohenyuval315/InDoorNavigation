import { useEffect } from "react";
import { SensorKey } from "../services/sensors/SensorKey";
import useSensor from "./useSensor";

const useGravitySensor = (interval = 1,windowSize=-1,onLoadCallback=null,onEventCallback=null,onEventWindowDataUpdate=null) => {
    const {
        lastEvent: gravityLastEvent,
        sensorData: gravitySensorData,
        sensorLoading: gravitySensorLoading,
        getLastEvent: gravityGetLastEvent,
        getDataWindow: gravityGetDataWindow,
        startSensor: gravityStartSensor,
        stopSensor: gravityStopSensor,
        stopListening: gravityStopListening,
        onIntervalChange: gravityOnIntervalChange,
        onWindowSizeChange: gravityOnWindowSizeChange,
        onEventCallbackChange: gravityOnEventCallbackChange,
        onEventWindowDataUpdateChange: gravityOnEventWindowDataUpdateChange,
    } = useSensor(SensorKey.GRAVITY, interval, windowSize, onLoadCallback,onEventCallback,onEventWindowDataUpdate);

    return {
        gravityLastEvent,
        gravitySensorData,
        gravitySensorLoading,
        gravityStartSensor,
        gravityGetLastEvent,
        gravityGetDataWindow,
        gravityStopSensor,
        gravityStopListening,
        gravityOnIntervalChange,
        gravityOnWindowSizeChange,
        gravityOnEventCallbackChange,
        gravityOnEventWindowDataUpdateChange,
  
    };
};

export default useGravitySensor;