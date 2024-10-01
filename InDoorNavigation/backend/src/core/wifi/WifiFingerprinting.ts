import { BuildingMapData } from "../../common/interfaces/BuildingMapData.js";
import { WifiMap } from "../../common/interfaces/WifiMap.js";
import { UserSpatialInputData } from "../../common/interfaces/engine/UserSpatialInputData.js";
import { UserSpatialState } from "../../common/interfaces/engine/UserSpatialState.js";

export interface WifiFingerprintingResult {

}


export class WifiFingerprinting { 
    
    async getWifiFingerprintResult(
        userState:UserSpatialState,
        data:UserSpatialInputData,
        buildingMapData:BuildingMapData,
        wifiMap:WifiMap
    ){
        const {wifi} = data;
        if (!wifi){
            return null;
        }
        //const {lastXPositions} = userState.state.data 
    }

    async Triangulation(){

    }

    async Fingerprinting(){

    }

    async Trilateration(){

    }

}
