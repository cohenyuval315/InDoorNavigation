import { MapFloor } from "@/common/interfaces/MapFloor";

export function getNearestFloor(altitude:number, mapFloors:MapFloor[]) {
    try{
        let closestFloor = null;
        let minDifference = Infinity;

        mapFloors.forEach((mapFloor) => {
            const difference = Math.abs(mapFloor.altitude - altitude);
            if (minDifference > difference) {
                minDifference = difference;
                closestFloor = mapFloor.floor;
            }
        })
        return closestFloor;
    
    }catch(err){

    }   
}

export function getCumulativeFloorHeight(floor: number, mapFloors: MapFloor[]): number {
    let cumulativeHeight = 0;
    mapFloors.forEach((mapFloor) => {
        if(mapFloor.floor <= floor){
            cumulativeHeight += mapFloor.floorHeight;
        }
    })
    return cumulativeHeight;
}

export function getFloorHeight(floor: number, mapFloors: MapFloor[]): number {
    let cumulativeHeight = 0;
    mapFloors.forEach((mapFloor) => {
        if(mapFloor.floor < floor){
            cumulativeHeight += mapFloor.floorHeight;
        }
    })
    return cumulativeHeight;
}


export function getMinFloor(mapFloors: MapFloor[]){
    return mapFloors.reduce((a, b) => {
        return a.floor < b.floor ? a : b;
    }).floor;
}

export function getMaxFloor(mapFloors: MapFloor[]){
    return mapFloors.reduce((a, b) => {
        return a.floor > b.floor ? a : b;
    }).floor;
}

export function getMumFloors(mapFloors: MapFloor[]){
    return mapFloors.length;
}