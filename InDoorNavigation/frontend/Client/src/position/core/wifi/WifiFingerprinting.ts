import client from "../../../server/api-client";
import { WifiInputData } from "../common/UserSpatialInputData";
import { UserSpatialMetaData } from "../common/UserSpatialMetaData";
import { UserSpatialState } from "../common/UserSpatialState"

export interface WifiFingerprintingResult {

}


export class WifiFingerprinting { 
    
    async getUserPosition(prevState:UserSpatialState | null , wifiScanData:WifiInputData | null | undefined):Promise<WifiFingerprintingResult | null>{
        if (!wifiScanData){
            return null;
        }
        return null;
        const response = await client.getUserWifiLocation(prevState?.meta.buildingMapData.buildingId,
            prevState,
            wifiScanData
        )
        if (response.ok){
            const result = await response.json()
            const data = result['data'];
            return data;
        }
        return null;
    }
}
