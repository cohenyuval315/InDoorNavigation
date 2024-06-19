import { UserState } from "../core/UserState"

export const getUserLocation = async (buildingId:string,wifiMap:any,userPosition:MapCoordinates,wifiScanData:any) => {


}

export getInitialUserLocationByWifi = async (wifiMap:any,wifiScanData:any) => {
    const newPosition = {
        x: 0,
        y: 0,
        z: 0,
        floor:0
    }

    return newPosition;
}

export const getUserLocationByWifi = async (wifiMap:any,userState:UserState,wifiScanData:any) => {
    const newPosition = {
        x: 0,
        y: 0,
        z: 0,
        floor:0
    }

    return newPosition;
}

