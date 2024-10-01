import { MapCoordinates } from "../../../../common/interfaces/MapCoordinates";
import { MapEdge } from "../../../../common/interfaces/MapEdge";
import { MapNode } from "../../../../common/interfaces/MapNode";
import { euclideanDistance } from "../../math/distance.js"
// function euclideanDistance(point1:number[], point2:number[]) {
//     const dx = point2[0] - point1[0];
//     const dy = point2[1] - point1[1];
//     return Math.sqrt(dx * dx + dy * dy);
// }


export function getNearestPointOnLineSegment(target: MapCoordinates, a: MapCoordinates, b: MapCoordinates) {
    const ap = { 
        x: target.x - a.x, 
        y: target.y - a.y 
    };
    const ab = { 
        x: b.x - a.x, 
        y: b.y - a.y 
    };
    const ab2 = ab.x * ab.x + ab.y * ab.y;
    const ap_ab = ap.x * ab.x + ap.y * ab.y;
    const t = Math.max(0, Math.min(1, ap_ab / ab2));

    return { 
        x: a.x + t * ab.x, 
        y: a.y + t * ab.y 
    };
}

export function getNearestPointOnRoute(coords:MapCoordinates,route:MapNode[]){
    let minDistance = Infinity;
    let point = {x:null,y:null};
    let temp = Infinity;
    for (let index = 0; index < route.length - 1; index++) {
        const current = route[index];
        const next = route[index + 1];
        if(coords.floor === current.mapCoordinates.floor){
            temp = euclideanDistance(
                [coords.x,coords.y],
                [current.mapCoordinates.x,current.mapCoordinates.y]
            )
            if (minDistance > temp){
                minDistance = temp;
                point = current.mapCoordinates;
            }
        }
        if(coords.floor === next.mapCoordinates.floor){
            temp = euclideanDistance(
                [coords.x,coords.y],
                [next.mapCoordinates.x,next.mapCoordinates.y]
            )
            if (minDistance > temp){
                minDistance = temp;
                point = next.mapCoordinates;
            }
        }
        if(coords.floor === current.mapCoordinates.floor && coords.floor === next.mapCoordinates.floor){
            const p = getNearestPointOnLineSegment(coords,current.mapCoordinates,next.mapCoordinates);
            temp = euclideanDistance(
                [coords.x,coords.y],
                [p.x,p.y]
            )
            if (minDistance > temp){
                minDistance = temp;
                point = p;
            }
        }
    }

    const {x,y} = point;
    return {
        x:x,
        y:y,
        distance:minDistance
    }
}


export function getRouteEdges(route:MapNode[],edges:MapEdge[]){ 
}