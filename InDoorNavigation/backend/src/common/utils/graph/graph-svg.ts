import { Direction } from "../../enums/Direction.js";
import { MapEdge } from "../../interfaces/MapEdge.js";
import { MapFloor } from "../../interfaces/MapFloor.js";
import { MapNode } from "../../interfaces/MapNode.js";

function getArrowPosition(x:number, y:number, direction:string,arrowOffset:number) {
    switch (direction) {
        case Direction.UP:
            return { x: x, y: y - arrowOffset, symbol: '↑' };
        case Direction.DOWN:
            return { x: x, y: y + arrowOffset, symbol: '↓' };
        case Direction.LEFT:
            return { x: x - arrowOffset, y: y, symbol: '←' };
        case Direction.RIGHT:
            return { x: x + arrowOffset, y: y, symbol: '→' };
        default:
            return { x, y, symbol: '' };
    }
}

export function generateGraphMaps(poiColorMap:any,nodes:MapNode[], edges:MapEdge[],svgMaps: MapFloor[]) {
    const nodeRadius = 5; // Radius for the node points
    const arrowSize = 12; // Size for the arrow signs
    const arrowOffset = 2; // Distance of the arrow from the node center

    const graphMaps = svgMaps.map((mapSvg) => {
        const {width,height,floor} = mapSvg;
        const svgParts = [
            `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" version="1.1">`
        ];
        // Create nodes
        const nodesOnFloor = nodes.filter(node => node.mapCoordinates.floor === floor);
        const nodesOnHalfFloor = nodes.filter(node => node.mapCoordinates.floor === floor - 0.5 || node.mapCoordinates.floor === floor + 0.5);

        // Create nodes
        nodesOnFloor.forEach(node => {
            const { x, y } = node.mapCoordinates;
            const nodeColor = node.POIId == null ? "black" : poiColorMap[node.POIId]
            svgParts.push(`<circle cx="${x}" cy="${y}" r="${nodeRadius}" fill-opacity="0.5" fill="${nodeColor}" />`);
            node.availableHeadings.forEach(direction => {
                const arrowPos = getArrowPosition(x, y, direction,arrowOffset);
                svgParts.push(`<text x="${arrowPos.x}" y="${arrowPos.y}" font-size="${arrowSize}" fill="green" text-anchor="middle" alignment-baseline="middle">${arrowPos.symbol}</text>`);
            });     
        });

        nodesOnHalfFloor.forEach(node => {
            const { x, y } = node.mapCoordinates;
            const nodeColor = node.POIId == null ? "black" : poiColorMap[node.POIId]
            svgParts.push(`<circle cx="${x}" cy="${y}" r="${nodeRadius}" fill-opacity="0.5" fill="${nodeColor}" />`);
            node.availableHeadings.forEach(direction => {
                const arrowPos = getArrowPosition(x, y, direction,arrowOffset);
                svgParts.push(`<text x="${arrowPos.x}" y="${arrowPos.y}" font-size="${arrowSize}" fill="green" text-anchor="middle" alignment-baseline="middle">${arrowPos.symbol}</text>`);
            });     
        });

        // Create edges
        edges.forEach(edge => {
            const nodeA = nodes.find(node => node.id === edge.nodeA && node.mapCoordinates.floor === floor);
            const nodeB = nodes.find(node => node.id === edge.nodeB && node.mapCoordinates.floor === floor);
            if (nodeA && nodeB) {
                const { x: x1, y: y1 } = nodeA.mapCoordinates;
                const { x: x2, y: y2 } = nodeB.mapCoordinates;
                svgParts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" fill-opacity="0.3" stroke="black" />`);
            }
        });

        edges.forEach(edge => {
            const nodeA = nodes.find(node => node.id === edge.nodeA && node.mapCoordinates.floor === floor - 0.5);
            const nodeB = nodes.find(node => node.id === edge.nodeB && node.mapCoordinates.floor === floor - 1);
            if (nodeA && nodeB) {
                const { x: x1, y: y1 } = nodeA.mapCoordinates;
                const { x: x2, y: y2 } = nodeB.mapCoordinates;
                svgParts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" fill-opacity="0.3" stroke="red" />`);
            }
        });

        edges.forEach(edge => {
            const nodeA = nodes.find(node => node.id === edge.nodeA && node.mapCoordinates.floor === floor - 1);
            const nodeB = nodes.find(node => node.id === edge.nodeB && node.mapCoordinates.floor === floor - 0.5);
            if (nodeA && nodeB) {
                const { x: x1, y: y1 } = nodeA.mapCoordinates;
                const { x: x2, y: y2 } = nodeB.mapCoordinates;
                svgParts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" fill-opacity="0.3" stroke="red" />`);
            }
        });

        edges.forEach(edge => {
            const nodeA = nodes.find(node => node.id === edge.nodeA && node.mapCoordinates.floor === floor - 0.5);
            const nodeB = nodes.find(node => node.id === edge.nodeB && node.mapCoordinates.floor === floor - 0.5);
            if (nodeA && nodeB) {
                const { x: x1, y: y1 } = nodeA.mapCoordinates;
                const { x: x2, y: y2 } = nodeB.mapCoordinates;
                svgParts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" fill-opacity="0.3" stroke="green" />`);
            }
        });

        edges.forEach(edge => {
            const nodeA = nodes.find(node => node.id === edge.nodeA && node.mapCoordinates.floor !== floor);
            const nodeB = nodes.find(node => node.id === edge.nodeB && node.mapCoordinates.floor === floor);
            if (nodeA && nodeB) {
                const { x: x1, y: y1 } = nodeA.mapCoordinates;
                const { x: x2, y: y2 } = nodeB.mapCoordinates;
                svgParts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" fill-opacity="0.3" stroke="red" />`);
            }
        });
        
        edges.forEach(edge => {
            const nodeA = nodes.find(node => node.id === edge.nodeA && node.mapCoordinates.floor === floor);
            const nodeB = nodes.find(node => node.id === edge.nodeB && node.mapCoordinates.floor !== floor);
            if (nodeA && nodeB) {
                const { x: x1, y: y1 } = nodeA.mapCoordinates;
                const { x: x2, y: y2 } = nodeB.mapCoordinates;
                svgParts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" fill-opacity="0.3" stroke="red" />`);
            }
        });

        svgParts.push(`</svg>`);
        const map = svgParts.join('\n');        
        return {
            floor,
            map
        }
    })

    return graphMaps;
}
