import { MapCoordinates } from "../../../common/interfaces/MapCoordinates.js";
import { MapNode } from "../../../common/interfaces/MapNode.js";
import { MapPOI } from "../../../common/interfaces/MapPOI.js";
import { euclideanDistance } from "../../../common/utils/math/distance.js";

export function getNearestNode(coords:MapCoordinates,nodes:MapNode[]){
    let minDIstance = Infinity;
    let nearestNode = null;
    nodes.forEach((node) => {
        const distance = euclideanDistance(
            [coords.x,coords.y],
            [node.mapCoordinates.x, node.mapCoordinates.y])
        if (minDIstance > distance){
            minDIstance = distance;
            nearestNode = node;
        }
    })
    return nearestNode
}

export function getNearestPOINode(coords:MapCoordinates,nodes:MapNode[],POI:MapPOI){
    const poiNodes = nodes.filter((node)=>  node.POIId === POI.id)
    return getNearestNode(coords,poiNodes)
}