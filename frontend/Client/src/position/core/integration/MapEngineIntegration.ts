import { UserMapCoordinates } from "../common/UserMapCoordinates";
import { UserSpatialInputData } from "../common/UserSpatialInputData";
import { UserSpatialState } from "../common/UserSpatialState";
import { EngineConfiguration } from "../config/EngineConfiguration";
import { euclideanDistance } from "../utils/distance";

export class MapEngineIntegration {
    async integrate(
        prevState: UserSpatialState,
        data :UserSpatialInputData,
        wifiPosition:UserMapCoordinates | null | undefined | void,
        insPosition:UserMapCoordinates | null | undefined | void,
        magneticPosition:UserMapCoordinates | null| undefined | void,
        geoPosition:UserMapCoordinates | null| undefined | void,
    ){
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

        if(geolocation && geoPosition){
            const coords = geolocation.data.coords
            const { accuracy } = coords;
            if (accuracy < EngineConfiguration.bestGpsAccuracyThreshold){
                const distance = euclideanDistance([geoPosition.x,geoPosition.y], [prevState.position.x,prevState.position.y])
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