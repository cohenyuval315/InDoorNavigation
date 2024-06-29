import { MapEdge } from "../../../common/interfaces/MapEdge.js";
import { MapNode } from "../../../common/interfaces/MapNode.js";

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
            // console.log(`Added edge ${edge.id}: ${edge.nodeA} <-> ${edge.nodeB}`);
        }
    }

    addEdges(edges: MapEdge[]): void {
        for (const edge of edges) {
            this.addEdge(edge);
        }
    }

    shortestPath(startId: string, endId: string): MapNode[] {
        const pq: [number, string][] = [];
        const distances: Map<string, number> = new Map();
        const previous: Map<string, string | null> = new Map();
    
        // Initialize distances and previous maps
        for (const nodeId of this.nodes.keys()) {
            distances.set(nodeId, Infinity);
            previous.set(nodeId, null);
        }
        distances.set(startId, 0);
        pq.push([0, startId]);
    
        // Logging initial setup
        // console.log("Starting shortest path calculation...");
        // console.log("Nodes:", this.nodes);
        // console.log("Edges:", this.edges);
        // console.log("Adjacency List:", this.adjacencyList);
        // console.log("Starting node:", startId);
        // console.log("Ending node:", endId);
    
        // Main algorithm loop
        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]); // Min-heap sort
            const [currentDistance, currentNode] = pq.shift()!;
    
            // console.log(`Processing node ${currentNode} with distance ${currentDistance}`);
    
            if (currentDistance > distances.get(currentNode)!) {
                // console.log(`Skipping node ${currentNode} with distance ${currentDistance} because it's not optimal.`);
                continue;
            }
    
            for (const { neighbor, weight } of this.adjacencyList.get(currentNode)!) {
                const distance = currentDistance + weight;
                // console.log(`Checking neighbor ${neighbor} with weight ${weight}. Current distance to ${neighbor}: ${distances.get(neighbor)}`);
    
                if (distance < distances.get(neighbor)!) {
                    // console.log(`Found shorter path to ${neighbor} through ${currentNode}. New distance: ${distance}`);
                    distances.set(neighbor, distance);
                    previous.set(neighbor, currentNode);
                    pq.push([distance, neighbor]);
                } else {
                    // console.log(`Path to ${neighbor} through ${currentNode} is not shorter. Current distance: ${distances.get(neighbor)}`);
                }
            }
        }
    
        // Path reconstruction
        const path: MapNode[] = [];
        let currentNode: string | null = endId;
    
        while (currentNode) {
            const node = this.nodes.get(currentNode);
            if (node) {
                path.unshift(node);
            }
            currentNode = previous.get(currentNode);
        }
    
        // Logging final path
        // console.log("Computed shortest path:", path.map(node => node.id));
    
        return path.length > 0 && path[0].id === startId ? path : [];
    }

    
    validateConnectivity(): boolean {
        if (this.nodes.size === 0) {
            // No nodes in the graph
            return true;
        }
    
        const visited: Set<string> = new Set();
        const queue: string[] = [];
    
        // Start BFS from any node (using the first node)
        const startNodeId = this.nodes.keys().next().value;
        queue.push(startNodeId);
        visited.add(startNodeId);
    
        // Perform BFS
        while (queue.length > 0) {
            const currentNode = queue.shift()!;
            for (const { neighbor } of this.adjacencyList.get(currentNode)!) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    
        // Check if all nodes were visited
        if (visited.size === this.nodes.size) {
            // Graph is connected, no isolated nodes
            return true;
        } else {
            // Graph is not connected, there are isolated nodes
            console.warn("Graph is not fully connected. Visited nodes:", Array.from(visited));
    
            // Find isolated nodes
            const isolatedNodes: string[] = [];
            for (const nodeId of this.nodes.keys()) {
                if (!visited.has(nodeId)) {
                    isolatedNodes.push(nodeId);
                }
            }
            console.log("Isolated nodes:", isolatedNodes);
    
            return false;
        }
    }
    
    
}

export default MapGraph;
