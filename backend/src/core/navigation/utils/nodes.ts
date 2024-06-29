import { MapCoordinates } from "@/common/interfaces/MapCoordinates";
import { MapNode } from "@/common/interfaces/MapNode";
import { MapPOI } from "@/common/interfaces/MapPOI";
import { euclideanDistance } from "@/common/utils/distance";

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