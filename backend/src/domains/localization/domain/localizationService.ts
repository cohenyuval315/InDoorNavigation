import mongoose from "mongoose";
import { MapCoordinates } from "../../../common/interfaces/MapCoordinates.js";


export const getUserLocation = async (buildingId:string,wifiMap:any,userPosition:MapCoordinates,wifiScanData:any) => {
    const id = new mongoose.Types.ObjectId(buildingId);

}

export const getInitialUserLocationByWifi = async (wifiMap:any,wifiScanData:any) => {
    const newPosition = {
        x: 0,
        y: 0,
        z: 0,
        floor:0
    }

    return newPosition;
}

export const getUserLocationByWifi = async (wifiMap:any,userState:any,wifiScanData:any) => {
    const newPosition = {
        x: 0,
        y: 0,
        z: 0,
        floor:0
    }

    return newPosition;
}

