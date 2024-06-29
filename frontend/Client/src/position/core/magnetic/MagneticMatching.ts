import client from "../../../server/api-client";
import { UserSpatialState } from "../common/UserSpatialState";

export class MagneticMatching {
    async getUserPosition(prevState:UserSpatialState, magneticData:any){
        if(!magneticData){
            return null;
        }
        // const response = await client.getUserMagneticLocation(prevState.meta.buildingMetaData.buildingId,
        //     magneticData
        // )
        // if (response.ok){
        //     const result = await response.json()
        //     const data = result['data'];
        //     return data;
        // }
        
    }
}