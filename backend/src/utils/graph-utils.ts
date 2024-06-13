import { Direction, SegmentPathType } from "../constants/constants";
import MapAccessibility from "../core/path-finding/MapAccessibility";
import MapEdge from "../core/path-finding/MapEdge";
import MapNode from "../core/path-finding/MapNode";
import { euclideanDistance } from "./distance";


function calculateDistance(nodeA:MapNode, nodeB:MapNode,floorHeights) {
    const coordA = nodeA.mapCoordinates;
    const coordB = nodeB.mapCoordinates;

    const deltaX = coordB.x - coordA.x;
    const deltaY = coordB.y - coordA.y;
    const deltaZ = (floorHeights[coordB.floor] || 0) - (floorHeights[coordA.floor] || 0);

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
}


export function calculateEdgesWeights(nodes:MapNode[],edges:MapEdge[],floorHeights:object){
    const edgesWithWeights = edges.map(edge => {
        const nodeA = nodes.find(node => node.id === edge.nodeA);
        const nodeB = nodes.find(node => node.id === edge.nodeB);
        if (nodeA && nodeB) {
            const weight = calculateDistance(nodeA, nodeB,floorHeights);
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
                if(accessibility.stairs){
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
            const dist = euclideanDistance(x, y, node.mapCoordinates.x, node.mapCoordinates.y);
            if (dist < minDist) {
                minDist = dist;
                nearest = node;
            }
        }
    }
    return nearest;
}