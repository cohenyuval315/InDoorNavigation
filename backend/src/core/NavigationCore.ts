
import mapEngine from "./boot";
import { MapEdge } from "@/common/interfaces/MapEdge";
import { MapNode } from "@/common/interfaces/MapNode";
import { BuildingMapData } from "../common/interfaces/BuildingMapData";
import { MapCoordinates } from "@/common/interfaces/MapCoordinates";
import { WifiMap } from "@/common/interfaces/WifiMap";
import { MagneticMap } from "@/common/interfaces/MagneticMap";
import { NavigationMetaData } from "@/common/interfaces/NavigationMetaData";
import logger from "@/lib/logger";
import { filterEdgesByAccessibility, getRouteTotalWeight, removeIsolatedNodes } from "../common/utils/utils";
import { MapPOI } from "@/common/interfaces/MapPOI";
import { getShortestPath } from "./navigation/path-finding/shortest-path";
import { getNearestPOINode } from "./navigation/utils/nodes";
import { createRouteSVG } from "../common/utils/routes/route-svg";
import { getNearestPointOnRoute } from "../common/utils/routes/spatial-utils";
import { FloorRouteSVG } from "@/common/interfaces/FloorRouteSVG";
import { MapEngine } from "./engine";
import { UserSpatialState } from "@/common/interfaces/engine/UserSpatialState";
import { UserSpatialInputData } from "@/common/interfaces/engine/UserSpatialInputData";
import { EngineConfiguration } from "@/config/EngineConfiguration";
import { AppError } from "@/exceptions/app-error";
import HttpCode from "@/common/constants/http-codes";


const newRouteDistanceThreshold = 10


export class NavigationCore {
    
    engine:MapEngine
    userState:UserSpatialState
    _initialized:boolean;
    
    wifiMap:WifiMap
    magneticMap:MagneticMap
    destinationPOI:MapPOI;
    edges:MapEdge[];
    nodes:MapNode[];
    currentRoute:any
    buildingMapData:BuildingMapData

    constructor(){
        this._initialized = false;
        this.currentRoute = null;
        this.userState = null;
    }

    getIsInitializedSuccessfully(){
        return this._initialized
    }


    setup(navigationMetaData:NavigationMetaData){
        try{

            const {buildingGraphData,buildingMagneticMap,buildingMapData,buildingWifiMap} = navigationMetaData;
            this.buildingMapData = buildingMapData;
            this.wifiMap = buildingWifiMap;
            this.magneticMap = buildingMagneticMap;
            const {edges,nodes,destinationPOI,accessibility} = buildingGraphData;
            const filteredEdges = filterEdgesByAccessibility(edges,accessibility);
            const filteredNodes = removeIsolatedNodes(filteredEdges,nodes);
            this.nodes = filteredNodes;
            this.edges = filteredEdges;
            this.destinationPOI = destinationPOI;
    
            this.userState = {
                meta:navigationMetaData,
                position:null,
                state: {
                    data:this._setupInitialStateData()
                },
                timestamp: new Date()
            }
            this.engine = mapEngine;
        }catch(error){
            logger.error(error);
            return false;
        }
        this._initialized = true;
        return true;
    }

    _setupInitialStateData(){ // sensor fusion data
        return {}
    }

    async calculateNextState(userSpatialData:UserSpatialInputData){
        if(!this._initialized){
            throw new AppError("not init",HttpCode.InternalServerError,"not init calcalculate next state",false);
        }
        const newState = await this.engine.calculateNextUserState(
            this.userState,
            userSpatialData,
            this.buildingMapData,
            this.wifiMap,
            this.magneticMap
        );
        if(newState){
            this.userState = newState;
        }else{
            logger.error("could not update new state, its udnefined or null");
        }
    }

    getUserPosition(){
        return this.userState.position;
    }


    getNewNavigationRoute():{routeSVG:FloorRouteSVG[], distance:number,timeLength:number}{
        const destinationNode = getNearestPOINode(this.userState.position,this.nodes,this.destinationPOI);
        if(!destinationNode){
            throw new AppError("not destinationNode",HttpCode.InternalServerError,"destinationNode",false);
        }
        const newNodesRoute = getShortestPath(this.userState.position,this.nodes,this.edges,destinationNode);
        if(!newNodesRoute){
            throw new AppError("not newNodesRoute",HttpCode.InternalServerError,"not init calcalculate next state",false);
        }
        const FloorsRouteSVG = createRouteSVG(newNodesRoute,this.edges,this.buildingMapData.mapFloors);
        if(!FloorsRouteSVG){
            throw new AppError("FloorsRouteSVG init",HttpCode.InternalServerError,"not FloorsRouteSVG calcalculate next state",false);
        }
        const totalDistance = getRouteTotalWeight(newNodesRoute,this.edges);
        if(!totalDistance){
            throw new AppError("not totalDistance",HttpCode.InternalServerError,"not totalDistance calcalculate next state",false);
        }
        const timeLength = totalDistance / EngineConfiguration.AVERAGE_STEP_SPEED_MS
        if(!timeLength){
            throw new AppError("not timeLength",HttpCode.InternalServerError,"not timeLength calcalculate next state",false);
        }
        this.currentRoute = newNodesRoute;

        return {
            routeSVG:FloorsRouteSVG,
            distance:totalDistance,
            timeLength:timeLength
        }
    }

    getIsNeedNewRoute(){
        if(!this.currentRoute){
            return true;
        }else{
            const nearestRoutePoint = getNearestPointOnRoute(this.userState.position,this.currentRoute)
            const {distance,x,y} = nearestRoutePoint;
            if (distance > newRouteDistanceThreshold){
                return true;
            }
        }
        return false;
    }






}