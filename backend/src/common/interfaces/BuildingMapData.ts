import { MapFloor } from "@/common/interfaces/MapFloor";
import { GeoCoordinates } from "@/common/interfaces/GeoCoordinates";


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



