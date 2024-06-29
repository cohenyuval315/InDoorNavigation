import client from "../../../server/api-client";
import { WifiInputData } from "../common/UserSpatialInputData";
import { UserSpatialMetaData } from "../common/UserSpatialMetaData";
import { UserSpatialState } from "../common/UserSpatialState"

export class WifiFingerprinting { 
    
    async getUserPosition(prevState:UserSpatialState | null , wifiScanData:WifiInputData | null | undefined,meta:UserSpatialMetaData){
        if (!wifiScanData){
            return null;
        }
        const response = await client.getUserWifiLocation(meta.buildingMetaData.buildingId,
            prevState,
            wifiScanData
        )
        if (response.ok){
            const result = await response.json()
            const data = result['data'];
            return data;
        }
    }
}
