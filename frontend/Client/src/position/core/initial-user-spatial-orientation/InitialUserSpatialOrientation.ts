import { UserSpatialInputData } from "../common/UserSpatialInputData";
import { UserSpatialMetaData } from "../common/UserSpatialMetaData";
import { UserSpatialStateData } from "../common/UserSpatialStateData";
import { EngineConfiguration } from "../config/EngineConfiguration";
import { GeoLocationMatching } from "../geolocation/GeoLocationMatching";
import { WifiFingerprinting } from "../wifi/WifiFingerprinting";



export class InitialUserSpatialOrientation { 

    async getUserPosition(
        data:UserSpatialInputData,
        stateData:UserSpatialStateData,
        meta:UserSpatialMetaData, 
        wifiFingerprint:WifiFingerprinting,
        geoLocationMatching:GeoLocationMatching) {
         
        if(!data.wifi && !data.geolocation){
            return null;
        }

        if(!data.wifi && data.geolocation){
            const position = await geoLocationMatching.getUserPosition(null,data.geolocation,meta)
            return position
        } else if (data.wifi && !data.geolocation){
            const position = await wifiFingerprint.getUserPosition(null,data.wifi,meta);
            return position;
        } else if (data.wifi && data.geolocation){
            if(data.geolocation.data.coords.accuracy > EngineConfiguration.initialPositionGPSAccuracyThreshold){
                const position = await geoLocationMatching.getUserPosition(null,data.geolocation,meta)
                return position
            }else{
                const position = await wifiFingerprint.getUserPosition(null,data.wifi,meta);
                return position;
            }
        } else {
            return null;
        }
    }

}