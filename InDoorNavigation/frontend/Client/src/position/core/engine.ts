import { getRelativeGeoCoordinates } from "../../static-maps/utils";
import { InterialNavigationSystem } from "./INS/InterialNavigationSystem";
import { BuildingMapData, BuildingMetaData } from "./common/BuildingMetaData";
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
import { isPointInPolygon } from "./utils/ray-casting";
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


    async calculateNextUserState(prevState:UserSpatialState | null,data:UserSpatialInputData, buildingMapData:BuildingMapData){
        if(!prevState){
            const state:UserSpatialState = {
                state: {
                    data:{
                    }
                },
                position:null,
                meta:{
                    buildingMapData:buildingMapData
                },
                timestamp: performance.now()
            }
            return await this._calculateNextState(state,data)
        }else{
            const state:UserSpatialState = prevState
            return await this._calculateNextState(state,data)
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


    async _calculateNextState(prevState:UserSpatialState ,data:UserSpatialInputData){
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

        const wifiPosition = await this.wifiFingerprinting.getUserPosition(prevState,wifi);
        const magneticPosition = await this.magneticMatching.getUserPosition(prevState,magnetometer);
        const geoPosition = await this.geoLocationMatching.getUserPosition(prevState,geolocation);
        const insPosition = await this.interialNavigationSystem.getUserPosition(prevState,data);
        let newPosition = await this.integration.integrate(
            prevState,
            data,
            wifiPosition,
            insPosition,
            magneticPosition,
            geoPosition,
        )

        // if (!isPointInPolygon(geoPosition,prevState.meta.buildingMetaData.buildingBoundaryBox)){
        //     newPosition = null;   
        // }

        if (newPosition){
            // temp
            const zValue = newPosition.z
            if(zValue > 30) {
                newPosition.floor = -1
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

