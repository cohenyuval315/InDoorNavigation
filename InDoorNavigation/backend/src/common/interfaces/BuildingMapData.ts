import { MapFloor } from "./MapFloor";
import { GeoCoordinates } from "./GeoCoordinates";


export interface BuildingMapData {
    buildingId:string,
    mapFloors:MapFloor[],
    mapHeading:number,
    geoArea:GeoCoordinates[],
    mapWidth:number
    mapHeight:number,
    scale:number,
    zScale:number
}



