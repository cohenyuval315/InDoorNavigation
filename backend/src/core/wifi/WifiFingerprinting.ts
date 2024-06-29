import { BuildingMapData } from "@/common/interfaces/BuildingMapData";
import { WifiMap } from "@/common/interfaces/WifiMap";
import { UserSpatialInputData } from "@/common/interfaces/engine/UserSpatialInputData";
import { UserSpatialState } from "@/common/interfaces/engine/UserSpatialState";

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
