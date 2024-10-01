import { getRelativeGeoCoordinates } from "../../../static-maps/utils";
import { GeolocationInputData } from "../common/UserSpatialInputData";
import { UserSpatialMetaData } from "../common/UserSpatialMetaData";
import { UserSpatialState } from "../common/UserSpatialState";
import { calculateRelativeGeoPosition } from "./utils/gps-relative-position";

export interface GeoMatchingResult {
    
}


export class GeoLocationMatching { 
    async getUserPosition(
        prevState:UserSpatialState , 
        geoData:GeolocationInputData | null | undefined,
        // meta:UserSpatialMetaData
    ):Promise<GeoMatchingResult | null> {
        if (!geoData){
            return null;
        }
        // prevState?.meta
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
            prevState.meta.buildingMapData.geoArea)
        // console.log(prevState.meta.buildingMapData.geoArea)
            
            // [
            //     { // top left  32.113495639588905, 34.817720913002226
            //         'latitude': 32.113555, 
            //         'longitude': 34.817705000000004
            //     },
            //     { // top right 32.11336145382978, 34.818553000270406
            //         'latitude': 32.11342166666667,   // significantly decreased latitude
            //         'longitude': 34.81845999999996  // THIS INFLUENCE
            //     }, 
            //     { // bottom left 32.112833667253646, 34.81776207053152
            //         'latitude': 32.112833667253646, // THIS INFLUENCE
            //         'longitude': 34.8186207053152  // keep previous longitude change
            //     },
            //     { // bottom right
            //         'latitude': 32.11281000000001,   // significantly decreased latitude
            //         'longitude': 34.818433166666667   // keep previous longitude change
            //     }
            // ])
            
            
            // prevState.meta.buildingMapData.geoArea)

        const userHeading = (heading - prevState.meta.buildingMapData.mapHeading + 360) % 360;
        const z = altitude;
        let floor = null;
        if(z > 50) {
            floor = 0;
        }else{
            floor = -1;
        }
        return {
            floor: floor,
            x: x,
            y: y,
            z: z,
            heading: userHeading
        }
        
    }
}