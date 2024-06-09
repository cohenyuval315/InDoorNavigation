import { BehaviorSubject, Observable, Observer, Subscribable, interval, of, share, withLatestFrom  } from "rxjs";
import { Geolocation } from "../sensors/gps-service";
import { start } from "../services/sensors/rnsensors";
import SensorsService from "../sensors/sensors-service";
import { SensorKey } from "../services/sensors/SensorKey";
import { GeolocationResponse } from "@react-native-community/geolocation";
import { getRelativeGeoCoordinates, getRelativeGlobalCoordinates } from "../static-maps/utils";



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
export class UserIndoorPositionService {
    private static instance: UserIndoorPositionService;
    private subject:BehaviorSubject<UserIndoorPosition  | null>;
    private buildingBoundaryBox:any;
    private geolocationStream: any
    private isStreaming:boolean

    private constructor() {
        this.subject = new BehaviorSubject<UserIndoorPosition  | null>(null);
        this.isStreaming = false;
    }  
    
    static getInstance(): UserIndoorPositionService {
        if (!UserIndoorPositionService.instance) {
            UserIndoorPositionService.instance = new UserIndoorPositionService();
            
        }
        return UserIndoorPositionService.instance;
    }  

    setBuildingBoundary(buildingBoundaryBox:any){
        this.buildingBoundaryBox = buildingBoundaryBox;
    }

    calculateInitialPosition(buildingBoundaryBox:any){ 
        
    }

    setConfig(){
        const gpsStream = Geolocation.getInstance().getObservable();
        // SensorsService.getInstance().sensor(SensorKey.ACCELEROMETER)
        // SensorsService.getInstance().sensor(SensorKey.MAGNETOMETER)
        // SensorsService.getInstance().sensor(SensorKey.ROTATIONVECTOR)
        // SensorsService.getInstance().sensor(SensorKey.GYROSCOPE)
        // SensorsService.getInstance().sensor(SensorKey.STEPDETECTOR)
        // SensorsService.getInstance().sensor(SensorKey.LINEARACCELERATION)
        // SensorsService.getInstance().sensor(SensorKey.GRAVITY)
        // SensorsService.getInstance().sensor(SensorKey.MAGNETOMETERUNCALIBRATED)
        // SensorsService.getInstance().sensor(SensorKey.GYROSCOPEUNCALIBRATED)

    }

    subscribe(observer?: Partial<Observer<UserIndoorPosition  | null>> | ((value: UserIndoorPosition  | null) => void) | undefined){
        const unsubscribe = this.subject.subscribe(observer);
        return unsubscribe;
    }

    private calculateNextPosition(geoData: any, magnetoData: any, accelData: any[]): UserIndoorPosition {
        // Replace this with actual calculation logic
        const avgAccel = accelData.reduce((acc, val) => ({
            x: acc.x + val.x,
            y: acc.y + val.y,
            z: acc.z + val.z
        }), { x: 0, y: 0, z: 0 });

        return {
            x: (geoData.x + magnetoData.x + avgAccel.x) / 3,
            y: (geoData.y + magnetoData.y + avgAccel.y) / 3,
            z: (geoData.z + magnetoData.z + avgAccel.z) / 3,
            floor: geoData.floor // Example placeholder
        };
    }

    private calculateNextPositionGPS(value:GeolocationResponse | null){
        if (value === null) {
            return { x: 0, y: 0, z: 0, floor: 0 };
        }
        const pos = {
            latitude:value.coords.latitude,
            longitude:value.coords.longitude,
        }
        const {x,y} = getRelativeGeoCoordinates(this.buildingBoundaryBox,pos);
        return {
            x:x,
            y:y,
            z:0,
            floor:0,
        }
    }

    startStream() {
        if(this.isStreaming){
            return;
        }
        Geolocation.getInstance().startStream({
            distanceFilter:0,
            enableHighAccuracy:true,
            maximumAge:0,
        })
        this.geolocationStream = Geolocation.getInstance().subscribeGeoLocation({
            next:(value) => {
                if(value){
                    const position = this.calculateNextPositionGPS(value);
                    this.subject.next(position);       
                }
            }
        })
        
        // this.geolocationStream = Geolocation.getInstance().getObservable().pipe(share()).subscribe({
        //     next:(value) => {
        //         if(value){
        //             console.log("NEXT VAL:",value)
        //         }else{
        //             console.log("vvvv")
        //         }
                
        //         const position = this.calculateNextPositionGPS(value);
        //         this.subject.next(position);
        //     }
        // })
        
        // const magnetometer$ = Magnetometer.getInstance().magnetometer$.pipe(share()); // Share the execution among all subscribers
        // const accelerometer$ = Accelerometer.getInstance().accelerometer$.pipe(
        //     bufferCount(5, 1), // Buffer the last 5 values
        //     share() // Share the execution among all subscribers
        // );

        // const combined = geolocation.pipe(
        //     withLatestFrom(magnetometer$, accelerometer$),
        //     share() // Share the combined execution among all subscribers
        // );

        // combined.subscribe(([geoData, magnetoData, accelData]) => {
        //     const newPosition: UserIndoorPosition = this.calculateNextPosition(geoData, magnetoData, accelData);
        //     this.subject.next(newPosition);
        // });
    }

    

    stopSubject(){
        this.geolocationStream.unsubscribe()
        Geolocation.getInstance().startStream({
            enableHighAccuracy:true,
            maximumAge:0,
        })        
        this.subject.complete();        
        this.isStreaming = false;
    }
    
}
  
  

  
  
  
