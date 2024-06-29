import { MapNode } from "@/common/interfaces/MapNode";
import { MapPOI } from "../interfaces/MapPOI.js";
import { MapEdge } from "../interfaces/MapEdge.js";
import { MapCoordinates } from "../interfaces/MapCoordinates.js";
import { euclideanDistance } from "./distance.js";
import { MapAccessibility } from "@/common/interfaces/MapAccessibility";
import { euclideanDistance3D } from "./distance.js";
import { MapFloor } from "@/common/interfaces/MapFloor";
import { getCumulativeFloorHeight } from "../utils/floor";
import { SegmentPathType } from "../enums/SegmentPathType.js";


export function getPOIById(POIs:MapPOI[], POIId:string){
    const poi = POIs.find((poi) => poi.id === POIId)
    return poi || null;
}

export function getPOINode(poi:MapPOI, nodes:MapNode[]){
    const poiNode = nodes.find((node) => node.POIId === poi.id)
    return poiNode || null;
}



export function calculateEdgesWeights(nodes:MapNode[],edges:MapEdge[],mapFloors:MapFloor[]){
    const edgesWithWeights = edges.map(edge => {
        const nodeA = nodes.find(node => node.id === edge.nodeA);
        const nodeB = nodes.find(node => node.id === edge.nodeB);
        if (nodeA && nodeB) {
            const c1 = nodeB.mapCoordinates;
            const c2 = nodeA.mapCoordinates;

            const floorHeight1 = getCumulativeFloorHeight(c1.floor,mapFloors);;
            const floorHeight2 = getCumulativeFloorHeight(c2.floor,mapFloors);;
        
            const weight = euclideanDistance3D(
                [c1.x,c1.y,floorHeight1],
                [c2.x,c2.y,floorHeight2]
            );
            return {
                ...edge,
                weight:weight
            }            
        }else{
            console.log(edge)
            throw new Error("invalid edge");
        }

    });
    return edgesWithWeights;
}

export function filterEdgesByAccessibility(edges:MapEdge[], accessibility:MapAccessibility){
    const filteredEdges = edges.filter((edge) => {
        switch(edge.pathType){
            case SegmentPathType.STAIRS:{
                if(accessibility.stairs == false){
                    return false;
                }
            }
        }
        return true;
    });
    return filteredEdges;
}


export function filterNodesByFloor(nodes:MapNode[], floor:number){
    const filteredNodes = nodes.filter(node => node.mapCoordinates.floor == floor);
    return filteredNodes;
}


export function removeIsolatedNodes(edges:MapEdge[], nodes:MapNode[]){
    const connectedNodeIds = new Set<string>();
    edges.forEach(edge => {
        connectedNodeIds.add(edge.nodeA);
        connectedNodeIds.add(edge.nodeB);
    });

    const filteredNodes = nodes.filter(node => connectedNodeIds.has(node.id));
    return filteredNodes;
}


export function findNearestNode(userPosition:MapCoordinates, nodes: MapNode[]): MapNode | null {
    let nearest: MapNode | null = null;
    const {x,y,floor} = userPosition;
    let minDist = Infinity;
    for (const node of nodes) {
        if (node.mapCoordinates.floor === floor) {
            const dist = euclideanDistance([x, y], [node.mapCoordinates.x, node.mapCoordinates.y]);
            if (dist < minDist) {
                minDist = dist;
                nearest = node;
            }
        }
    }
    return nearest;
}


export function getRouteTotalWeight(nodesRoute: MapNode[], edges: MapEdge[]): number {
    let totalDistance = 0;

    for (let i = 0; i < nodesRoute.length - 1; i++) {
        const currentNode = nodesRoute[i];
        const nextNode = nodesRoute[i + 1];

        // Find the edge connecting currentNode to nextNode
        const edge = edges.find(e => (e.nodeA === currentNode.id && e.nodeB === nextNode.id) ||
                                     (e.nodeB === currentNode.id && e.nodeA === nextNode.id));

        if (edge) {
            totalDistance += edge.weight || 0; // Assuming weight is the distance in meters
        }
    }

    return totalDistance;
}



export function getEdgesWithIds(edges:MapEdge[]){
    const edgesWithId = edges.map(edge => {
        edge.id = edge.nodeA + edge.nodeB;
        return edge;
    });
    return edgesWithId;
}

