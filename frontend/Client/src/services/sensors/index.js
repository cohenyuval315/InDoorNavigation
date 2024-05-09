
import {
    // gyroscope,
    // accelerometer,
    // magnetometer,
    // barometer,
    // orientation,
    // gravity
    accelerometer,
    accelerometerLimitedAxes,
    accelerometerLimitedAxesUncalibrated,
    accelerometerUncalibrated,
    all,
    ambientTemperature,
    privateBase,
    gameRotationVector,
    geomagneticRotation,
    gravity,
    gyroscope,
    gyroscopeLimitedAxes,
    gyroscopeLimitedAxesUncalibrated,
    gyroscopeUncalibrated,
    heading,
    headTracker,
    heartBeat,
    heartRate,
    hingeAngle,
    light,
    linearAcceleration,
    lowLatencyOffbodyDetect,
    magnetometer,
    magnetometerUncalibrated,
    motionDetect,
    orientationDeprecated,
    pos6DegreeFreedom,
    barometer,
    proximity,
    relativeHumidity,
    rotationVector,
    significantMotion,
    stationaryDetect,
    stepCounter,
    stepDetector,
    temperatureDeprecated,    
} from './sensors';

import sensors from './sensors';

// import  {
//     start,
//     isAvailable,
//     stop,
//     setUpdateInterval,
//     setLogLevelForType,
//     isSensorAvailable,
// } from './rnsensors';


import  {
    getSensorInformation,
    isSensorAvailable,
    setUpdateInterval,
    setUpdateMaxReportLatencyUs,
    setLogLevel,
    setNumTriggers,
    setHandler,
    flushSensor,
    startTrigger,
    cancelTrigger,
    startDynamicSensor,
    stopDynamicSensor,
    startUpdates,
    stopUpdate,
    stopUpdates,
    isAvailable,
    addListener,
    removeListeners,
    
} from './rnsensors';


// export {
//     sensors,
//     gyroscope,
//     accelerometer,
//     magnetometer,
//     barometer,
//     orientation,
//     gravity,
//     start,
//     isAvailable,
//     isSensorAvailable,
//     stop,
//     setUpdateInterval,
//     setLogLevelForType    
// }

export {
    sensors,

    getSensorInformation,
    isSensorAvailable,
    setUpdateInterval,
    setUpdateMaxReportLatencyUs,
    setLogLevel,
    setNumTriggers,
    setHandler,
    flushSensor,
    startTrigger,
    cancelTrigger,
    startDynamicSensor,
    stopDynamicSensor,
    startUpdates,
    stopUpdate,
    stopUpdates,
    isAvailable,
    addListener,
    removeListeners,


    accelerometer,
    accelerometerLimitedAxes,
    accelerometerLimitedAxesUncalibrated,
    accelerometerUncalibrated,
    all,
    ambientTemperature,
    privateBase,
    gameRotationVector,
    geomagneticRotation,
    gravity,
    gyroscope,
    gyroscopeLimitedAxes,
    gyroscopeLimitedAxesUncalibrated,
    gyroscopeUncalibrated,
    heading,
    headTracker,
    heartBeat,
    heartRate,
    hingeAngle,
    light,
    linearAcceleration,
    lowLatencyOffbodyDetect,
    magnetometer,
    magnetometerUncalibrated,
    motionDetect,
    orientationDeprecated,
    pos6DegreeFreedom,
    barometer,
    proximity,
    relativeHumidity,
    rotationVector,
    significantMotion,
    stationaryDetect,
    stepCounter,
    stepDetector,
    temperatureDeprecated,
}

