import { MapEdge } from "@/common/interfaces/MapEdge";
import { MapNode } from "@/common/interfaces/MapNode";
import MapGraph from "../graph/MapGraph";
import { euclideanDistance } from "../../../common/utils/distance";
import { MapCoordinates } from "@/common/interfaces/MapCoordinates";
import { SegmentPathType, WaypointFacilityType, WaypointPathType } from "@/common/constants/constants";
import { calculateDirection } from "@/common/utils/direction";


export function getShortestPath(userPosition:MapCoordinates,nodes:MapNode[],edges:MapEdge[],destinationNode:MapNode){
    const buildingGraph = new MapGraph();
    
    const nearestNodeId = destinationNode.id
    const weightDistance = euclideanDistance(
        [destinationNode.mapCoordinates.x,destinationNode.mapCoordinates.y],
        [userPosition.x,userPosition.y]
    )
    const headingDirection = calculateDirection(userPosition, destinationNode.mapCoordinates);

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
        return nodesRoute
    }
}