import MapEdge from "./MapEdge";
import MapNode from "./MapNode";

class MapGraph {
    nodes: Map<string, MapNode>;
    edges: Map<string, MapEdge>;
    adjacencyList: Map<string, { neighbor: string, weight: number }[]>;

    constructor() {
        this.nodes = new Map();
        this.edges = new Map();
        this.adjacencyList = new Map();
    }

    addNode(node: MapNode): void {
        this.nodes.set(node.id, node);
        this.adjacencyList.set(node.id, []);
    }

    addNodes(nodes: MapNode[]): void {
        for (const node of nodes) {
            this.addNode(node);
        }
    }

    addEdge(edge: MapEdge): void {
        if (edge.isAvailable) {
            this.edges.set(edge.id, edge);
            const weight = edge.weight ?? 1.0;
            this.adjacencyList.get(edge.nodeA)?.push({ neighbor: edge.nodeB, weight });
            this.adjacencyList.get(edge.nodeB)?.push({ neighbor: edge.nodeA, weight });
        }
    }

    addEdges(edges: MapEdge[]): void {
        for (const edge of edges) {
            this.addEdge(edge);
        }
    }

    shortestPath(startId: string, endId: string): string[] {
        const pq: [number, string][] = [];
        const distances: Map<string, number> = new Map();
        const previous: Map<string, string | null> = new Map();

        for (const nodeId of this.nodes.keys()) {
            distances.set(nodeId, Infinity);
            previous.set(nodeId, null);
        }
        distances.set(startId, 0);
        pq.push([0, startId]);

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]); // Min-heap
            const [currentDistance, currentNode] = pq.shift()!;

            if (currentDistance > distances.get(currentNode)!) continue;

            for (const { neighbor, weight } of this.adjacencyList.get(currentNode)!) {
                const distance = currentDistance + weight;
                if (distance < distances.get(neighbor)!) {
                    distances.set(neighbor, distance);
                    previous.set(neighbor, currentNode);
                    pq.push([distance, neighbor]);
                }
            }
        }

        const path: string[] = [];
        let currentNode: string | null = endId;

        while (currentNode) {
            path.unshift(currentNode);
            currentNode = previous.get(currentNode);
        }

        return path[0] === startId ? path : [];
    }
}

export default MapGraph;
