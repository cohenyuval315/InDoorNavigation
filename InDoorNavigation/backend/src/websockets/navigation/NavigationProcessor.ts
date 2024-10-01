import logger from '../../lib/logger/index.js';
import { INavigationRequest, NavigationRequestType,
        IStartNavigationRequestPayload,
        INavigationRequestPayload
 } from './NavigationRequest.js';
import { INavigationResponse, NavigationResponseType } from './NavigationResponse.js';
import { NavigationCore } from '../../core/NavigationCore.js';
import * as BuildingDataService from '../../domains/buildings/data/domain/buildingService.js';
import * as BuildingMapService from '../../domains/buildings/map/domain/buildingMapService.js';
import * as BuildingGraphService from '../../domains/buildings/graph/domain/buildingGraphService.js';
import * as BuildingWifiService from '../../domains/buildings/wifi/domain/buildingWifiService.js';
import * as BuildingMagneticService from '../../domains/buildings/magnetic/domain/buildingMagneticService.js';
import * as AuthService from '../../domains/users/domain/authService.js';
import { BuildingMapData } from '../../common/interfaces/BuildingMapData.js';
import { AppError } from '../../exceptions/app-error.js';
import HttpCode from '../../common/constants/http-codes.js';
import { NavigationMetaData } from '../../common/interfaces/NavigationMetaData.js';
import { getPOIById } from '../../common/utils/graph/utils.js';





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
            // @ts-ignore
            const requestData = JSON.parse(request);
            const requestBody = JSON.parse(requestData)
            // console.log("NAVIGATION REQUEST TYPE:","\n", 
            //     "RD:",requestData,typeof requestData,"\n",
            //     "RDP",requestBody,typeof requestBody,"\n",
            // );
            // console.log("body type:",requestBody.type);
            switch (requestBody.type) {
                case NavigationRequestType.START:
                    console.log("YAYYY START IS MUST YO")
                    const startResponse = await this._setupInitialData(requestBody as INavigationRequest<NavigationRequestType.START>);
                    return startResponse;
                    
                case NavigationRequestType.POSITION:
                    const posResponse = await this._getNextNavigationEvent(requestBody as INavigationRequest<NavigationRequestType.POSITION>)
                    return posResponse;
                    
                case NavigationRequestType.END:
                    console.log("YAYYY END IS MUST YO")
                    const stopResponse = await this._stopNavigationCleanup(requestBody as INavigationRequest<NavigationRequestType.END>)
                    return stopResponse;

                default:
                    return this.__response(NavigationResponseType.ERROR,{});
            }
        }catch(error){
            logger.error("error in navgiation mock route ");
            logger.error(error);
            throw error;
            return this.__response(NavigationResponseType.NONE,{});
        }

    }


    async _setupInitialData(request:INavigationRequest<NavigationRequestType.START>){
        try{
            //@ts-ignore            
            const payload = request.payload
            const {
                accessibility,
                buildingId,
                destinationPOIId,
                accessToken,
                isMock,
                mockInitialUserPosition,
            } = payload;

            if(isMock && !mockInitialUserPosition){
                throw new AppError("missing user positon ,in mocking ",HttpCode.NotFound,"is mock and not inisital user positon was provided",false)
            }

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
                isMock:isMock ? isMock: false,
                mockInitialUserPosition:isMock ? mockInitialUserPosition: null
                
            }
            const response = this.core.setup(meta);
            if (!response){
                throw new AppError("navigation init error",HttpCode.InternalServerError,"fail to setup navigation",false)
            }
            return this.__response(NavigationResponseType.START,{})

        }catch(error){
            console.error(error);
            return this.__response(NavigationResponseType.ERROR,{})
        }
    }


    async _getNextNavigationEvent(request:INavigationRequest<NavigationRequestType.POSITION>){
        if(!this.core.getIsInitializedSuccessfully()){
            return this.__response(NavigationResponseType.ERROR,{})
        }
        if(this.core.isMock && !this.core.currentRoute){
            try{
                const newRoute = this.core.getNewNavigationRoute();
                const {routeSVG,distance,timeLength} = newRoute
                return this.__response(NavigationResponseType.REROUTE,{
                    routeSVG,
                    distance,
                    timeLength,
                })
            }catch(error){
                console.error(error);
            }
        }
        //@ts-ignore
        const payload = request.payload;
        const spatialData = payload.spatialData;
        const timestamp = payload.timestamp;

        const isSendNewPosition =  await this.core.calculateNextState(spatialData,timestamp);

        const userPosition = this.core.getUserPosition();
        const isReached = this.core.getIsReachedDestination(userPosition);
        if (isReached){
            return this.__response(NavigationResponseType.END,{})
        }

        if(!this.core.currentRoute || this.core.getIsNeedNewRoute()){
            try{
                const newRoute = this.core.getNewNavigationRoute();
                const {routeSVG,distance,timeLength} = newRoute
                return this.__response(NavigationResponseType.REROUTE,{
                    routeSVG,
                    distance,
                    timeLength,
                })
            }catch(error){
                console.error(error);
            }
        }

        if(isSendNewPosition){
            return this.__response(NavigationResponseType.REPOSITION,{
                userPosition:userPosition,
                timestamp:timestamp
            })
        }
        
        return this.__response(NavigationResponseType.NONE,{})
    }


    async _stopNavigationCleanup(request:INavigationRequest<NavigationRequestType.END>){
        logger.info("navigation clean up");
        return this.__response(NavigationResponseType.STOP,{})
    }
}