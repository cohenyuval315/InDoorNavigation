
import { InterialNavigationSystem } from "./INS/InterialNavigationSystem.js";
import { BuildingMapData } from "../common/interfaces/BuildingMapData.js";
import { GeoLocationMatching } from "./geolocation/GeoLocationMatching.js";
import { MapEngineIntegration } from "./integration/MapEngineIntegration.js";
import { MagneticMatching } from "./magnetic/MagneticMatching.js";
import { WifiFingerprinting } from "./wifi/WifiFingerprinting.js";
import { UserSpatialState } from "../common/interfaces/engine/UserSpatialState.js";
import { UserSpatialInputData } from "../common/interfaces/engine/UserSpatialInputData.js";
import { WifiMap } from "../common/interfaces/WifiMap.js";
import { MagneticMap } from "../common/interfaces/MagneticMap.js";
import { UserSpatialStateData } from "../common/interfaces/engine/UserSpatialStateData.js";
import { UserMapCoordinates } from "../common/interfaces/engine/UserMapCoordinates.js";
import { NavigationMetaData } from "../common/interfaces/NavigationMetaData.js";

export class MapEngine {
    private wifiFingerprinting:WifiFingerprinting
    private magneticMatching:MagneticMatching
    private geoLocationMatching:GeoLocationMatching
    private interialNavigationSystem:InterialNavigationSystem 
    private integration: MapEngineIntegration

    constructor(
        interialNavigationSystem:InterialNavigationSystem,
        wifiFingerprinting:WifiFingerprinting,
        magneticMatching:MagneticMatching,
        geoLocationMatching:GeoLocationMatching,
        integration:MapEngineIntegration){
            this.interialNavigationSystem = interialNavigationSystem;
            this.wifiFingerprinting = wifiFingerprinting;
            this.magneticMatching = magneticMatching;
            this.integration = integration;
            this.geoLocationMatching = geoLocationMatching
    }


    async calculateNextUserState(
        userState:UserSpatialState,
        data:UserSpatialInputData, 
        buildingMapData:BuildingMapData,
        buildingWifiMap:WifiMap,
        buildingMagneticMap:MagneticMap
    ): Promise<UserSpatialState> {
        if(userState.position == null) {
            const startState = await this._getInitialPosition(
                userState,
                data,
                buildingMapData,
                buildingWifiMap,
                buildingMagneticMap
            );
            return startState
        }else{
            const newState = await this._calculateNextState(
                userState,
                data,
                buildingMapData,
                buildingWifiMap,
                buildingMagneticMap
            )
            return newState;
        }
    }

    _createState(position:UserMapCoordinates,stateData:UserSpatialStateData,meta:NavigationMetaData,timestamp:any){
        const newState:UserSpatialState = {
            meta:meta,
            state:stateData,
            timestamp:timestamp,
            position:position
        }
        return newState
    }

    async _getInitialPosition(
        userState:UserSpatialState,
        data:UserSpatialInputData,
        buildingMapData:BuildingMapData,
        wifiMap:WifiMap,
        magneticMap:MagneticMap,
    ) {
        const geoMatchingResult = await this.geoLocationMatching.getGeolocationMatchingResult(userState,data,buildingMapData);
        const wifiFingerprintResult = await this.wifiFingerprinting.getWifiFingerprintResult(userState,data,buildingMapData,wifiMap);
        const magneticProfilingResult = await this.magneticMatching.getMagneticMatchingResult(userState,data,buildingMapData,magneticMap);
        let position = null;
        position = await this.integration.initialIntegrate(
            userState,
            data,
            wifiFingerprintResult,
            magneticProfilingResult,
            geoMatchingResult,
        )
        const timestamp = performance.now()
        const newState = this._createState(
            position,
            userState.state,
            userState.meta,
            timestamp,
        )
        return newState;
    }

    
    async _calculateNextState(
        userState:UserSpatialState,
        data:UserSpatialInputData,
        buildingMapData:BuildingMapData,
        wifiMap:WifiMap,
        magneticMap:MagneticMap,
    ){

        const geoMatchingResult = await this.geoLocationMatching.getGeolocationMatchingResult(userState,data,buildingMapData);
        const wifiFingerprintResult = await this.wifiFingerprinting.getWifiFingerprintResult(userState,data,buildingMapData,wifiMap);
        const magneticProfilingResult = await this.magneticMatching.getMagneticMatchingResult(userState,data,buildingMapData,magneticMap);
        const insResult = await this.interialNavigationSystem.getINSResult(userState,data,buildingMapData);
        const newPosition = await this.integration.integrate(
            userState,
            data,
            insResult,
            wifiFingerprintResult,
            magneticProfilingResult,
            geoMatchingResult
        )

        if (newPosition){
            const newTimestamp = performance.now()
            return this._createState(
                newPosition,
                userState.state,
                userState.meta,
                newTimestamp
            )
        }
        
    }

}

