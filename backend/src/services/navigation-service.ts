import { SegmentPathType, WaypointFacilityType, WaypointPathType } from "../constants/constants";
import MapAccessibility from "../core/path-finding/MapAccessibility";
import MapGraph from "../core/path-finding/MapGraph"
import MapNode from "../core/path-finding/MapNode";
import MapEdge from "../core/path-finding/MapEdge";

import * as BuildingService  from "./buildings-service";
import { filterEdgesByAccessibility, findNearestNode, removeIsolatedNodes } from "../utils/graph-utils";
import { calculateDirection, euclideanDistance } from "../utils/distance";


export const getNavigationRoute = async (buildingId:string,userPosition:MapCoordinates,destinationNodeId:string,accessability:MapAccessibility) => {
    const graphData = await BuildingService.getBuildingGraphMapData(buildingId)
    const edges = graphData.edges
    const nodes = graphData.nodes;
    const destinationNodeList = nodes.filter((node) => node.id === destinationNodeId)
    if (destinationNodeId.length !== 1){
        throw new Error("Destination Node Id is not valid")
    }
    const destinationNode = destinationNodeList[0];
    
    const buildingGraph = new MapGraph();
    const filteredEdges = filterEdgesByAccessibility(edges,accessability);
    const filteredNodes = removeIsolatedNodes(filteredEdges,nodes);

    buildingGraph.addEdges(filteredEdges);
    buildingGraph.addNodes(filteredNodes);

    const nearestNode = findNearestNode(userPosition,nodes)
    if (!nearestNode){
        throw new Error(" couldnt not find nearest node");
    }
    const nearestNodeId = nearestNode.id
    const weightDistance = euclideanDistance(
        nearestNode.mapCoordinates.x,
        nearestNode.mapCoordinates.y,
        userPosition.x,
        userPosition.y
    )
    const headingDirection = calculateDirection(userPosition, nearestNode.mapCoordinates);
    const virtualNodeId = "virtual"

    const currentLocationNode:MapNode = {
        id: virtualNodeId,
        title: "current location",
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

    buildingGraph.addNode(currentLocationNode);
    buildingGraph.addEdge(virtualEdge);
    const route = buildingGraph.shortestPath(currentLocationNode.id,destinationNode.id);
    

}

export const getNewNavigationRoute = async () => {
    // const pathLength = navigationRoute.length - 1; // Length of the path is the number of edges minus one
    // if (pathLength > distanceThreshold) {
    //     // Perform rerouting (this could involve recalculating the path using a different algorithm or adjusting parameters)
    //     // For simplicity, we'll just find a new path from the user's current node to the destination
    //     navigationRoute = graph.shortestPath(userNode, destinationNode, accessible);
    // }

}