import { EngineConfiguration } from "../../config/EngineConfiguration";
import { euclideanDistance, euclideanDistance3D } from "../../common/utils/distance";
import { UserSpatialState } from "@/common/interfaces/engine/UserSpatialState";
import { UserSpatialInputData } from "@/common/interfaces/engine/UserSpatialInputData";
import { WifiFingerprintingResult } from "../wifi/WifiFingerprinting";
import { InterialNavigationSystemResult } from "../INS/InterialNavigationSystem";
import { MagneticMatchingResult } from "../magnetic/MagneticMatching";
import { GeoLocationMatchingResult } from "../geolocation/GeoLocationMatching";
import { UserMapCoordinates } from "@/common/interfaces/engine/UserMapCoordinates";

export class MapEngineIntegration {


    async integrate(
        userState: UserSpatialState,
        data :UserSpatialInputData,
        insResult:InterialNavigationSystemResult,
        wifiFingerprintingResult:WifiFingerprintingResult,
        magneticProfilingResult:MagneticMatchingResult,
        geoMatchingResult:GeoLocationMatchingResult,
    ):Promise<UserMapCoordinates | null>{
        const {
            geolocation,
            wifi,
            magnetometer,
            accelerometer,
            gyroscope,
            stepdetector,
            rotationVector,
            gravity,
            linear,
        } = data;

        if(geolocation && geoMatchingResult){
            const coords = geolocation.data.coords
            const { accuracy } = coords;
            if (accuracy < EngineConfiguration.bestGpsAccuracyThreshold){
                const distance = euclideanDistance3D(
                    [geoMatchingResult.position.x,geoMatchingResult.position.y,geoMatchingResult.position.z], 
                    [userState.position.x,userState.position.y,userState.position.z]
                )
                if (distance > EngineConfiguration.realignWithGPSDistanceThresh){
                    return geoMatchingResult.position;
                }
            }
        }
        if(wifiFingerprintingResult){
            // return wifiFingerprintingResult;
            return {
                floor:0,
                heading:0,
                x:20,
                y:30,
                z:30
            }
        }

        return null;
    }

    async initialIntegrate(
        userState: UserSpatialState,
        data :UserSpatialInputData,
        wifiFingerprintResult:WifiFingerprintingResult,
        magneticProfilingResult:MagneticMatchingResult,
        geoMatchingResult:GeoLocationMatchingResult,
    ):Promise<UserMapCoordinates | null>{
        const {
            geolocation,
            wifi,
            magnetometer,
            accelerometer,
            gyroscope,
            stepdetector,
            rotationVector,
            gravity,
            linear,

        } = data;


        if(!wifiFingerprintResult && geoMatchingResult){
            
            
        } else if (wifiFingerprintResult && !geoMatchingResult){
            
        } else if (wifiFingerprintResult && geoMatchingResult){
            if(geolocation && data.geolocation.data.coords.accuracy > EngineConfiguration.initialPositionGPSAccuracyThreshold){
               
            }else{
               
            }
        }

        if(wifiFingerprintResult){
            return {
                floor:0,
                heading:0,
                x:20,
                y:30,
                z:30
            }
        }

        return null;
    }

    regulate_flor (){
        // const zValue = newPosition.z
        // if(zValue > 30) {
        //     newPosition.floor = 0
        // }else {
        //     newPosition.floor = -1
        // }
    }
    weightedLeastSquares(){

    }

}