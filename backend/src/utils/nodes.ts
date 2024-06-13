import MapEdge from "../core/path-finding/MapEdge";
import MapNode from "../core/path-finding/MapNode";
import { euclideanDistance } from "./distance";

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