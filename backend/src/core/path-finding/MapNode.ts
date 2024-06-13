import { SegmentPathType, WaypointFacilityType, WaypointPathType } from "../../constants/constants";
interface MapNode {
    id: string;
    title: string;
    pathType: WaypointPathType;
    facilityType: WaypointFacilityType;
    POIId: string | null;
    isAvailable: boolean;
    availableHeadings: string[];
    mapCoordinates: MapCoordinates;
}
export default MapNode;



// interface Edge {
//     id: string;
//     title: string;
//     nodeA: string;
//     nodeB: string;
//     pathType: SegmentPathType;
//     isAvailable: boolean;
//     visualMapArea: string | null;
//     availableHeadings: string[] | null;
//     weight: number | null;
// }

// class Graph {
//     nodes: Map<string, Node>;
//     edges: Map<string, Edge>;
//     adjacencyList: Map<string, { neighbor: string, weight: number }[]>;

//     constructor() {
//         this.nodes = new Map();
//         this.edges = new Map();
//         this.adjacencyList = new Map();
//     }

//     addNode(node: Node): void {
//         this.nodes.set(node.id, node);
//         this.adjacencyList.set(node.id, []);
//     }

//     addEdge(edge: Edge): void {
//         if (edge.isAvailable) {
//             this.edges.set(edge.id, edge);
//             const weight = edge.weight ?? 1.0;
//             this.adjacencyList.get(edge.nodeA)?.push({ neighbor: edge.nodeB, weight });
//             this.adjacencyList.get(edge.nodeB)?.push({ neighbor: edge.nodeA, weight });
//         }
//     }

//     shortestPath(startId: string, endId: string, accessible: boolean): string[] {
//         const pq: [number, string][] = [];
//         const distances: Map<string, number> = new Map();
//         const previous: Map<string, string | null> = new Map();

//         for (const nodeId of this.nodes.keys()) {
//             distances.set(nodeId, Infinity);
//             previous.set(nodeId, null);
//         }
//         distances.set(startId, 0);
//         pq.push([0, startId]);

//         while (pq.length > 0) {
//             pq.sort((a, b) => a[0] - b[0]); // Min-heap
//             const [currentDistance, currentNode] = pq.shift()!;

//             if (currentDistance > distances.get(currentNode)!) continue;

//             for (const { neighbor, weight } of this.adjacencyList.get(currentNode)!) {
//                 const edgeId = this.getEdgeId(currentNode, neighbor);
//                 const edge = this.edges.get(edgeId);

//                 if (accessible && edge?.pathType === SegmentPathType.STAIRS) continue;

//                 const distance = currentDistance + weight;

//                 if (distance < distances.get(neighbor)!) {
//                     distances.set(neighbor, distance);
//                     previous.set(neighbor, currentNode);
//                     pq.push([distance, neighbor]);
//                 }
//             }
//         }

//         const path: string[] = [];
//         let currentNode: string | null = endId;

//         while (currentNode) {
//             path.unshift(currentNode);
//             currentNode = previous.get(currentNode);
//         }

//         return path[0] === startId ? path : [];
//     }

//     private getEdgeId(nodeA: string, nodeB: string): string {
//         for (const edge of this.edges.values()) {
//             if ((edge.nodeA === nodeA && edge.nodeB === nodeB) || (edge.nodeA === nodeB && edge.nodeB === nodeA)) {
//                 return edge.id;
//             }
//         }
//         return "";
//     }
// }
