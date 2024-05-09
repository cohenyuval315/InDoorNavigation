import { NativeEventEmitter, NativeModules } from "react-native";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import * as RNSensors from "./rnsensors";

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

const listenerKeys = new Map([
  // ["accelerometer", "RNSensorsAccelerometer"],
  // ["gyroscope", "RNSensorsGyroscope"],
  // ["magnetometer", "RNSensorsMagnetometer"],
  // ["barometer", "RNSensorsBarometer"],
  // ["orientation", "RNSensorsOrientation"],
  // ["gravity", "RNSensorsGravity"],

  ["accelerometer","RNSensorsAccelerometer"],
  ["accelerometerLimitedAxes","RNSensorsAccelerometerLimitedAxes"],
  ["accelerometerLimitedAxesUncalibrated","RNSensorsAccelerometerLimitedAxesUncalibrated"],
  ["accelerometerUncalibrated","RNSensorsAccelerometerUncalibrated"],
  ["all","RNSensorsAll"],
  ["ambientTemperature","RNSensorsAmbientTemperature"],
  ["privateBase","RNSensorsPrivateBase"],
  ["gameRotationVector","RNSensorsGameRotationVector"],
  ["geomagneticRotation","RNSensorsGeomagneticRotation"],
  ["gravity","RNSensorsGravity"],
  ["gyroscope","RNSensorsGyroscope"],
  ["gyroscopeLimitedAxes","RNSensorsGyroscopeLimitedAxes"],
  ["gyroscopeLimitedAxesUncalibrated","RNSensorsGyroscopeLimitedAxesUncalibrated"],
  ["gyroscopeUncalibrated","RNSensorsGyroscopeUncalibrated"],
  ["heading","RNSensorsHeading"],
  ["headTracker","RNSensorsHeadTracker"],
  ["heartBeat","RNSensorsHeartBeat"],
  ["heartRate","RNSensorsHeartRate"],
  ["hingeAngle","RNSensorsHingeAngle"],
  ["light","RNSensorsLight"],
  ["linearAcceleration","RNSensorsLinearAcceleration"],
  ["lowLatencyOffbodyDetect","RNSensorsLowLatencyOffbodyDetect"],
  ["magnetometer","RNSensorsMagnetometer"],
  ["magnetometerUncalibrated","RNSensorsMagnetometerUncalibrated"],
  ["motionDetect","RNSensorsMotionDetect"],
  ["orientationDeprecated","RNSensorsOrientationDeprecated"],
  ["pos6DegreeFreedom","RNSensorsPos6DegreeFreedom"],
  ["barometer","RNSensorsBarometer"],
  ["proximity","RNSensorsProximity"],
  ["relativeHumidity","RNSensorsRelativeHumidity"],
  ["rotationVector","RNSensorsRotationVector"],
  ["significantMotion","RNSensorsSignificantMotion"],
  ["stationaryDetect","RNSensorsStationaryDetect"],
  ["stepCounter","RNSensorsStepCounter"],
  ["stepDetector","RNSensorsStepDetector"],
  ["temperatureDeprecated","RNSensorsTemperatureDeprecated"],
]);

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

const eventEmitterSubscription = new Map([
  // ["accelerometer", null],
  // ["gyroscope", null],
  // ["magnetometer", null],
  // ["barometer", null],
  // ["orientation", null],
  // ["gravity", null],

  ["accelerometer", null],
  ["accelerometerLimitedAxes", null],
  ["accelerometerLimitedAxesUncalibrated", null],
  ["accelerometerUncalibrated", null],
  ["all", null],
  ["ambientTemperature", null],
  ["privateBase", null],
  ["gameRotationVector", null],
  ["geomagneticRotation", null],
  ["gravity", null],
  ["gyroscope", null],
  ["gyroscopeLimitedAxes", null],
  ["gyroscopeLimitedAxesUncalibrated", null],
  ["gyroscopeUncalibrated", null],
  ["heading", null],
  ["headTracker", null],
  ["heartBeat", null],
  ["heartRate", null],
  ["hingeAngle", null],
  ["light", null],
  ["linearAcceleration", null],
  ["lowLatencyOffbodyDetect", null],
  ["magnetometer", null],
  ["magnetometerUncalibrated", null],
  ["motionDetect", null],
  ["orientationDeprecated", null],
  ["pos6DegreeFreedom", null],
  ["barometer", null],
  ["proximity", null],
  ["relativeHumidity", null],
  ["rotationVector", null],
  ["significantMotion", null],
  ["stationaryDetect", null],
  ["stepCounter", null],
  ["stepDetector", null],
  ["temperatureDeprecated", null],
]);

function createSensorObservable(sensorType) {
  return new Observable(function subscribe(observer) {
  // return Observable.create(function subscribe(observer) {
    this.isSensorAvailable = false;
    this.isSensorTrigger = false;

    this.unsubscribeCallback = () => {
      if (!this.isSensorAvailable) return;
      if (eventEmitterSubscription.get(sensorType)) eventEmitterSubscription.get(sensorType).remove();
      // stop the sensor
      if(this.isSensorTrigger){
        RNSensors.cancelTrigger(sensorType);
      }else{
        RNSensors.stop(sensorType);
      }
      
    };

    RNSensors.isAvailable(sensorType)
      .then(
      () => {
        this.isSensorAvailable = true;

        const emitter = new NativeEventEmitter(nativeApis.get(sensorType));

        eventEmitterSubscription.set(
          sensorType,
          emitter.addListener(listenerKeys.get(sensorType), (data) => {
            observer.next(data);
          })
        );
        RNSensors.isTriggerSensor(sensorType).then(
          ()=>{
            this.isSensorTrigger = true;
            RNSensors.startTrigger(sensorType);
          },
          () => {
            // Start the sensor manager
            RNSensors.start(sensorType);
          }
        )
        
      
      },
      () => {
        observer.error(`Sensor ${sensorType} is not available`);
      }
    );

    return this.unsubscribeCallback;
  }).pipe(makeSingleton());
}

// As we only have one sensor we need to share it between the different consumers
function makeSingleton() {
//   return (source) => source.pipe(publish(), refCount()); depricated
  return (source) => source.pipe(share({ resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
}

// const accelerometer = createSensorObservable("accelerometer");
// const gyroscope = createSensorObservable("gyroscope");
// const magnetometer = createSensorObservable("magnetometer");
// const barometer = createSensorObservable("barometer");
// const orientation = createSensorObservable("orientation");
// const gravity = createSensorObservable("gravity");

const accelerometer = createSensorObservable("accelerometer");
const accelerometerLimitedAxes = createSensorObservable("accelerometerLimitedAxes");
const accelerometerLimitedAxesUncalibrated = createSensorObservable("accelerometerLimitedAxesUncalibrated");
const accelerometerUncalibrated = createSensorObservable("accelerometerUncalibrated");
const all = createSensorObservable("all");
const ambientTemperature = createSensorObservable("ambientTemperature");
const privateBase = createSensorObservable("privateBase");
const gameRotationVector = createSensorObservable("gameRotationVector");
const geomagneticRotation = createSensorObservable("geomagneticRotation");
const gravity = createSensorObservable("gravity");
const gyroscope = createSensorObservable("gyroscope");
const gyroscopeLimitedAxes = createSensorObservable("gyroscopeLimitedAxes");
const gyroscopeLimitedAxesUncalibrated = createSensorObservable("gyroscopeLimitedAxesUncalibrated");
const gyroscopeUncalibrated = createSensorObservable("gyroscopeUncalibrated");
const heading = createSensorObservable("heading");
const headTracker = createSensorObservable("headTracker");
const heartBeat = createSensorObservable("heartBeat");
const heartRate = createSensorObservable("heartRate");
const hingeAngle = createSensorObservable("hingeAngle");
const light = createSensorObservable("light");
const linearAcceleration = createSensorObservable("linearAcceleration");
const lowLatencyOffbodyDetect = createSensorObservable("lowLatencyOffbodyDetect");
const magnetometer = createSensorObservable("magnetometer");
const magnetometerUncalibrated = createSensorObservable("magnetometerUncalibrated");
const motionDetect = createSensorObservable("motionDetect");
const orientationDeprecated = createSensorObservable("orientationDeprecated");
const pos6DegreeFreedom = createSensorObservable("pos6DegreeFreedom");
const barometer = createSensorObservable("barometer");
const proximity = createSensorObservable("proximity");
const relativeHumidity = createSensorObservable("relativeHumidity");
const rotationVector = createSensorObservable("rotationVector");
const significantMotion = createSensorObservable("significantMotion");
const stationaryDetect = createSensorObservable("stationaryDetect");
const stepCounter = createSensorObservable("stepCounter");
const stepDetector = createSensorObservable("stepDetector");
const temperatureDeprecated = createSensorObservable("temperatureDeprecated");

export default {
  // gyroscope,
  // accelerometer,
  // magnetometer,
  // barometer,
  // orientation,
  // gravity,
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
};