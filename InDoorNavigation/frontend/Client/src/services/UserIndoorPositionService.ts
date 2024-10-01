import { BehaviorSubject, Observable, } from "rxjs";
import {  UserSpatialDataStreamService } from "./UserSpatialDataStreamService";
import { MapEngine } from "../position/core/engine";
import mapEngine from "../position/core/boot";
import { UserSpatialState } from "../position/core/common/UserSpatialState";
import { BuildingMapData, BuildingMetaData } from "../position/core/common/BuildingMetaData";
import { UserSpatialInputData } from "../position/core/common/UserSpatialInputData";

//@ts-ignore
import {Observer } from "rxjs";



export class UserIndoorPositionService {
    private static instance: UserIndoorPositionService;
    private subject:BehaviorSubject<UserSpatialState  | null>;
    
    private isStreaming:boolean
    private subscription:any

    private engine: MapEngine
    private buildingMapData: BuildingMapData | null



    private constructor() {
        this.subject = new BehaviorSubject<UserSpatialState  | null>(null);
        this.isStreaming = false;
        this.buildingMapData = null;
        this.engine = mapEngine;
    }  
    
    static getInstance(): UserIndoorPositionService {
        if (!UserIndoorPositionService.instance) {
            UserIndoorPositionService.instance = new UserIndoorPositionService();
            
        }
        return UserIndoorPositionService.instance;
    }  

    subscribe(observer?: Partial<Observer<UserSpatialState  | null>> | ((value: UserSpatialState  | null) => void) | undefined){
        const unsubscribe = this.subject.subscribe(observer);
        return unsubscribe;
    }


    setBuildingData(buildingMapData: BuildingMapData){
        this.buildingMapData = buildingMapData;
    }
    

    async calculateUserPosition(data: UserSpatialInputData | null | void) {
        if (!data){
            console.log("no data skipping")
            return null;
        }
        if(!this.buildingMapData){
            console.log("no building data skipping")
            return null;
        }
        const currentUserState = this.subject.value;
        const newState = await this.engine.calculateNextUserState(currentUserState,data,this.buildingMapData)
        if (newState){
            this.subject.next(newState);
        }else{
            // console.warn("no next state")
        }
        
    }

    async startStream() {
        if(this.isStreaming){
            console.warn("already streaming user posiiton")
            return;
        }

        if (!this.buildingMapData){
            console.error("NO building map data ")
            return
        }

        const service = UserSpatialDataStreamService.getInstance();
        if(!service.getIsStreaming()){
            await service.startStream();
        }

        this.subscription = service.subscribe({
            complete:() => {
                this.subject.next(null)
            },
            next:(data:any) => {
                this.calculateUserPosition(data)
            },
            error:()=> {
                this.subject.next(null)
            }
        })
        this.isStreaming = true;
    }

    stopStream(){
        if(this.isStreaming){
            this.subscription?.unsubscribe();
            this.subject?.complete();        
            this.isStreaming = false;
        }
    }
    
}
  
  

  
  
  
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
