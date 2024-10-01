import { euclideanDistance, euclideanDistance3D } from "../../common/utils/math/distance.js";
import { UserSpatialState } from "../../common/interfaces/engine/UserSpatialState.js";
import { UserSpatialInputData } from "../../common/interfaces/engine/UserSpatialInputData.js";
import { WifiFingerprintingResult } from "../wifi/WifiFingerprinting.js";
import { InterialNavigationSystemResult } from "../INS/InterialNavigationSystem.js";
import { MagneticMatchingResult } from "../magnetic/MagneticMatching.js";
import { GeoLocationMatchingResult } from "../geolocation/GeoLocationMatching.js";
import { UserMapCoordinates } from "../../common/interfaces/engine/UserMapCoordinates.js";
import { EngineConfig } from "../../config/engine-config.js";

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
            if (accuracy < EngineConfig.BEST_GPS_ACCURACY_THRESHOLD){
                const distance = euclideanDistance3D(
                    [geoMatchingResult.position.x,geoMatchingResult.position.y,geoMatchingResult.position.z], 
                    [userState.position.x,userState.position.y,userState.position.z]
                )
                if (distance > EngineConfig.REALIGN_WITH_GPS_DISTANCE_THRESH){
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
            if(geolocation && data.geolocation.data.coords.accuracy > EngineConfig.INITIAL_POSITION_GPS_ACCURACY_THRESHOLD){
               
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