import { BehaviorSubject, Observable, Observer, Subscribable, buffer, bufferCount, combineLatest, interval, of, share, window, windowCount, windowTime, windowToggle, windowWhen, withLatestFrom  } from "rxjs";
import { GeolocationService } from "../sensors/gps-service";
import { start } from "../services/sensors/rnsensors";
import SensorsService from "../sensors/sensors-service";
import { SensorKey } from "../services/sensors/SensorKey";
import { GeolocationResponse } from "@react-native-community/geolocation";
import { getRelativeGeoCoordinates, getRelativeGlobalCoordinates } from "../static-maps/utils";
import { WifiService } from "../sensors/wifi-service";
import { UserSpatialDataStreamService } from "./UserSpatialDataStreamService";



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
    private isStreaming:boolean
    private subscription:any

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

    subscribe(observer?: Partial<Observer<UserIndoorPosition  | null>> | ((value: UserIndoorPosition  | null) => void) | undefined){
        const unsubscribe = this.subject.subscribe(observer);
        return unsubscribe;
    }

    setBuildingBoundaryBox(buildingBoundaryBox:any){
        this.buildingBoundaryBox = buildingBoundaryBox
    }


    async startStream() {
        if(this.isStreaming){
            return;
        }
        await UserSpatialDataStreamService.getInstance().startStream();
        // this.subscription = UserSpatialDataStreamService.getInstance().subscribe({
        //     complete:() => {},
        //     next:() => {},
        //     error:()=> {}
        // })
        // this.isStreaming = true;
    }


    

    stopStream(){
        this.subscription?.unsubscribe();
        this.subject?.complete();        
        this.isStreaming = false;
    }
    
}
  
  

  
  
  
