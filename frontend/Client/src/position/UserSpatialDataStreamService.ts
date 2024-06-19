import { BehaviorSubject, Observable, Observer, Subject, Subscribable, buffer, bufferCount, bufferTime, catchError, combineLatest, interval, map, merge, of, share, tap, window, windowCount, windowTime, windowToggle, windowWhen, withLatestFrom  } from "rxjs";
import { GeolocationService } from "../sensors/gps-service";
import { start } from "../services/sensors/rnsensors";
import SensorsService from "../sensors/sensors-service";
import { SensorKey } from "../services/sensors/SensorKey";
import { GeolocationResponse } from "@react-native-community/geolocation";
import { getRelativeGeoCoordinates, getRelativeGlobalCoordinates } from "../static-maps/utils";
import { WifiService } from "../sensors/wifi-service";



// sensor(SensorKey.LIGHT)
// sensor(SensorKey.ACCELEROMETER)
// sensor(SensorKey.GRAVITY)
// sensor(SensorKey.GYROSCOPE)
// sensor(SensorKey.GYROSCOPEUNCALIBRATED)
// sensor(SensorKey.LINEARACCELERATION)
// sensor(SensorKey.MAGNETOMETER)
// sensor(SensorKey.MAGNETOMETERUNCALIBRATED)
// sensor(SensorKey.MOTIONDETECT)
// sensor(SensorKey.ORIENTATIONDEPRECATED)
// sensor(SensorKey.ROTATIONVECTOR)
//sensor(SensorKey.STEPCOUNTER)
//sensor(SensorKey.STEPDETECTOR)


// available but doenst work
// sensor(SensorKey.PROXIMITY)
// sensor(SensorKey.SIGNIFICANTMOTION)


// Not avialble but should be:
// ambientTemperature doesnt work - ON-CHANGE SENSOR
// significant motion N= doesnt work - one-shot
export interface UserIndoorPosition {
    x:number,
    y:number,
    z:number,
    floor:number,
}

export interface UserSpatialData { 
    gravity?:object,
    linear?:object,
    stepdetector?:object,
    accelerometer?:object,
    magnetometer?:object,
    rotationVector?:object,
    gyroscope?:object,
    geolocation?:object,
    wifi?:object,
}

export interface StreamObject {
    stream:string,
    timestamp:Date,
    data:any,
}

export class UserSpatialDataStreamService {
    private static instance: UserSpatialDataStreamService;
    private subject:Subject<UserSpatialData  | null | void>;
    private buildingBoundaryBox:any;
    private isStreaming:boolean
    private isStreamingWifi:boolean
    private sensorInterval = 100;
    private streamBufferInterval = 100;
    private geoLocationTImeout = 1000;
    private accelerometerBufferSize = 5;
    private accelerometerBufferEvery = 1;
    private stream: Observable<UserSpatialData | null | void> | null;
    private geolocationStream: any
    private wifiStream: any
    private sensorsStreams : any
    private sensors: any;

    private subscription:any

    private constructor() {
        this.subject = new Subject<UserSpatialData  | null | void>();
        this.isStreaming = false;
        this.isStreamingWifi = false;
        this.stream = null; 
    }  
    
    static getInstance(): UserSpatialDataStreamService {
        if (!UserSpatialDataStreamService.instance) {
            UserSpatialDataStreamService.instance = new UserSpatialDataStreamService();
            
        }
        return UserSpatialDataStreamService.instance;
    }  

    setBuildingBoundary(area:any){
        this.buildingBoundaryBox = area
    }

    streamGPS(){    
        this.geolocationStream = GeolocationService.getInstance().getObservable().pipe(share(),map((data) => this.toStreamObject("geolocation",data)));
    }

    streamWIFI(){
        this.wifiStream = WifiService.getInstance().getObservable().pipe(share(),map((data) => this.toStreamObject("wifi",data)))
    }

    streamSensors(){
        const {gravity,
            linear,
            stepdetector,
            accelerometer,
            magnetometer,
            rotationVector,
            gyroscope} = this.sensors;




        this.sensorsStreams = {
            gravity:gravity?.getObservable().pipe(share(),map((data) => this.toStreamObject("gravity",data))), 
            linear:linear?.getObservable().pipe(share(),map((data) => this.toStreamObject("linear",data))), 
            stepdetector:stepdetector?.getObservable().pipe(share(),map((data) => this.toStreamObject("stepdetector",data))),  
            accelerometer:accelerometer?.getObservable().pipe(bufferCount(this.accelerometerBufferSize,this.accelerometerBufferEvery),share(),map((data) => this.toStreamObject("accelerometer",data))), 
            magnetometer:magnetometer?.getObservable().pipe(share(),map((data) => this.toStreamObject("magnetometer",data))), 
            rotationVector:rotationVector?.getObservable().pipe(share(),map((data) => this.toStreamObject("rotationVector",data))), 
            gyroscope:gyroscope?.getObservable().pipe(share(),map((data) => this.toStreamObject("gyroscope",data))), 
        }
    }
    toStreamObject(streamName:string,data:any){
        return {
            stream:streamName,
            timestamp:new Date(),
            data:data,
        }
    }

    async buildSensorStreams(){
        const stepdetector = await SensorsService.getInstance().sensor(SensorKey.STEPDETECTOR)
        const linear = await SensorsService.getInstance().sensor(SensorKey.LINEARACCELERATION)
        const gravity = await SensorsService.getInstance().sensor(SensorKey.GRAVITY)
        const gyroscope = await  SensorsService.getInstance().sensor(SensorKey.GYROSCOPE)
        const rotationVector = await SensorsService.getInstance().sensor(SensorKey.ROTATIONVECTOR)
        const magnetometer = await SensorsService.getInstance().sensor(SensorKey.MAGNETOMETER)
        const accelerometer = await SensorsService.getInstance().sensor(SensorKey.ACCELEROMETER)

        
        this.sensors = {
            gravity:gravity,
            linear:linear,
            stepdetector:stepdetector,
            accelerometer:accelerometer,
            magnetometer:magnetometer,
            rotationVector:rotationVector,
            gyroscope:gyroscope,
        }
      
    }
    startGPS(){
        GeolocationService.getInstance().startStream({
            distanceFilter:0,
            enableHighAccuracy:true,
            maximumAge:0,
            timeout:this.geoLocationTImeout,
            useSignificantChanges:false,
        },false)
    }

    startWifi() { 
        WifiService.getInstance().startStream();
    }

    startSensors(){
        const {gravity,
        linear,
        stepdetector,
        accelerometer,
        magnetometer,
        rotationVector,
        gyroscope} = this.sensors;

        accelerometer?.configSensorInterval(this.sensorInterval);
        accelerometer?.startSensor();
        
        magnetometer?.configSensorInterval(this.sensorInterval);
        magnetometer?.startSensor();
        
        rotationVector?.configSensorInterval(this.sensorInterval);
        rotationVector?.startSensor();
        
        gyroscope?.configSensorInterval(this.sensorInterval);
        gyroscope?.startSensor();

        stepdetector?.configSensorInterval(this.sensorInterval);
        stepdetector?.startSensor();

        linear?.configSensorInterval(this.sensorInterval);
        linear?.startSensor();
        
        gravity?.configSensorInterval(this.sensorInterval);
        gravity?.startSensor();        
        
    }
    stopSensors(){
        const {gravity,
            linear,
            stepdetector,
            accelerometer,
            magnetometer,
            rotationVector,
            gyroscope} = this.sensors;

            gravity?.stopSensor()
            linear?.stopSensor()
            stepdetector?.stopSensor()
            accelerometer?.stopSensor()
            magnetometer?.stopSensor()
            rotationVector?.stopSensor()
            gyroscope?.stopSensor()
    }


    subscribe(observer?: Partial<Observer<UserSpatialData  | null | void>> | ((value: UserSpatialData  | null | void) => void) | undefined){
        const unsubscribe = this.subject.subscribe(observer);
        return unsubscribe;
    }

    getObservable(){
        return this.subject.asObservable();
    }

    async createStream(){
        this.stream = await this._createMergeStream();
        return this.stream
    }

    async startStream() {
        if(this.isStreaming){
            return;
        }
        await this.buildSensorStreams();
        this.startSensors();
        this.startGPS();
        this.startWifi();
        
        
        this.streamSensors();
        this.streamWIFI();
        this.streamGPS();
        
        const stream = await this.createStream();
        
        this.subscription = stream.subscribe(({
            next:(value) => {
                this.subject.next(value);
            },
            error:(error) => {
                console.log("eerror in subject",error)
            },
            complete:() => {
                console.log("COMPELTE");
            },
            
        }))
        this.isStreaming = true;
    }

    async _createMergeStream(){
        const {
            gravity,
            linear,
            stepdetector,
            accelerometer,
            magnetometer,
            rotationVector,
            gyroscope} = this.sensorsStreams;
        
        // gravity.subscribe({
        //     next:(data:any) => {
        //         console.log("gravdata:", Object.keys(data))
        //     }
        // })

        const combinedStream = merge(
            gravity,
            linear,
            stepdetector,
            accelerometer,
            magnetometer,
            rotationVector,
            gyroscope,
            this.geolocationStream,
            this.wifiStream
            ).pipe(
                share(),
                bufferTime(this.streamBufferInterval), 
                // tap(buffer => {
                //     console.log("Buffered values:", buffer);
                // }),
                map((buffer) => {
                    const latestValues = buffer.reduce((acc, value) => {
                        const { stream,timestamp, data} = value;
                        if (stream && timestamp !== undefined && data !== undefined) {
                            acc[stream] = { timestamp, data }; // or just acc[stream] = value if you need all properties
                        }
                        return acc;
                    }, {});
                    
                    return {
                        gravity:latestValues?.gravity,
                        linear:latestValues?.linear,
                        stepdetector:latestValues?.stepdetector,
                        accelerometer:latestValues?.accelerometer,
                        magnetometer:latestValues?.magnetometer,
                        rotationVector:latestValues?.rotationVector,
                        gyroscope:latestValues?.gyroscope,
                        geolocation:latestValues?.geolocation,
                        wifi:latestValues?.wifi,
                    };
                })               
            )
        return combinedStream;
    }
    

    stopStream(){
        // this.subscription?.unsubscribe();
        // if(this.geolocationStream){

        // }
        // this.geolocationStream?.unsubscribe();
        this.wifiStream?.unsubscribe();
        this.subject?.complete();        
        this.isStreaming = false;
    }
    
}
  
  

  
  
  
