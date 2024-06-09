import { NativeEventEmitter, NativeModules } from "react-native";
import { Observable, Observer } from "rxjs";
import { share } from "rxjs/operators";
import { SensorKey, sensorKeys } from "../services/sensors/SensorKey";

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

const nativeApis = new Map([
    [SensorKey.ACCELEROMETER,AccNative],
    [SensorKey.ACCELEROMETERLIMITEDAXES,AccLimNative],
    [SensorKey.ACCELEROMETERLIMITEDAXESUNCALIBRATED,AccLimUncaliNative],
    [SensorKey.ACCELEROMETERUNCALIBRATED,AccUncaliNative],
    [SensorKey.ALL,AllNative],
    [SensorKey.AMBIENTTEMPERATURE,AmbientTempNative],
    [SensorKey.PRIVATEBASE,PrivateNative],
    [SensorKey.GAMEROTATIONVECTOR,GameRotationVecNative],
    [SensorKey.GEOMAGNETICROTATION,GeomagnNative],
    [SensorKey.GRAVITY,GravNative],
    [SensorKey.GYROSCOPE,GyroNative],
    [SensorKey.GYROSCOPELIMITEDAXES,GyroLimNative],
    [SensorKey.GYROSCOPELIMITEDAXESUNCALIBRATED,GyroLimUncaliNative],
    [SensorKey.GYROSCOPEUNCALIBRATED,GyroUncaliNative],
    [SensorKey.HEADING,headingNative],
    [SensorKey.HEADTRACKER,headingTrackerNative],
    [SensorKey.HEARTBEAT,heartBeatNative],
    [SensorKey.HEARTRATE,heartRateNative],
    [SensorKey.HINGEANGLE,hingeAngleNative],
    [SensorKey.LIGHT,lightNative],
    [SensorKey.LINEARACCELERATION,linearAccNative],
    [SensorKey.LOWLATENCYOFFBODYDETECT,offBodyNative],
    [SensorKey.MAGNETOMETER,MagnNative],
    [SensorKey.MAGNETOMETERUNCALIBRATED,MagnUncalibNative],
    [SensorKey.MOTIONDETECT,MotionNative],
    [SensorKey.ORIENTATIONDEPRECATED,OrientDepNative],
    [SensorKey.POS6DEGREEFREEDOM,Pos6Native],
    [SensorKey.BAROMETER,BarNative],
    [SensorKey.PROXIMITY,proxNative],
    [SensorKey.RELATIVEHUMIDITY,humidNavite],
    [SensorKey.ROTATIONVECTOR,OrientNative],
    [SensorKey.SIGNIFICANTMOTION,signMotionNative],
    [SensorKey.STATIONARYDETECT,stationNative],
    [SensorKey.STEPCOUNTER,stepCounterNative],
    [SensorKey.STEPDETECTOR,stepDetectorNative],
    [SensorKey.TEMPERATUREDEPRECATED,tempDepNative],
]);

const listenerKeys = new Map([
    [SensorKey.ACCELEROMETER,"RNSensorsAccelerometer"],
    [SensorKey.ACCELEROMETERLIMITEDAXES,"RNSensorsAccelerometerLimitedAxes"],
    [SensorKey.ACCELEROMETERLIMITEDAXESUNCALIBRATED,"RNSensorsAccelerometerLimitedAxesUncalibrated"],
    [SensorKey.ACCELEROMETERUNCALIBRATED,"RNSensorsAccelerometerUncalibrated"],
    [SensorKey.ALL,"RNSensorsAll"],
    [SensorKey.AMBIENTTEMPERATURE,"RNSensorsAmbientTemperature"],
    [SensorKey.PRIVATEBASE,"RNSensorsPrivateBase"],
    [SensorKey.GAMEROTATIONVECTOR,"RNSensorsGameRotationVector"],
    [SensorKey.GEOMAGNETICROTATION,"RNSensorsGeomagneticRotation"],
    [SensorKey.GRAVITY,"RNSensorsGravity"],
    [SensorKey.GYROSCOPE,"RNSensorsGyroscope"],
    [SensorKey.GYROSCOPELIMITEDAXES,"RNSensorsGyroscopeLimitedAxes"],
    [SensorKey.GYROSCOPELIMITEDAXESUNCALIBRATED,"RNSensorsGyroscopeLimitedAxesUncalibrated"],
    [SensorKey.GYROSCOPEUNCALIBRATED,"RNSensorsGyroscopeUncalibrated"],
    [SensorKey.HEADING,"RNSensorsHeading"],
    [SensorKey.HEADTRACKER,"RNSensorsHeadTracker"],
    [SensorKey.HEARTBEAT,"RNSensorsHeartBeat"],
    [SensorKey.HEARTRATE,"RNSensorsHeartRate"],
    [SensorKey.HINGEANGLE,"RNSensorsHingeAngle"],
    [SensorKey.LIGHT,"RNSensorsLight"],
    [SensorKey.LINEARACCELERATION,"RNSensorsLinearAcceleration"],
    [SensorKey.LOWLATENCYOFFBODYDETECT,"RNSensorsLowLatencyOffbodyDetect"],
    [SensorKey.MAGNETOMETER,"RNSensorsMagnetometer"],
    [SensorKey.MAGNETOMETERUNCALIBRATED,"RNSensorsMagnetometerUncalibrated"],
    [SensorKey.MOTIONDETECT,"RNSensorsMotionDetect"],
    [SensorKey.ORIENTATIONDEPRECATED,"RNSensorsOrientationDeprecated"],
    [SensorKey.POS6DEGREEFREEDOM,"RNSensorsPos6DegreeFreedom"],
    [SensorKey.BAROMETER,"RNSensorsBarometer"],
    [SensorKey.PROXIMITY,"RNSensorsProximity"],
    [SensorKey.RELATIVEHUMIDITY,"RNSensorsRelativeHumidity"],
    [SensorKey.ROTATIONVECTOR,"RNSensorsRotationVector"],
    [SensorKey.SIGNIFICANTMOTION,"RNSensorsSignificantMotion"],
    [SensorKey.STATIONARYDETECT,"RNSensorsStationaryDetect"],
    [SensorKey.STEPCOUNTER,"RNSensorsStepCounter"],
    [SensorKey.STEPDETECTOR,"RNSensorsStepDetector"],
    [SensorKey.TEMPERATUREDEPRECATED,"RNSensorsTemperatureDeprecated"],
]);

const eventEmitterSubscription = new Map<SensorKey,any>([
    [SensorKey.ACCELEROMETER, null],
    [SensorKey.ACCELEROMETERLIMITEDAXES, null],
    [SensorKey.ACCELEROMETERLIMITEDAXESUNCALIBRATED, null],
    [SensorKey.ACCELEROMETERUNCALIBRATED, null],
    [SensorKey.ALL, null],
    [SensorKey.AMBIENTTEMPERATURE, null],
    [SensorKey.PRIVATEBASE, null],
    [SensorKey.GAMEROTATIONVECTOR, null],
    [SensorKey.GEOMAGNETICROTATION, null],
    [SensorKey.GRAVITY, null],
    [SensorKey.GYROSCOPE, null],
    [SensorKey.GYROSCOPELIMITEDAXES, null],
    [SensorKey.GYROSCOPELIMITEDAXESUNCALIBRATED, null],
    [SensorKey.GYROSCOPEUNCALIBRATED, null],
    [SensorKey.HEADING, null],
    [SensorKey.HEADTRACKER, null],
    [SensorKey.HEARTBEAT, null],
    [SensorKey.HEARTRATE, null],
    [SensorKey.HINGEANGLE, null],
    [SensorKey.LIGHT, null],
    [SensorKey.LINEARACCELERATION, null],
    [SensorKey.LOWLATENCYOFFBODYDETECT, null],
    [SensorKey.MAGNETOMETER, null],
    [SensorKey.MAGNETOMETERUNCALIBRATED, null],
    [SensorKey.MOTIONDETECT, null],
    [SensorKey.ORIENTATIONDEPRECATED, null],
    [SensorKey.POS6DEGREEFREEDOM, null],
    [SensorKey.BAROMETER, null],
    [SensorKey.PROXIMITY, null],
    [SensorKey.RELATIVEHUMIDITY, null],
    [SensorKey.ROTATIONVECTOR, null],
    [SensorKey.SIGNIFICANTMOTION, null],
    [SensorKey.STATIONARYDETECT, null],
    [SensorKey.STEPCOUNTER, null],
    [SensorKey.STEPDETECTOR, null],
    [SensorKey.TEMPERATUREDEPRECATED, null],
]);

class SensorAPI {
    private sensorKey:SensorKey;
    private sensor: any;
    constructor(sensorKey:SensorKey) {
        this.sensorKey = sensorKey;
        this.sensor = nativeApis.get(this.sensorKey);
    }
    getSensor(){
        return this.sensor
    }

    start() {
        this.sensor.startUpdates();
    } 

    stop() {
        this.sensor.stopUpdates();
    }
      
    setLogLevelForType(level: any) {
        this.sensor.setLogLevel(level);
    }
      
    getSensorInformation(){
        const promise = this.sensor.getSensorInformation();
        return promise;
    }
      
    isSensorAvailable(){
        const promise = this.sensor.isSensorAvailable();
        return promise;
    }
      
    setUpdateInterval(updateInterval:number){
        this.sensor.setUpdateInterval(updateInterval);
    }
      
    setUpdateMaxReportLatencyUs(maxLatency:number){
        this.sensor.setUpdateMaxReportLatencyUs(maxLatency);
    }
      
    setLogLevel(level:number){
        this.sensor.setLogLevel(level);
    }
      
    setNumTriggers(numTriggers:number){
        this.sensor.setNumTriggers(numTriggers);
    }
      
    setHandler(numHandleType:number){
        this.sensor.setHandler(numHandleType);
    }
      
    flushSensor(){
        this.sensor.flushSensor();
    }
      
    startTrigger(){
        this.sensor.startTrigger();
    }
      
    cancelTrigger(){
        this.sensor.cancelTrigger();
    }
      
    startDynamicSensor(){
        this.sensor.startDynamicSensor();
    }
      
    stopDynamicSensor(){
        this.sensor.stopDynamicSensor();
    }
      
    startUpdates(){
        this.sensor.startUpdates();
    }
    
    stopUpdate(){
        this.sensor.stopUpdate();
    }
      
    stopUpdates(){
        this.sensor.stopUpdates();
    }
    
    isTriggerSensor(){
        const promise = this.sensor.isTriggerSensor();
        return promise;
    }

    isAvailable(){
        const promise = this.sensor.isAvailable();
        return promise;
    }
      
    addListener(){
        this.sensor.addListener();
    }
      
    removeListeners(){
        this.sensor.removeListeners();
    }
    
}

class SensorSubscription {
    private sensorKey:SensorKey;
    private subscription:Observable<any>;
    private sensorApi: SensorAPI
    private emitter: NativeEventEmitter;
    private sensorInfo: string | null;

    constructor(sensorKey:SensorKey) {
        this.sensorKey = sensorKey;
        this.sensorApi = new SensorAPI(sensorKey);
        this.subscription = this._createObservable();
        this.emitter = new NativeEventEmitter(this.sensorApi.getSensor())
        this.sensorInfo = this._getSensorInfo();
        
    }  

    _createObservable(){
        return new Observable((observer) => {
            const listenKey = listenerKeys.get(this.sensorKey);
            if (listenKey){
                eventEmitterSubscription.set(
                    this.sensorKey,
                    this.emitter.addListener(listenKey, (data) => {
                        observer.next(data);
                    })
                );
                
            }  
            return function unsubscribe() {
                
            };
        }).pipe(share({ resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
    }

    _getSensorInfo(){
        return this.sensorApi.getSensorInformation();
    }

    api(){
        return this.sensorApi;
    }

    getSensorInfo(){
        return this.sensorInfo;
    }

  
    subscribe(observer: Partial<Observer<any>> | ((value: any) => void) | undefined){
        if (this.subscription){
            const unsub = this.subscription.subscribe(observer);
            return unsub;
        }else{
            console.warn('SENSOR IS NOT INITIALIZED')
        }
    }
    getObservable(){
        return this.subscription;
    }

    startSensor(){
        this.sensorApi.start()
    }
    stopSensor(){
        this.sensorApi.stop()
    }
    configSensorInterval(interval:number){
        this.sensorApi.setUpdateInterval(interval)
    }
}


export class SensorsService {
    private static instance: SensorsService;
    private sensors: Map<SensorKey, SensorSubscription> = new Map();
    private availableSensors: Map<SensorKey, boolean> = new Map();
    private initialInterval:number = 99999;
    private constructor() {}  
  
    static getInstance(): SensorsService {
      if (!SensorsService.instance) {
        SensorsService.instance = new SensorsService();
         
      }
      return SensorsService.instance;
    }  

    _sensor(sensorKey: SensorKey) {
        if (this.availableSensors.has(sensorKey)) {
            return this.sensors.get(sensorKey);
        } 
    }
    async sensor(sensorKey: SensorKey) {
        try{
            if (this.availableSensors.has(sensorKey)) {
                return this.sensors.get(sensorKey);
            } else {
                const sensorApi = new SensorAPI(sensorKey);
                const isAvailable = await sensorApi.isSensorAvailable();
                this.availableSensors.set(sensorKey, isAvailable);
                if (isAvailable) {
                    sensorApi.setUpdateInterval(this.initialInterval)
                    this.sensors.set(sensorKey, new SensorSubscription(sensorKey));
                    const sub = this.sensors.get(sensorKey);
                    return sub;
                }
            }
        }catch(err){

        }

    }
  }


export default SensorsService;

  
  