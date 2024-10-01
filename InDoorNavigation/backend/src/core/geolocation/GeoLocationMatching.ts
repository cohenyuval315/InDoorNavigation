import { UserSpatialInputData } from "../../common/interfaces/engine/UserSpatialInputData.js";
import { calculateRelativeGeoPosition } from "../../common/utils/geolocation/gps-relative-position.js";
import { BuildingMapData } from "../../common/interfaces/BuildingMapData.js";
import { UserSpatialState } from "../../common/interfaces/engine/UserSpatialState.js";
import { UserMapCoordinates } from "../../common/interfaces/engine/UserMapCoordinates.js";
import { getFloorHeight, getNearestFloor } from "../../common/utils/buildings/floors/floor.js";

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
        const floor = getNearestFloor(altitude, buildingMapData.mapFloors,buildingMapData.zScale);
        const z = getFloorHeight(floor, buildingMapData.mapFloors,buildingMapData.zScale)
        
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