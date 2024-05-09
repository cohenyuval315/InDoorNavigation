import { NativeModules } from "react-native";
// const {
//   RNSensorsGyroscope: GyroNative,
//   RNSensorsAccelerometer: AccNative,
//   RNSensorsMagnetometer: MagnNative,
//   RNSensorsBarometer: BarNative,
//   RNSensorsOrientation: OrientNative,
//   RNSensorsGravity: GravNative,
// } = NativeModules;

const {
  RNSensorsAccelerometer:AccNative,
  RNSensorsAccelerometerLimitedAxes:AccLimNative,
  RNSensorsAccelerometerLimitedAxesUncalibrated:AccLimUncaliNative,
  RNSensorsAccelerometerUncalibrated:AccUncaliNative,
  RNSensorsAll:AllNative,
  RNSensorsAmbientTemperature:AmbientTempNative,
  RNSensorsPrivateBase:PrivateNative,
  RNSensorsGameRotationVector:GameRotationVecNative,
  RNSensorsGeomagneticRotation:GeomagnNative,
  RNSensorsGravity:GravNative,
  RNSensorsGyroscope:GyroNative,
  RNSensorsGyroscopeLimitedAxes:GyroLimNative,
  RNSensorsGyroscopeLimitedAxesUncalibrated:GyroLimUncaliNative,
  RNSensorsGyroscopeUncalibrated:GyroUncaliNative,
  RNSensorsHeading:headingNative,
  RNSensorsHeadTracker:headingTrackerNative,
  RNSensorsHeartBeat:heartBeatNative,
  RNSensorsHeartRate:heartRateNative,
  RNSensorsHingeAngle:hingeAngleNative,
  RNSensorsLight:lightNative,
  RNSensorsLinearAcceleration:linearAccNative,
  RNSensorsLowLatencyOffbodyDetect:offBodyNative,
  RNSensorsMagnetometer:MagnNative,
  RNSensorsMagnetometerUncalibrated:MagnUncalibNative,
  RNSensorsMotionDetect:MotionNative,
  RNSensorsOrientationDeprecated:OrientDepNative,
  RNSensorsPos6DegreeFreedom:Pos6Native,
  RNSensorsBarometer:BarNative,
  RNSensorsProximity:proxNative,
  RNSensorsRelativeHumidity:humidNavite,
  RNSensorsRotationVector:OrientNative,
  RNSensorsSignificantMotion:signMotionNative,
  RNSensorsStationaryDetect:stationNative,
  RNSensorsStepCounter:stepCounterNative,
  RNSensorsStepDetector:stepDetectorNative,
  RNSensorsTemperatureDeprecated:tempDepNative,
} = NativeModules;


if (!GyroNative && !AccNative && !MagnNative && !BarNative && !OrientNative && !GravNative) {
  throw new Error("Native modules for sensors not available. Did react-native link run successfully?");
}



// const nativeApis = new Map([
//   ["accelerometer", AccNative],
//   ["gyroscope", GyroNative],
//   ["magnetometer", MagnNative],
//   ["barometer", BarNative],
//   ["orientation", OrientNative],
//   ["gravity", GravNative],
// ]);

const nativeApis = new Map([
  // ["accelerometer", AccNative],
  // ["gyroscope", GyroNative],
  // ["magnetometer", MagnNative],
  // ["barometer", BarNative],
  // ["orientation", OrientNative],
  // ["gravity", GravNative],

  ["accelerometer",AccNative],
  ["accelerometerLimitedAxes",AccLimNative],
  ["accelerometerLimitedAxesUncalibrated",AccLimUncaliNative],
  ["accelerometerUncalibrated",AccUncaliNative],
  ["all",AllNative],
  ["ambientTemperature",AmbientTempNative],
  ["privateBase",PrivateNative],
  ["gameRotationVector",GameRotationVecNative],
  ["geomagneticRotation",GeomagnNative],
  ["gravity",GravNative],
  ["gyroscope",GyroNative],
  ["gyroscopeLimitedAxes",GyroLimNative],
  ["gyroscopeLimitedAxesUncalibrated",GyroLimUncaliNative],
  ["gyroscopeUncalibrated",GyroUncaliNative],
  ["heading",headingNative],
  ["headTracker",headingTrackerNative],
  ["heartBeat",heartBeatNative],
  ["heartRate",heartRateNative],
  ["hingeAngle",hingeAngleNative],
  ["light",lightNative],
  ["linearAcceleration",linearAccNative],
  ["lowLatencyOffbodyDetect",offBodyNative],
  ["magnetometer",MagnNative],
  ["magnetometerUncalibrated",MagnUncalibNative],
  ["motionDetect",MotionNative],
  ["orientationDeprecated",OrientDepNative],
  ["pos6DegreeFreedom",Pos6Native],
  ["barometer",BarNative],
  ["proximity",proxNative],
  ["relativeHumidity",humidNavite],
  ["rotationVector",OrientNative],
  ["significantMotion",signMotionNative],
  ["stationaryDetect",stationNative],
  ["stepCounter",stepCounterNative],
  ["stepDetector",stepDetectorNative],
  ["temperatureDeprecated",tempDepNative],
]);

// Cache the availability of sensors
const availableSensors = {};

export function start(type) {
  const api = nativeApis.get(type);
  api.startUpdates();
}


// export function isAvailable(type) {
//   if (availableSensors[type]) {
//     return availableSensors[type];
//   }

//   const api = nativeApis.get(type);
//   const promise = api.isAvailable();
//   availableSensors[type] = promise;
//   return promise;
// }


// export function isSensorAvailable(type) {
//   if (availableSensors[type]) {
//     return availableSensors[type];
//   }

//   const api = nativeApis.get(type);
//   const promise = api.isSensorAvailable();
//   availableSensors[type] = promise;
//   return promise;
// }

export function stop(type) {
  const api = nativeApis.get(type);
  api.stopUpdates();
}


// export function setUpdateInterval(type, updateInterval) {
//   const api = nativeApis.get(type);
//   api.setUpdateInterval(updateInterval);
// }

export function setLogLevelForType(type, level) {
  const api = nativeApis.get(type);
  api.setLogLevel(level);
}

export function getSensorInformation(type){
  const api = nativeApis.get(type);
  const promise = api.getSensorInformation();
  return promise;
}

export function isSensorAvailable(type){
  if (availableSensors[type]) {
    return availableSensors[type];
  }

  const api = nativeApis.get(type);
  const promise = api.isSensorAvailable();
  availableSensors[type] = promise;
  return promise;
}

export function setUpdateInterval(type,updateInterval){
  const api = nativeApis.get(type);
  api.setUpdateInterval(updateInterval);
}

export function setUpdateMaxReportLatencyUs(type,maxLatency){
  const api = nativeApis.get(type);
  api.setUpdateMaxReportLatencyUs(maxLatency);
}

export function setLogLevel(type,level){
  const api = nativeApis.get(type);
  api.setLogLevel(level);
}

export function setNumTriggers(type,numTriggers){
  const api = nativeApis.get(type);
  api.setNumTriggers(numTriggers);
}

export function setHandler(type,numHandleType){
  const api = nativeApis.get(type);
  api.setHandler(numHandleType);
}

export function flushSensor(type){
  const api = nativeApis.get(type);
  api.flushSensor();
}

export function startTrigger(type){
  const api = nativeApis.get(type);
  api.startTrigger();
}

export function cancelTrigger(type){
  const api = nativeApis.get(type);
  api.cancelTrigger();
}

export function startDynamicSensor(type){
  const api = nativeApis.get(type);
  api.startDynamicSensor();
}

export function stopDynamicSensor(type){
  const api = nativeApis.get(type);
  api.stopDynamicSensor();
}

export function startUpdates(type){
  const api = nativeApis.get(type);
  api.startUpdates();
}

export function stopUpdate(type){
  const api = nativeApis.get(type);
  api.stopUpdate();
}

export function stopUpdates(type){
  const api = nativeApis.get(type);
  api.stopUpdates();
}

export function isTriggerSensor(type){
  const api = nativeApis.get(type);
  const promise = api.isTriggerSensor();
  return promise;
}

export function isAvailable(type){
  if (availableSensors[type]) {
    return availableSensors[type];
  }

  const api = nativeApis.get(type);
  const promise = api.isAvailable();
  availableSensors[type] = promise;
  return promise;
}

export function addListener(type){
  const api = nativeApis.get(type);
  api.addListener();
}

export function removeListeners(type){
  const api = nativeApis.get(type);
  api.removeListeners();
}
