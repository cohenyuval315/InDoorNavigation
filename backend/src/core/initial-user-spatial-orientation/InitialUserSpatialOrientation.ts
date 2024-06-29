import { UserSpatialInputData } from "@/common/interfaces/engine/UserSpatialInputData";
import { EngineConfiguration } from "../../config/EngineConfiguration";
import { GeoLocationMatching } from "../geolocation/GeoLocationMatching";
import { WifiFingerprinting } from "../wifi/WifiFingerprinting";
import { UserSpatialState } from "@/common/interfaces/engine/UserSpatialState";


export class InitialUserSpatialOrientation { 

    async getUserPosition(
        data:UserSpatialInputData,
        stateData:UserSpatialState,
        wifiFingerprint:WifiFingerprinting,
        geoLocationMatching:GeoLocationMatching) {
         

    }

}