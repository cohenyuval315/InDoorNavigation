import { UserSpatialInputData } from "@/common/interfaces/engine/UserSpatialInputData";
import { calculateRelativeGeoPosition } from "./utils/gps-relative-position";
import { BuildingMapData } from "@/common/interfaces/BuildingMapData";
import { UserSpatialState } from "@/common/interfaces/engine/UserSpatialState";
import { UserMapCoordinates } from "@/common/interfaces/engine/UserMapCoordinates";
import { getCumulativeFloorHeight, getFloorHeight, getNearestFloor } from "@/common/utils/floor";

export interface GeoLocationMatchingResult {
    position:UserMapCoordinates
}

export class GeoLocationMatching { 
    async getGeolocationMatchingResult(
        userState:UserSpatialState, 
        data:UserSpatialInputData,
        buildingMapData:BuildingMapData,
    ): Promise<GeoLocationMatchingResult> {
        const {geolocation} = data;
        if (!geolocation){
            return null;
        }

        const {geoArea} = buildingMapData;

        const coords = geolocation.data.coords;
        const extra = geolocation.data.extras;
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
            geoArea)

        const userHeading = (heading - buildingMapData.mapHeading) % 360;
        const floor = getNearestFloor(altitude, buildingMapData.mapFloors);
        const z = getFloorHeight(floor, buildingMapData.mapFloors)
        
        return {
            position:{
                floor: floor,
                x: x,
                y: y,
                z: z,
                heading: userHeading
            }
        }
    }
}