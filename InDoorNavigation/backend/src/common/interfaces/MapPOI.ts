import { POIType } from "../enums/POIType.js";
import { MapCoordinates } from "./MapCoordinates.js";

export interface MapPOIDetails {
    title:string;
    description:string;
    POIType:POIType;
    openingHours?:object;
    websiteLink?:string;
    phonenumbers?:string;
    POIOpeningDate?:Date;
    storageImageKey?:string;
    imageUri?:string;
}

export interface MapPOI {
    id: string;
    mapArea:MapCoordinates[];
    center:MapCoordinates;
    isAvailable: boolean;
    floor:number;
    isEmployeeOnly:boolean;
    details:MapPOIDetails
}
