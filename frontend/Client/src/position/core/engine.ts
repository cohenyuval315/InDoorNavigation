import { getRelativeGeoCoordinates } from "../../static-maps/utils";
import { InterialNavigationSystem } from "./INS/InterialNavigationSystem";
import { BuildingMetaData } from "./common/BuildingMetaData";
import { UserMapCoordinates } from "./common/UserMapCoordinates";
import { UserSpatialInputData } from "./common/UserSpatialInputData";
import { UserSpatialMetaData } from "./common/UserSpatialMetaData";
import { UserSpatialState } from "./common/UserSpatialState";
import { UserSpatialStateData } from "./common/UserSpatialStateData";
import { EngineConfiguration } from "./config/EngineConfiguration";
import { GeoLocationMatching } from "./geolocation/GeoLocationMatching";
import { InitialUserSpatialOrientation } from "./initial-user-spatial-orientation/InitialUserSpatialOrientation";
import { MapEngineIntegration } from "./integration/MapEngineIntegration";
import { MagneticMatching } from "./magnetic/MagneticMatching";
import { euclideanDistance } from "./utils/distance";
import { WifiFingerprinting } from "./wifi/WifiFingerprinting";

export class MapEngine {
    private wifiFingerprinting:WifiFingerprinting
    private magneticMatching:MagneticMatching
    private geoLocationMatching:GeoLocationMatching
    private interialNavigationSystem:InterialNavigationSystem 
    private integration: MapEngineIntegration
    private initialUserSpatialOrientation: InitialUserSpatialOrientation
    
    constructor(
        initialUserSpatialOrientation: InitialUserSpatialOrientation,
        interialNavigationSystem:InterialNavigationSystem,
        wifiFingerprinting:WifiFingerprinting,
        magneticMatching:MagneticMatching,
        geoLocationMatching:GeoLocationMatching,
        integration:MapEngineIntegration){
            this.initialUserSpatialOrientation = initialUserSpatialOrientation;
            this.interialNavigationSystem = interialNavigationSystem;
            this.wifiFingerprinting = wifiFingerprinting;
            this.magneticMatching = magneticMatching;
            this.integration = integration;
            this.geoLocationMatching = geoLocationMatching
    }


    async calculateNextUserState(prevState:UserSpatialState | null,data:UserSpatialInputData, buildingMetaData:BuildingMetaData){
        const startTimestamp = performance.now()
        const userMeta:UserSpatialMetaData = {
            buildingMetaData:buildingMetaData
        }
        const stateData:UserSpatialStateData = {
            data: {
                startTimestamp:startTimestamp,
            }
        }
        if(prevState == null) {
            return await this._getInitialState(data,stateData,userMeta);
        }else{
            return await this._calculateNextState(prevState,data)
        }
    }

    _createState(position:UserMapCoordinates,stateData:UserSpatialStateData,meta:UserSpatialMetaData,timestamp:any){
        const newState:UserSpatialState = {
            meta:meta,
            state:stateData,
            timestamp:timestamp,
            position:position
        }
        return newState
    }

    async _getInitialState(data:UserSpatialInputData,stateData:UserSpatialStateData,userMeta:UserSpatialMetaData) {
        const position = await this.initialUserSpatialOrientation.getUserPosition(
            data,
            stateData,
            userMeta,
            this.wifiFingerprinting,
            this.geoLocationMatching,
        );
        const timestamp = performance.now()

        if (position){
            console.log("initial position:", position,timestamp)
            const newState = this._createState(
                position,
                stateData,
                userMeta,
                timestamp,
            )
            return newState;
        }
    }

    
    async _calculateNextState(prevState:UserSpatialState,data:UserSpatialInputData){
        const {
            geolocation,
            wifi,
            magnetometer,
            accelerometer,
            gyroscope,
            stepdetector,
            rotationVector,
            gravity,
            linear,
        } = data;

        const wifiPosition = await this.wifiFingerprinting.getUserPosition(prevState,wifi,prevState.meta);
        const magneticPosition = await this.magneticMatching.getUserPosition(prevState,magnetometer);
        const geoPosition = await this.geoLocationMatching.getUserPosition(prevState,geolocation,prevState.meta);
        const insPosition = await this.interialNavigationSystem.getUserPosition(prevState,data);
        const newPosition = await this.integration.integrate(
            prevState,
            data,
            wifiPosition,
            insPosition,
            magneticPosition,
            geoPosition,
        )

        if (newPosition){
            // temp
            const zValue = newPosition.z
            if(zValue > 30) {
                newPosition.floor = 0
            }else {
                newPosition.floor = -1
            }
            // console.log("new position",newPosition)
            const newTimestamp = performance.now()
            return this._createState(
                newPosition,
                prevState.state,
                prevState.meta,
                newTimestamp
            )
        }
        
    }

    getFloorByHeight(height:number){
        
    }

}

