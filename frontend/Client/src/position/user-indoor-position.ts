import { BehaviorSubject, Observable, Observer, Subscribable, buffer, bufferCount, combineLatest, interval, mergeMap, of, share, throttle, throttleTime, window, windowCount, windowTime, windowToggle, windowWhen, withLatestFrom  } from "rxjs";
import { GeolocationService } from "../sensors/gps-service";
import { start } from "../services/sensors/rnsensors";
import SensorsService from "../sensors/sensors-service";
import { SensorKey } from "../services/sensors/SensorKey";
import { GeolocationResponse } from "@react-native-community/geolocation";
import { getRelativeGeoCoordinates, getRelativeGlobalCoordinates } from "../static-maps/utils";
import { WifiService } from "../sensors/wifi-service";
import { UserSpatialData, UserSpatialDataStreamService } from "./UserSpatialDataStreamService";
import client from "../services/server/api-client";

function findClosestFloor(altitude:any, floorAltitudes:object) {
    let closestFloor = null;
    let minDifference = Infinity;

    for (const [floor, floorAltitude] of Object.entries(floorAltitudes)) {
        const difference = Math.abs(floorAltitude - altitude);
        if (difference < minDifference) {
            minDifference = difference;
            closestFloor = floor;
        }
    }

    return closestFloor;
}

function getHeadingFromMagnetometer(x:number, y:number) {
    // Calculate the heading in radians
    let headingRadians = Math.atan2(y, x);

    // Convert the heading to degrees
    let headingDegrees = headingRadians * (180 / Math.PI);

    // Normalize the heading to a range of 0 to 360 degrees
    if (headingDegrees < 0) {
        headingDegrees += 360;
    }

    return headingDegrees;
}

function getNormalizedHeadingFromMagnetometer2(x:number, y:number) {
    // Calculate the heading in radians
    let headingRadians = Math.atan2(y, x);

    // Convert the heading to degrees
    let headingDegrees = headingRadians * (180 / Math.PI);

    // Normalize the heading to a range of 0 to 360 degrees
    if (headingDegrees < 0) {
        headingDegrees += 360;
    }

    // Normalize the heading to a range of 0 to 1
    let normalizedHeading = headingDegrees / 360;

    return normalizedHeading;
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
export interface UserIndoorPosition {
    x:number,
    y:number,
    z:number,
    floor:number,
}

export interface UserState {
    position: UserIndoorPosition,
    data:any
}

export class UserIndoorPositionService {
    private static instance: UserIndoorPositionService;
    private subject:BehaviorSubject<UserState  | null>;
    private buildingBoundaryBox:any;
    private isStreaming:boolean
    private subscription:any
    private buildingId:string | null;
    private floorAltitudes:object | null;


    private constructor() {
        this.subject = new BehaviorSubject<UserState  | null>(null);
        this.isStreaming = false;
        this.buildingId = null;
        this.floorAltitudes = null;
    }  
    
    static getInstance(): UserIndoorPositionService {
        if (!UserIndoorPositionService.instance) {
            UserIndoorPositionService.instance = new UserIndoorPositionService();
            
        }
        return UserIndoorPositionService.instance;
    }  

    subscribe(observer?: Partial<Observer<UserState  | null>> | ((value: UserState  | null) => void) | undefined){
        const unsubscribe = this.subject.subscribe(observer);
        return unsubscribe;
    }

    setBuildingBoundary(buildingBoundaryBox:any){
        this.buildingBoundaryBox = buildingBoundaryBox
    }

    setFloorAltitudes(floorAltitudes:object){
        this.floorAltitudes = floorAltitudes;
    }

    setBuildingId(buildingId:string){
        this.buildingId = buildingId
    }

    

    async calculateUserPosition(data: UserSpatialData | null | void) {
        if (!data){
            return null;
        }
        if(!this.buildingId){
            console.log("no buildingId")
            return null;
        }
        const currentUserState = this.subject.getValue();
        if(!currentUserState){
            if(data.geolocation){
                const initialGPS = await this.calculateInitialPositionFromGPS(data.geolocation)
                if(initialGPS && data.magnetometer){
                    const {x ,y} = data.magnetometer.data.data;
                    const rotationZ = getNormalizedHeadingFromMagnetometer2(x,y);
                    const initialPos =  {
                        x:initialGPS.x,
                        y:initialGPS.y,
                        floor:initialGPS.floor,
                        z:rotationZ,
                    }
                    console.log("GPS INITIAL:" , initialPos)
                    return initialPos;
                }
                
            }else if (data.wifi){
                const wifiPos = await this.fetchAndProcessWifiLocation(data?.wifi);
                if(wifiPos && data.magnetometer){
                    const {x ,y} = data.magnetometer.data.data;
                    const rotationZ = getNormalizedHeadingFromMagnetometer2(x,y);
                    const initialPos =  {
                        x:wifiPos.x,
                        y:wifiPos.y,
                        floor:wifiPos.floor,
                        z:rotationZ,
                    }
                    console.log("WIFI INITIAL:" , initialPos)
                    return initialPos;
                }
            }
        }else{
            const newUserState = await this.calculateNextPosition(currentUserState,data);
            this.subject.next(newUserState);
        }
    }
    async calculateInitialPositionFromGPS(geolocation:any) {
        try {
            const coords = geolocation.data.coords;
            
            const {
                latitude,
                longitude,
                accuracy,
                altitude,
                altitudeAccuracy,
                heading,
                speed
            } = coords;

            const coordsData = getRelativeGeoCoordinates(this.buildingBoundaryBox,{
                latitude,
                longitude
            })
            if(coordsData && this.floorAltitudes){
                const floor = findClosestFloor(altitude,this.floorAltitudes)
                const {x ,y} = coordsData;
                const pos = {
                    x:x,
                    y:y,
                    floor:floor,
                }
                return pos;                
            }
        
            return null
            
        }catch(error) {

        }
    }
    async calculateInitialPosition(data: UserSpatialData | null | void){

    }

    async calculateNextPosition(userState:UserState,data: UserSpatialData | null | void){
        const wifiPos = await this.fetchAndProcessWifiLocation(userState,data?.wifi);
        if(wifiPos){
            console.log("pos");
            console.log(wifiPos)
        }
        
        
        const nextPosition = {
            position:{
                x:0,
                y:0,
                z:0,
                floor:-1
            },
            data:{

            }
        }
        return nextPosition
    }
    async fetchAndProcessWifiLocation(userState:UserState | null,wifiScanData:any) {


        if(!userState){
            console.log("no userState")
            return null;
        } 

        if(!wifiScanData){
            return null;
        }
       
        console.log("wifi item Not Null");
        try {

            console.log("Fetching WiFi location");
            const response = await client.getUserWifiLocation(this.buildingId,userState, wifiScanData);
            if(response.ok){
                const result = await response.json()
                const data = result['data'];
                return data
            }
            return null;
            
        } catch (error) {
            console.error("Error fetching WiFi location", error);
            throw error; // Propagate error to the caller
        }
    }
    
    async fetchAndProcessWifiLocation(userState:UserState | null,wifiScanData:any) {


        if(!userState){
            console.log("no userState")
            return null;
        } 

        if(!wifiScanData){
            return null;
        }
       
        console.log("wifi item Not Null");
        try {

            console.log("Fetching WiFi location");
            const response = await client.getUserWifiLocation(this.buildingId,userState, wifiScanData);
            if(response.ok){
                const result = await response.json()
                const data = result['data'];
                return data
            }
            return null;
            
        } catch (error) {
            console.error("Error fetching WiFi location", error);
            throw error; // Propagate error to the caller
        }
    }


    async startStream() {
        if(this.isStreaming){
            console.log("already streaming user posiiton")
            return;
        }

        if (this.buildingId){
            console.log("streaming for building id: ",this.buildingId)
        }else{
            console.log("NO building id")
        }

        await UserSpatialDataStreamService.getInstance().startStream();

        this.subscription = UserSpatialDataStreamService.getInstance()
        .subscribe({
            complete:() => {
                this.subject.next(null)
            },
            next:(data) => {
                this.calculateUserPosition(data)
            },
            error:()=> {
                this.subject.next(null)
            }
        })
        // this.subscription = UserSpatialDataStreamService.getInstance().subscribe({
        //     complete:() => {
        //         this.subject.next(null)
        //     },
        //     next:async (data) => {
        //         await this.calculateNextPosition(data)
        //     },
        //     error:()=> {
        //         this.subject.next(null)
        //     }
        // })
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
  
  

  
  
  
