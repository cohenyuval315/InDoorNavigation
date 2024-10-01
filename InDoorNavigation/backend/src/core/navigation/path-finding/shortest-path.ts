import { MapEdge } from "../../../common/interfaces/MapEdge.js";
import { MapNode } from "../../../common/interfaces/MapNode.js";
import MapGraph from "../graph/MapGraph.js";
import { euclideanDistance } from "../../../common/utils/math/distance.js";
import { MapCoordinates } from "../../../common/interfaces/MapCoordinates.js";
import { WaypointPathType } from "../../../common/enums/WaypointPathType.js";
import { WaypointFacilityType } from "../../../common/enums/WaypointFacilityType.js";
import { SegmentPathType } from "../../../common/enums/SegmentPathType.js";
import { findNearestNode } from "../../../common/utils/graph/utils.js";
import { logger } from "../../../lib/logger/logger.js";
import { calculateDirection } from "../../../common/utils/spatial/direction.js";



export function getShortestPath(userPosition:MapCoordinates,nodes:MapNode[],edges:MapEdge[],destinationNode:MapNode){
    const buildingGraph = new MapGraph();
    
    const nearestNode = findNearestNode(userPosition,nodes);
    if (!nearestNode){
        logger.error("no nearest node")
        return null;
    }

    const nearestNodeId = nearestNode.id
    const weightDistance = euclideanDistance(
        [nearestNode.mapCoordinates.x,nearestNode.mapCoordinates.y],
        [userPosition.x,userPosition.y]
    )
    const headingDirection = calculateDirection(userPosition, nearestNode.mapCoordinates);

    const virtualNodeId = "virtual"

    const currentLocationNode:MapNode = {
        id: virtualNodeId,
        title: "current-location",
        pathType: WaypointPathType.VIRTUAL,
        facilityType: WaypointFacilityType.NONE,
        POIId: null,
        isAvailable: true,
        availableHeadings: [headingDirection],
        mapCoordinates: userPosition,
    }    
    

    const virtualEdge:MapEdge = {
        id: "virtual_edge",
        title: "virtual edge",
        nodeA: virtualNodeId,
        nodeB: nearestNodeId,
        pathType: SegmentPathType.VIRTUAL,
        isAvailable: true,
        visualMapArea: null,
        availableHeadings: [],
        weight: weightDistance
    }

    buildingGraph.addNodes(nodes);
    buildingGraph.addNode(currentLocationNode);
    buildingGraph.addEdges(edges);
    buildingGraph.addEdge(virtualEdge);
        
    const nodesRoute = buildingGraph.shortestPath(currentLocationNode.id,destinationNode.id);
    if (nodesRoute.length === 0){
        return null
    }else{
        return {nodesRoute,currentLocationNode,virtualEdge}
    }
}