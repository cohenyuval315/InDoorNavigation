import { InterialNavigationSystemResult } from "../INS/InterialNavigationSystem";
import { UserSpatialInputData } from "../common/UserSpatialInputData";
import { UserSpatialState } from "../common/UserSpatialState";
import { EngineConfiguration } from "../config/EngineConfiguration";
import { GeoMatchingResult } from "../geolocation/GeoLocationMatching";
import { MagneticMatchingResult } from "../magnetic/MagneticMatching";
import { euclideanDistance } from "../utils/distance";
import { WifiFingerprintingResult } from "../wifi/WifiFingerprinting";


export class MapEngineIntegration {
    async integrate(
        prevState: UserSpatialState ,
        data :UserSpatialInputData,
        wifiPosition:WifiFingerprintingResult | null | undefined | void,
        insPosition:InterialNavigationSystemResult | null | undefined | void,
        magneticPosition:MagneticMatchingResult | null| undefined | void,
        geoPosition:GeoMatchingResult | null| undefined | void,
    ):Promise<any>{
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

        if (prevState.position === null){
            if (wifiPosition){
                return wifiPosition;
            }
            // console.log("use geo position")
            return geoPosition;
        }else{
            return geoPosition;
            // return insPosition;
        }

        if(geolocation && geoPosition){
            const coords = geolocation.data.coords
            const { accuracy } = coords;
            if (accuracy < EngineConfiguration.bestGpsAccuracyThreshold){
                // @ts-ignore
                const {x,y} = geoPosition;
                const distance = euclideanDistance([x,y], [prevState.position.x,prevState.position.y])
                if (distance > EngineConfiguration.realignWithGPSDistanceThresh){
                    return geoPosition;
                }
            }
        }
        if(wifiPosition){
            return wifiPosition;
        }

        return insPosition;
    }

    weightedLeastSquares(){

    }

}