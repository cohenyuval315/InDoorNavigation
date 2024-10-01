
import mapEngine from "./index.js";
import { MapEdge } from "../common/interfaces/MapEdge.js";
import { MapNode } from "../common/interfaces/MapNode.js";
import { BuildingMapData } from "../common/interfaces/BuildingMapData.js";
import { WifiMap } from "../common/interfaces/WifiMap.js";
import { MagneticMap } from "../common/interfaces/MagneticMap.js";
import { NavigationMetaData } from "../common/interfaces/NavigationMetaData.js";
import logger from "../lib/logger/index.js";
import { filterEdgesByAccessibility, getRouteTotalWeight, removeIsolatedNodes } from "../common/utils/graph/utils.js";
import { MapPOI } from "../common/interfaces/MapPOI.js";
import { getShortestPath } from "./navigation/path-finding/shortest-path.js";
import { getNearestPOINode } from "./navigation/utils/nodes.js";

import { FloorRouteSVG } from "../common/interfaces/FloorRouteSVG.js";
import { MapEngine } from "./MapEngine.js";
import { UserSpatialState } from "../common/interfaces/engine/UserSpatialState.js";
import { UserSpatialInputData } from "../common/interfaces/engine/UserSpatialInputData.js";
import { AppError } from "../exceptions/app-error.js";
import HttpCode from "../common/constants/http-codes.js";
import { euclideanDistance, euclideanDistance3D } from "../common/utils/math/distance.js";
import { EngineConfig } from "../config/engine-config.js";
import { createRouteSVG } from "../common/utils/buildings/routes/route-svg.js";
import { getNearestPointOnRoute } from "../common/utils/buildings/routes/spatial-utils.js";




export class NavigationCore {
    
    engine:MapEngine
    userState:UserSpatialState
    _initialized:boolean;
    
    wifiMap:WifiMap
    magneticMap:MagneticMap
    destinationPOI:MapPOI;
    edges:MapEdge[];
    nodes:MapNode[];
    currentRoute:MapNode[] | undefined | null;
    distance:number
    timeLength:number

    buildingMapData:BuildingMapData
    isMock:boolean
    mockIndex:number
    mockStepIndex:number
    mockStepSize: number
    mockEdgeIndex:number
    stepSize:number
    startTimestamp:number
    mockMsCounter:number
    startDateTimestamp:Date
   

    constructor(){
        this._initialized = false;
        this.currentRoute = null;
        this.userState = null;
        this.stepSize = 1.6;
        this.isMock = false;
        this.mockMsCounter = 0;
        this.distance = 0;
        this.timeLength = 0;
        this.mockIndex = 0;
    }

    getIsInitializedSuccessfully(){
        return this._initialized
    }


    setup(navigationMetaData:NavigationMetaData){
        try{
            this.isMock = navigationMetaData.isMock;
            this.mockStepIndex = 0;
            this.mockEdgeIndex = 0;
            this.mockIndex = 0;
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
            this.startTimestamp = performance.now();
            this.userState = {
                meta:navigationMetaData,
                position:navigationMetaData.isMock ? 
                    {
                        ...navigationMetaData.mockInitialUserPosition,
                        z:0,
                        heading:0,
                    }: null,
                state: {
                    data:this._setupInitialStateData()
                },
                timestamp: this.startTimestamp
            }
            this.startDateTimestamp = new Date();
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

    async calculateNextState(userSpatialData:UserSpatialInputData,timestamp:any){
        if(!this._initialized){
            throw new AppError("not init",HttpCode.InternalServerError,"not init calcalculate next state",false);
        }
        let newState = null;
        if (this.isMock){
            console.log("inMock", timestamp);
            newState = this.getNextMockState();
        }else{
            newState = await this.engine.calculateNextUserState(
                this.userState,
                userSpatialData,
                this.buildingMapData,
                this.wifiMap,
                this.magneticMap
            );
        }
        if(newState){
            this.userState = newState;
            return true;
        }else{
            logger.error("could not update new state, its udnefined or null");
        }
    }

    getUserPosition(){
        return this.userState.position;
    }

    getNextMockState(){
        const numIterations = this.currentRoute.length - 1; // 3 nodes -> 2 iterations 
        try{
            if(this.mockEdgeIndex > numIterations - 1){ // index: 0, 1 
                const prevNode = this.currentRoute[this.currentRoute.length - 2];
                const endNode = this.currentRoute[this.currentRoute.length - 1];
        
                const px = prevNode.mapCoordinates.x
                const py = prevNode.mapCoordinates.y
                const pf = prevNode.mapCoordinates.floor
        
                const nx = endNode.mapCoordinates.x
                const ny = endNode.mapCoordinates.y
                const nf = endNode.mapCoordinates.floor
        
                const dx = nx - px;
                const dy = ny - py;
                let heading = Math.atan2(dy, dx); // heading 0 = pointing right
                heading = (Math.PI / 2) + heading; // adjust the radians so heading 0 will point upwards.
        
                const newState = {
                    floor:nf,
                    heading:heading,
                    x:nx,
                    y:ny,
                    z:0
                }

                return newState;

                // console.warn("route:",this.currentRoute,"current:",this.userState.position,"target:",this.currentRoute[this.currentRoute.length - 1].mapCoordinates)


            }
        }catch(error){
            throw new AppError("error mock edge index",HttpCode.InternalServerError,"mock edge index error",false);
        }
        // const velocity = this.stepSize / 1000;
        const prevTimestamp:any = this.userState.timestamp
        
        const newTimestamp = performance.now();
        const dt = newTimestamp - prevTimestamp;

        if (dt <= 0){
            return null
        }
        if(this.mockMsCounter < 1000){
            this.mockMsCounter += dt;
            console.log("MS COUNTER:", this.mockMsCounter)
            this.userState = {
                ...this.userState,
                timestamp:newTimestamp
            }
            return null;
        }        

        this.mockMsCounter = 0;

        const prevNode = this.currentRoute[this.mockEdgeIndex];
        const nextNode = this.currentRoute[this.mockEdgeIndex + 1];

        const px = prevNode.mapCoordinates.x
        const py = prevNode.mapCoordinates.y
        const pf = prevNode.mapCoordinates.floor

        const nx = nextNode.mapCoordinates.x
        const ny = nextNode.mapCoordinates.y
        const nf = nextNode.mapCoordinates.floor

        const dx = nx - px;
        const dy = ny - py;
        let heading = Math.atan2(dy, dx); // heading 0 = pointing right
        heading = (Math.PI / 2) + heading; // adjust the radians so heading 0 will point upwards.

        const distance = euclideanDistance([px,py],[nx,ny]);
        const totalSteps = Math.ceil(distance / (this.stepSize * this.buildingMapData.scale));
        const stepProgressRatio = this.mockStepIndex / totalSteps;

        let currentX = px + stepProgressRatio * dx;
        let currentY = py + stepProgressRatio * dy;

        if (this.mockStepIndex === totalSteps - 1){
            currentX = px;
            currentY = py;
        }

        const currentFloor = this.mockStepIndex >= Math.ceil(totalSteps / 2) ? nf : pf;
        

        this.mockIndex += 1;
        // const position = this.userState.position;
        const newState = {
            ...this.userState,
            position:{
                floor:currentFloor,
                heading:heading,
                x:currentX,
                y:currentY,
                z:0
            },
            timestamp:newTimestamp
        }


        console.log(
            "numberNodes:",this.currentRoute.length, "\n",
            "mockEdgeIndex",this.mockEdgeIndex, "\n",
            "mockStepIndex",this.mockStepIndex, "\n",
            "distance:",distance, "\n",
            "totalSteps",totalSteps, "\n",
            // "stepProgressRatio",stepProgressRatio, "\n",

            // "prevNode",prevNode.mapCoordinates, "\n",
            // "nextNode",nextNode.mapCoordinates, "\n",
            
            // "before position",position, "\n",
            // "new state position",newState.position, "\n",
            // "currentX:",currentX, "\n",
            // "currentY:",currentY, "\n",
        )

        if (this.mockStepIndex === totalSteps - 1){
            this.mockEdgeIndex += 1;
            this.mockStepIndex = 0;   
        }else{
            this.mockStepIndex += 1;   
        }     

        return newState;
    }


    getNewNavigationRoute():{routeSVG:FloorRouteSVG[], distance:number,timeLength:number}{
        // console.log("get nearest node",this.userState.position,this.nodes,this.destinationPOI);
        const destinationNode = getNearestPOINode(this.userState.position,this.nodes,this.destinationPOI);
        if(!destinationNode){
            throw new AppError("not destinationNode",HttpCode.InternalServerError,"destinationNode",false);
        }
        const {nodesRoute,currentLocationNode,virtualEdge} = getShortestPath(this.userState.position,this.nodes,this.edges,destinationNode);
        const normalEdges = [...this.edges,virtualEdge];

        // console.log("get shorted path");

        if(!nodesRoute){
            throw new AppError("not newNodesRoute",HttpCode.InternalServerError,"not init calcalculate next state",false);
        }
        // console.log("get floor svgs");
        // console.log(this.buildingMapData.mapWidth, this.buildingMapData.mapHeight)
        const FloorsRouteSVG = createRouteSVG(nodesRoute,normalEdges,this.buildingMapData.mapWidth, this.buildingMapData.mapHeight,this.buildingMapData.mapFloors);
        if(!FloorsRouteSVG){
            throw new AppError("FloorsRouteSVG init",HttpCode.InternalServerError,"not FloorsRouteSVG calcalculate next state",false);
        }

        // console.log("get distance");
        const totalDistance = getRouteTotalWeight(nodesRoute,normalEdges);
        if(!totalDistance){
            throw new AppError("not totalDistance",HttpCode.InternalServerError,"not totalDistance calcalculate next state",false);
        }
        // console.log("get timelength");
        const timeLength = totalDistance / EngineConfig.AVERAGE_STEP_SPEED_MS
        if(!timeLength){
            throw new AppError("not timeLength",HttpCode.InternalServerError,"not timeLength calcalculate next state",false);
        }
        // console.log("assign the node route ");
        this.currentRoute = nodesRoute;
        this.distance = totalDistance;
        this.timeLength = timeLength

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
            if (distance > EngineConfig.REROUTE_DISTANCE_THRESHOLD){
                return true;
            }
        }
        return false;
    }

    get3DDistanceFromPosition(dz:number,dx:number,dy:number){
        const position = this.userState.position;
        const x = position.x;
        const y = position.y;
        const z = position.z;
        const distance = euclideanDistance3D([x,y,z],[dx,dy,dz]);
        return distance
    }

    getDistanceFromPosition(position:any,floor:number,dx:number,dy:number){
        if(floor !== position.floor){
            return null;
        }
        const x = position.x;
        const y = position.y;
        const distance = euclideanDistance([x,y],[dx,dy]);
        return distance
    }

    getIsReachedDestination(position:any){
        if(!this.currentRoute){
            return false;;
        }
        const destinationNode = this.currentRoute[this.currentRoute.length - 1]
        const distance = this.getDistanceFromPosition(
            position,
            destinationNode.mapCoordinates.floor,
            destinationNode.mapCoordinates.x,
            destinationNode.mapCoordinates.y
        )
        // console.log("DISTANCE FROM DESTINATION:",distance, "position:",position, "destination:",this.destinationPOI.center);
        console.log("DISTANCE FROM DESTINATION:",distance);
        if (distance === null){
            return false
        }
        if (distance <= EngineConfig.REACHED_DESTINATION_THRESHOLD_METERS){
            return true;
        }
        return false;
    }






}