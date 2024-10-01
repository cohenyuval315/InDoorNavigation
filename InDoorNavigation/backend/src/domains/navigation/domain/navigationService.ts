import * as buildingGraphService from '../../buildings/graph/domain/buildingGraphService.js';
import * as buildingMapService from '../../buildings/map/domain/buildingMapService.js';

import { MapCoordinates } from "../../../common/interfaces/MapCoordinates.js";
import { MapAccessibility } from "../../../common/interfaces/MapAccessibility.js";
import { AppError } from "../../../exceptions/app-error.js";
import HttpCode from "../../../common/constants/http-codes.js";
import { getShortestPath } from "../../../core/navigation/path-finding/shortest-path.js";
import { logger } from "../../../lib/logger/logger.js";
import { IRouteNavigationResponsePayload } from "../../../websockets/navigation/NavigationResponse.js";
import { FloorRouteSVG } from "../../../common/interfaces/FloorRouteSVG.js";
import { filterEdgesByAccessibility, findNearestNode, getPOIById, getPOINode, getRouteTotalWeight, removeIsolatedNodes } from '../../../common/utils/graph/utils.js';
import { createFloorsPathSVG } from '../../../common/utils/buildings/routes/map.js';
import { EngineConfig } from '../../../config/engine-config.js';


export const getNavigationRoute = async (buildingId:string,userPosition:MapCoordinates,destinationPOIId:string,accessibility:MapAccessibility) => {
    const graphData = await buildingGraphService.getBuildingGraphMapData(buildingId)
    if (!graphData){
        throw new AppError("building graph not found",HttpCode.NotFound,"getNavigationRoute building graph not found",false);
    }
    const buildingMapData = await buildingMapService.getBuildingMapData(buildingId)
    if (!buildingMapData){
        throw new AppError("building map not found",HttpCode.NotFound,"getNavigationRoute building map not found",false);
    }

    const {POIs,mapHeight,mapWidth} = buildingMapData;
    const {edges,nodes} = graphData;

    const destinationPOI = getPOIById(POIs,destinationPOIId);
    if (!destinationPOI){
        logger.error("no destination poi");
        return null;        
    }
    const destinationNode = getPOINode(destinationPOI,nodes)
    if (!destinationNode){
        logger.error("no destination node");
        return null;
    }

    const filteredEdges = filterEdgesByAccessibility(edges,accessibility);
    const filteredNodes = removeIsolatedNodes(filteredEdges,nodes);


    const {nodesRoute,currentLocationNode,virtualEdge} = getShortestPath(userPosition,filteredNodes,filteredEdges,destinationNode)
    const normalEdges = [...edges,virtualEdge]

    if (!nodesRoute){
        logger.error("no shortest path")
        return null;
    }
    
    const pathsFloors = createFloorsPathSVG(nodesRoute,normalEdges,buildingMapData.mapFloors,mapWidth,mapHeight);
    const totalWeight = getRouteTotalWeight(nodesRoute,normalEdges);
    const scale = buildingMapData.scale;
    const totalDistance = totalWeight / scale;
    const inOrderPathsFloors:FloorRouteSVG[] = pathsFloors.sort((a,b) => a.floor - b.floor)
    
    const data:IRouteNavigationResponsePayload = {
        routeSVG:inOrderPathsFloors,
        distance:totalDistance,
        timeLength:totalDistance / EngineConfig.AVERAGE_METER_PER_SECOND_WALK_SPEED
    }
    return data;
    

}


