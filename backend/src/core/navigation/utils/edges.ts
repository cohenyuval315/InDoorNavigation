import { MapCoordinates } from "@/common/interfaces/MapCoordinates";
import { MapEdge } from "@/common/interfaces/MapEdge";
import { MapNode } from "@/common/interfaces/MapNode";
import { euclideanDistance } from "@/common/utils/distance";

export function getEdgeNodes(nodes:MapNode[],edge:MapEdge){
    const nodeA = nodes.find((node) => node.id === edge.nodeA)
    const nodeB = nodes.find((node) => node.id === edge.nodeB)
    const edgeNodes = {
        nodeA: nodeA || null,
        nodeB: nodeB || null
    }
    return edgeNodes;
}

