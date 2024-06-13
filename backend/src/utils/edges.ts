import { SegmentPathType } from "../constants/constants";
import MapAccessibility from "../core/path-finding/MapAccessibility";
import MapEdge from "../core/path-finding/MapEdge";
import MapNode from "../core/path-finding/MapNode";


function calculateDistance(nodeA:MapNode, nodeB:MapNode,floorHeights:object) {
    const coordA = nodeA.mapCoordinates;
    const coordB = nodeB.mapCoordinates;

    const deltaX = coordB.x - coordA.x;
    const deltaY = coordB.y - coordA.y;
    const deltaZ = (floorHeights[coordB.floor] || 0) - (floorHeights[coordA.floor] || 0);

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
}


export function getEdgesWithIds(edges:MapEdge[]){
    const edgesWithId = edges.map(edge => {
        edge.id = edge.nodeA + edge.nodeB;
        return edge;
    });
    return edgesWithId;
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
