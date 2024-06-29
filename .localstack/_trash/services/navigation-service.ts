// import { SegmentPathType, WaypointFacilityType, WaypointPathType } from "../constants/constants";
// import MapAccessibility from "../core/path-finding/MapAccessibility";
// import MapGraph from "../core/path-finding/MapGraph"
// import MapNode from "../core/path-finding/MapNode";
// import MapEdge from "../core/path-finding/MapEdge";

// import * as BuildingService  from "./buildings-service";
// import { filterEdgesByAccessibility, findNearestNode, getRouteTotalWeight, removeIsolatedNodes } from "../utils/graph-utils";
// import { calculateDirection, euclideanDistance } from "../utils/distance";
// import { createFloorsPathSVG } from "../utils/maps-generation";
// import NoValidPathError from "../exceptions/no-valid-path-error";
// import { SystemConfig } from "../config/system-config";



// export const getNavigationInitialRoute = async (buildingId:string,userPosition:MapCoordinates,destinationPOIId:string,accessability:MapAccessibility) => {
//     const graphData = await BuildingService.getBuildingGraphMapData(buildingId)
//     if (!graphData){
//         throw new Error("invalid graph data");
//     }
//     const buildingMapData = await BuildingService.getBuildingMapData(buildingId)
//     if (!buildingMapData){
//         throw new Error("invalid map data");
//     }

    

//     const pois = buildingMapData.POIs.filter((poi) => poi.id === destinationPOIId);
    
//     if (pois.length !== 1){
//         throw new Error("Destination POI Id is not valid")
//     }

//     const destPOI = pois[0];
    
//     const edges = graphData.edges
//     const nodes = graphData.nodes;
//     const destinationNodeList = nodes.filter((node) => node.POIId === destPOI.id)
//     if (destinationNodeList.length !== 1){
//         throw new Error("error in nodes and pois, its not aligned")
//     }
//     const destinationNode = destinationNodeList[0];
    
//     const buildingGraph = new MapGraph();
//     const filteredEdges = filterEdgesByAccessibility(edges,accessability);
//     const filteredNodes = removeIsolatedNodes(filteredEdges,nodes);
    
//     buildingGraph.addNodes(filteredNodes);


//     const nearestNode = findNearestNode(userPosition,filteredNodes)
//     if (!nearestNode){
//         throw new Error(" couldnt not find nearest node");
//     }
//     const nearestNodeId = nearestNode.id
//     const weightDistance = euclideanDistance(
//         nearestNode.mapCoordinates.x,
//         nearestNode.mapCoordinates.y,
//         userPosition.x,
//         userPosition.y
//     )
//     const headingDirection = calculateDirection(userPosition, nearestNode.mapCoordinates);
//     const virtualNodeId = "virtual"

//     const currentLocationNode:MapNode = {
//         id: virtualNodeId,
//         title: "current location",
//         pathType: WaypointPathType.VIRTUAL,
//         facilityType: WaypointFacilityType.NONE,
//         POIId: null,
//         isAvailable: true,
//         availableHeadings: [headingDirection],
//         mapCoordinates: userPosition,
//     }    
    

//     const virtualEdge:MapEdge = {
//         id: "virtual_edge",
//         title: "virtual edge",
//         nodeA: virtualNodeId,
//         nodeB: nearestNodeId,
//         pathType: SegmentPathType.VIRTUAL,
//         isAvailable: true,
//         visualMapArea: null,
//         availableHeadings: [],
//         weight: weightDistance
//     }

//     buildingGraph.addNode(currentLocationNode);

//     buildingGraph.addEdges(filteredEdges);
//     buildingGraph.addEdge(virtualEdge);
    
    
//     const nodesRoute = buildingGraph.shortestPath(currentLocationNode.id,destinationNode.id);
//     if (nodesRoute.length === 0){
//         throw new NoValidPathError("no valid path found")
//     }

//     const pathsFloors = createFloorsPathSVG(nodesRoute,edges,buildingMapData.mapFloors);
//     const totalWeight = getRouteTotalWeight(nodesRoute,edges);
//     const unitInMeters = buildingMapData.unitInMeters;
//     const totalDistance = totalWeight * unitInMeters;
//     const inOrderPathsFloors = pathsFloors.sort((a,b) => a.floor - b.floor)
    
//     const data = {
//         pathsFloors:inOrderPathsFloors,
//         distance:totalDistance,
//         timeLength:totalDistance / SystemConfig.AVERAGE_METER_PER_SECOND_WALK_SPEED
//     }
//     return data;
    

// }

// // export const getNewNavigationRoute = async () => {
// //     // const pathLength = navigationRoute.length - 1; // Length of the path is the number of edges minus one
// //     // if (pathLength > distanceThreshold) {
// //     //     // Perform rerouting (this could involve recalculating the path using a different algorithm or adjusting parameters)
// //     //     // For simplicity, we'll just find a new path from the user's current node to the destination
// //     //     navigationRoute = graph.shortestPath(userNode, destinationNode, accessible);
// //     // }

// // }