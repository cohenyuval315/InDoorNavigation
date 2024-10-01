import { BehaviorSubject, Observable, Subject, buffer, bufferCount, bufferTime, catchError, combineLatest, interval, map, merge, of, share, tap, timestamp, window, windowCount, windowTime, windowToggle, windowWhen, withLatestFrom  } from "rxjs";
import { GeolocationService } from "./GpsService";
import SensorsService, { SensorKey, sensorKeys } from "./SensorsService";
import { WifiService } from "./WifiService";
import { UserSpatialInputData } from "../position/core/common/UserSpatialInputData";


//@ts-ignore
import {Observer} from  "rxjs";




interface UserIndoorPosition {
    x:number,
    y:number,
    z:number,
    floor:number,
}

interface StreamObject {
    stream:string,
    timestamp:Date,
    data:any,
}

export class UserSpatialDataStreamService {
    private static instance: UserSpatialDataStreamService;
    private subject:Subject<UserSpatialInputData  | null | void>;
    private isStreaming:boolean
    private streamBufferInterval = 100;
    private geoLocationTImeout = 1000;
    private stream: Observable<UserSpatialInputData | null | void> | null;
    private geolocationStream: any
    private wifiStream: any
    private sensorsStreams : any
    private sensors: any;
    private subscription: any;

    private sensorsIntervals = {
        [SensorKey.ACCELEROMETER]:100,
        [SensorKey.MAGNETOMETER]:100,
        [SensorKey.MAGNETOMETERUNCALIBRATED]:100,
        [SensorKey.GYROSCOPE]:100,
        [WifiService.getString()]:30 * 60,
        [GeolocationService.getString()]:100,        
    }

    private sensorsBuffers = {
        [SensorKey.ACCELEROMETER]:5,
        [SensorKey.MAGNETOMETER]:5,
        [SensorKey.MAGNETOMETERUNCALIBRATED]:5,
        [SensorKey.GYROSCOPE]:5,
        [WifiService.getString()]:1000,
        [GeolocationService.getString()]:1000,
    }

    private sensorsTTL = {
        [SensorKey.ACCELEROMETER]:1100000,
        [SensorKey.MAGNETOMETER]:1000,
        [SensorKey.MAGNETOMETERUNCALIBRATED]:1000,
        [SensorKey.GYROSCOPE]:1000,
        [WifiService.getString()]:1000,
        [GeolocationService.getString()]:1000,
    }

    geolocationConfiguration = {
        distanceFilter:0,
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:this.geoLocationTImeout,
        useSignificantChanges:false,
    }

    private constructor() {
        this.subject = new Subject<UserSpatialInputData  | null | void>();
        this.isStreaming = false;
        this.stream = null; 
    }  
    

    async buildSensorStreams(){
        const gyroscope = await  SensorsService.getInstance().sensor(SensorKey.GYROSCOPE)
        const magnetometerUncalibrated = await SensorsService.getInstance().sensor(SensorKey.MAGNETOMETERUNCALIBRATED)
        const magnetometer = await SensorsService.getInstance().sensor(SensorKey.MAGNETOMETER)
        const accelerometer = await SensorsService.getInstance().sensor(SensorKey.ACCELEROMETER)

        this.sensors = {
            [SensorKey.ACCELEROMETER]:accelerometer,
            [SensorKey.MAGNETOMETER]:magnetometer,
            [SensorKey.GYROSCOPE]:gyroscope,
            [SensorKey.MAGNETOMETERUNCALIBRATED]:magnetometerUncalibrated
        }
    }

    getIsStreaming(){
        return this.isStreaming;
    }

    static getInstance(): UserSpatialDataStreamService {
        if (!UserSpatialDataStreamService.instance) {
            UserSpatialDataStreamService.instance = new UserSpatialDataStreamService();
        }
        return UserSpatialDataStreamService.instance;
    }  

    streamGPS(){    
        this.geolocationStream = GeolocationService.getInstance().getObservable().pipe(share(),map((data:any) => this.toStreamObject(
            GeolocationService.getString(),
            data
        )));
    }

    streamWIFI(){
        this.wifiStream = WifiService.getInstance().getObservable().pipe(share(),map((data:any) => this.toStreamObject(
            WifiService.getString(),
            data
        )))
    }

    streamSensors(){
        this.sensorsStreams = {};
        Object.keys(this.sensors).forEach(key => {
            const sensor = this.sensors[key];
            if (sensor && typeof sensor.getObservable === 'function') {
                const bufferSize = this.sensorsBuffers[key]; 
                const ttl = this.sensorsTTL[key];
                this.sensorsStreams[key] = sensor.getObservable()
                .pipe(
                    bufferCount(bufferSize),
                    share(),
                    map((data:any) => this.toStreamObject(key, data))
                );
            }
        });
    }


    toStreamObject(streamName:string,data:any){
        if(streamName === "geolocation"){
            // console.log("geo:",data);
        }
        return {
            stream:streamName,
            timestamp:new Date(),
            data:data,
        }
    }

    startGPS(){
        const geoService = GeolocationService.getInstance()
        geoService.startStream(this.geolocationConfiguration,true)
    }

    startWifi() { 
        const wifiService = WifiService.getInstance()
        wifiService.startStream();
    }

    startSensors(){
        const sensorKeys = Object.keys(this.sensors);
        sensorKeys.forEach(key => {
            const sensor = this.sensors[key];
            if (sensor && typeof sensor.configSensorInterval === 'function') {
                sensor.configSensorInterval(this.sensorsIntervals[key]);
                sensor.startSensor();     
            }
        });
    }

    stopSensors(){
        const sensorKeys = Object.keys(this.sensors);
        sensorKeys.forEach(key => {
            const sensor = this.sensors[key];
            if (sensor && typeof sensor.stopSensor === 'function') {
                sensor.stopSensor();
            }
        });
    }


    subscribe(observer?: Partial<Observer<UserSpatialInputData  | null | void>> | ((value: UserSpatialInputData  | null | void) => void) | undefined){
        const unsubscribe = this.subject.subscribe(observer);
        return unsubscribe;
    }

    getObservable(){
        return this.subject.asObservable();
    }


    async startStream() {
        if(this.isStreaming){
            return;
        }
        await this.buildSensorStreams();
        this.startSensors();
        this.startGPS();
        this.startWifi();
        
        this.streamWIFI();
        this.streamGPS();
        this.streamSensors();
        const stream = await this.createStream();
        
        this.subscription = stream.subscribe(({
            next:(value:any) => {
                this.subject.next(value);
            },
            error:(error:any) => {
                console.log("eerror in subject",error)
            },
            complete:() => {
                console.log("COMPELTE");
            },
        }))

        this.isStreaming = true;
    }


    async createStream(){
        this.stream = await this._createMergeStream();
        return this.stream
    }

    async _createMergeStream(){
        // const {
        //     accelerometer,
        //     magnetometer,
        //     gyroscope,
        //     magnetometerUncalibrated,
        // } = this.sensorsStreams;
        

        const combinedStream = merge(
            ...Object.values(this.sensorsStreams),
            this.geolocationStream,
            this.wifiStream
            ).pipe(
                share(),
                bufferTime(this.streamBufferInterval), 
                map((buffer:any) => {
                    const latestValues = buffer.reduce((acc:any, value:any) => {
                        const { stream,timestamp, data} = value;
                        if (stream && timestamp !== undefined && data !== undefined) {
                            acc[stream] = { 
                                timestamp, 
                                data 
                            }; // or just acc[stream] = value if you need all properties
                        }
                        return acc;
                    }, {});

                    const data:any = {
                        [GeolocationService.getString()]:latestValues?.geolocation,
                        [WifiService.getString()]:latestValues?.wifi,
                    };

                    Object.keys(this.sensors).forEach(key => {
                        data[key] = latestValues[key] || null;
                    });

                    return data;
                }),        
            )
        return combinedStream;
    }
    

    stopStream(){
        // this.subject.complete();        
        this.isStreaming = false;
        if(this.subscription){
            this.subscription()
        }
    }
    
}
  
  

  
  
  
