import { getRelativeGeoCoordinates } from "../../../static-maps/utils";
import { GeolocationInputData } from "../common/UserSpatialInputData";
import { UserSpatialMetaData } from "../common/UserSpatialMetaData";
import { UserSpatialState } from "../common/UserSpatialState";
import { calculateRelativeGeoPosition } from "./utils/gps-relative-position";

export class GeoLocationMatching { 
    async getUserPosition(
        prevState:UserSpatialState | null, 
        geoData:GeolocationInputData | null | undefined,
        meta:UserSpatialMetaData
    ){
        if (!geoData){
            return null;
        }
        const coords = geoData.data.coords;
        const extra = geoData.data.extras;
        const {
            accuracy,
            altitude,
            longitude,
            latitude,
            heading,
        } = coords;

        const {maxCn0,meanCn0,satellites} = extra;
        
        const {x,y} = calculateRelativeGeoPosition(
            {
                longitude,
                latitude
            },
            meta.buildingMetaData.buildingBoundaryBox)

        const userHeading = (heading - meta.buildingMetaData.normalHeading + 360) % 360;
        return {
            floor: prevState ? prevState.position.floor : 0,
            x: x,
            y: y,
            z: altitude,
            heading: userHeading
        }
        
    }
}