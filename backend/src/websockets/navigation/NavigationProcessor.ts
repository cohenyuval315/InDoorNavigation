import logger from '../../lib/logger';
import { INavigationRequest, NavigationRequestType,
        IStartNavigationRequestPayload,
        INavigationRequestPayload
 } from './NavigationRequest';
import { INavigationResponse, NavigationResponseType } from './NavigationResponse';
import { NavigationCore } from '@/core/NavigationCore';
import * as BuildingDataService from '../../domains/buildings/data/domain/buildingService';
import * as BuildingMapService from '../../domains/buildings/map/domain/buildingMapService';
import * as BuildingGraphService from '../../domains/buildings/graph/domain/buildingGraphService';
import * as BuildingWifiService from '../../domains/buildings/wifi/domain/buildingWifiService';
import * as BuildingMagneticService from '../../domains/buildings/magnetic/domain/buildingMagneticService';
import * as AuthService from '../../domains/users/domain/authService';
import { BuildingMapData } from '../../common/interfaces/BuildingMapData';
import { AppError } from '../../exceptions/app-error';
import HttpCode from '@/common/constants/http-codes';
import { NavigationMetaData } from '@/common/interfaces/NavigationMetaData';
import { log } from 'console';
import { getPOIById } from '@/common/utils/utils';




export class NavigationProcessor {
    private startTimestamp:number
    private core :NavigationCore

    constructor(){
        this.core = new NavigationCore();
        this.startTimestamp = performance.now();
    }

    __response<T extends NavigationResponseType>(type:T,payload:any){
        const timestamp = performance.now();
        const newTimestamp = timestamp - this.startTimestamp;
        const response:INavigationResponse<T> = {
            type: type,
            payload: payload,
            timestamp: newTimestamp,
        }
        return response;
    }

    async handleNavigationRequest<T extends NavigationRequestType>(request: INavigationRequest<T>) {
        try{
            switch (request.type) {
                case NavigationRequestType.START:
                    const startResponse = await this._setupInitialData(request as INavigationRequest<NavigationRequestType.START>);
                    return startResponse;
                    break;
                case NavigationRequestType.POSITION:
                    const posResponse = await this._getNextNavigationEvent(request as INavigationRequest<NavigationRequestType.POSITION>)
                    return posResponse;
                case NavigationRequestType.END:
                    const stopResponse = await this._stopNavigationCleanup(request as INavigationRequest<NavigationRequestType.END>)
                    return stopResponse;
                default:
                    return this.__response(NavigationResponseType.NONE,{});
            }
        }catch(error){
            logger.error(error);
            return this.__response(NavigationResponseType.NONE,{});
        }

    }


    async _setupInitialData(request:INavigationRequest<NavigationRequestType.START>){
        try{            
            const {
                accessibility,
                buildingId,
                destinationPOIId,
                accessToken
            } = request.payload;
            //AuthService check access token

            const building = await BuildingDataService.getBuildingData(buildingId);
            if (!building){
                throw new AppError("navigation processor building not found",HttpCode.NotFound,"during navigation processor initializing data building was not found",false)
            }
            const buildingMap = await BuildingMapService.getBuildingMapData(buildingId);
            if (!buildingMap){
                throw new AppError("navigation processor building map not found",HttpCode.NotFound,"during navigation processor initializing data building map was not found",false)
            }        
            const buildingGraph = await BuildingGraphService.getBuildingGraphMapData(buildingId);
            if (!buildingGraph){
                throw new AppError("navigation processor building graph not found",HttpCode.NotFound,"during navigation processor initializing data building graph was not found",false)
            }        
            const buildingWifi = await BuildingWifiService.getBuildingWifiMapData(buildingId);
            if (!buildingWifi){
                throw new AppError("navigation processor building wifi not found",HttpCode.NotFound,"during navigation processor initializing data building wifi was not found",false)
            }        
            const buildingMagnetic = await BuildingMagneticService.getBuildingMagneticMapData(buildingId);
            if (!buildingMagnetic){
                throw new AppError("navigation processor building  magnetic not found",HttpCode.NotFound,"during navigation processor initializing data building magnetic was not found",false)
            }      
            const buildingData = building.toObject();
            const buildingMapData = buildingMap.toObject();
            const buildingGraphData = buildingGraph.toObject();
            const buildingWifiData = buildingWifi.toObject();
            const buildingMagneticData = buildingMagnetic.toObject();

            const {geoArea} = buildingData;
            const {
                POIs,
                scale,
                zScale,
                mapHeading,
                mapWidth,
                mapHeight,
                mapFloors,
            } = buildingMapData;

            if (mapFloors.length < 1){
                throw new AppError("navigation processor map floors length 0",HttpCode.NotFound,"during navigation processor initializing data map floors legnth is 0",false)
            }      
            const destinationPOI = getPOIById(POIs,destinationPOIId);
            if (!destinationPOI){
                throw new AppError("navigation processor destinationPOIs",HttpCode.NotFound,"destinationPOIs legnth is not 1",false)
            }

            const {edges,nodes} = buildingGraphData;



            const buildingMetaData:BuildingMapData = {
                buildingId: buildingId,
                mapFloors: mapFloors,
                mapHeading: mapHeading,
                geoArea: geoArea,
                mapWidth: mapWidth,
                mapHeight: mapHeight,
                scale: scale,
                zScale:zScale
            }
            const buildingNavigationGraphData = {
                nodes:nodes,
                edges:edges,
                destinationPOI:destinationPOI,
                accessibility:accessibility
            }

            const buildingMagneticMap = buildingMagneticData.data
            const buildingWifiMap = buildingWifiData.data

            const meta:NavigationMetaData = {
                buildingMapData:buildingMetaData,
                buildingGraphData:buildingNavigationGraphData,
                buildingWifiMap:buildingWifiMap,
                buildingMagneticMap:buildingMagneticMap,
            }

            const response = this.core.setup(meta);
            if (!response){
                throw new AppError("navigation init error",HttpCode.InternalServerError,"fail to setup navigation",false)
            }
            return this.__response(NavigationResponseType.START,{})

        }catch(error){
            return this.__response(NavigationResponseType.ERROR,{})
        }
    }

    async _getNextNavigationEvent(request:INavigationRequest<NavigationRequestType.POSITION>){
        if(!this.core.getIsInitializedSuccessfully()){
            return this.__response(NavigationResponseType.ERROR,{})
        }
        const {spatialData} = request.payload;
        await this.core.calculateNextState(spatialData);
        if(this.core.getIsNeedNewRoute()){
            const newRoute = this.core.getNewNavigationRoute();
            const {routeSVG,distance,timeLength} = newRoute
            return this.__response(NavigationResponseType.REROUTE,{
                routeSVG,
                distance,
                timeLength,
            })
        }else{
            const userPosition = this.core.getUserPosition();
            return this.__response(NavigationResponseType.REPOSITION,{
                userPosition:userPosition
            })
        }
    }


    async _stopNavigationCleanup(request:INavigationRequest<NavigationRequestType.END>){
        logger.info("navigation clean up");
        return this.__response(NavigationResponseType.END,{})
    }
}