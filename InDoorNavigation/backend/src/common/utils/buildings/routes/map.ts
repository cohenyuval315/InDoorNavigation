import { MapEdge } from "../../../../common/interfaces/MapEdge";
import { MapFloor } from "../../../../common/interfaces/MapFloor";
import { MapNode } from "../../../../common/interfaces/MapNode";

const nodeRadius = 10;
const nodeColor = 'blue';
const strokeWidth = 10;
const strokeColor = 'blue';
const differentFloorStrokeWidth = 10;
const differentFloorStrokeColor = "green";


export const createFloorsPathSVG = (nodes: MapNode[],edges: MapEdge[],mapFloors: MapFloor[],width:number,height:number) => {
    const svgs: { floor: number, path: string }[] = [];
    
 
    
    const nodePositions: Map<string, { x: number, y: number, floor: number }> = new Map();
    nodes.forEach((node) => {
        nodePositions.set(node.id, { x: node.mapCoordinates.x, y: node.mapCoordinates.y, floor: node.mapCoordinates.floor });
    });
    
    
    
    mapFloors.forEach((mapFloor) => {
        const { floor } = mapFloor;
        const svgParts: string[] = [];
        // Filter nodes for the current floor
        const floorNodes = nodes.filter((node) => node.mapCoordinates.floor === floor);
        floorNodes.forEach((node) => {
            svgParts.push(`<circle cx="${node.mapCoordinates.x}" cy="${node.mapCoordinates.y}" r="${nodeRadius}" fill="${nodeColor}" />`);
        });

        edges.forEach((edge) => {
            const posA = nodePositions.get(edge.nodeA);
            const posB = nodePositions.get(edge.nodeB);
            if (posA && posB) {
                if (posA.floor === floor || posB.floor === floor){
                    // Check if nodes are on different floors
                    const isDifferentFloor = posA.floor !== posB.floor;
                    const edgeStrokeColor = isDifferentFloor ? differentFloorStrokeColor : strokeColor;
                    const edgeStrokeWidth = isDifferentFloor ? differentFloorStrokeWidth : strokeWidth;
                    
                    // Draw the line
                    svgParts.push(`<line x1="${posA.x}" y1="${posA.y}" x2="${posB.x}" y2="${posB.y}" stroke="${edgeStrokeColor}" stroke-width="${edgeStrokeWidth}" />`);
                
                }
            }

        });

        // Wrap SVG parts in SVG tags
        const svgContent = svgParts.join("\n");
        const floorSVG = `<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"  width="${width}" height="${height}"  viewBox="0 0 ${width} ${height}" version="1.1">${svgContent}</svg>`;
        svgs.push({
            floor: floor,
            path: floorSVG
        });
    });

    return svgs;
}