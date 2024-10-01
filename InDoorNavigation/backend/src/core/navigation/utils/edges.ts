import { MapEdge } from "../../../common/interfaces/MapEdge.js";
import { MapNode } from "../../../common/interfaces/MapNode.js";


export function getEdgeNodes(nodes:MapNode[],edge:MapEdge){
    const nodeA = nodes.find((node) => node.id === edge.nodeA)
    const nodeB = nodes.find((node) => node.id === edge.nodeB)
    const edgeNodes = {
        nodeA: nodeA || null,
        nodeB: nodeB || null
    }
    return edgeNodes;
}

