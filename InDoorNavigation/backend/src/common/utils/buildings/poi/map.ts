import { MapPOI } from "../../../../common/interfaces/MapPOI.js";
import { MapFloor } from "../../../../common/interfaces/MapFloor.js";
import { getRandomColor } from "../../styles/color.js";

export function generateColorMap(POIs:MapPOI[],minFloor:number,maxFloor:number){
    const poiColorMap:any = {}
    for (let floor = minFloor; floor <= maxFloor; floor++) {
        const poisFloor = POIs.filter(poi => poi.floor === floor);
        poisFloor.forEach(poi => {
            const color = getRandomColor();
            poiColorMap[poi['id']] = color;
        })
    }
    return poiColorMap;
}

export function generatePOIsMaps(poiColorMap:any,POIs:MapPOI[], mapFloors:MapFloor[],width:number,height:number){
    const poisMaps:{floor:number,map:string}[] = [];
    mapFloors.forEach((floorMap:MapFloor) => {
        const {floor} = floorMap;
        const poisFloor = POIs.filter((poi) => poi.floor === floor);
        const svgParts = [
            `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" version="1.1">`
        ];
        poisFloor.forEach(poi => {
            const points = poi.mapArea.map(point => `${point.x},${point.y}`).join(' ');
            svgParts.push(`<polygon points="${points}" fill="${poiColorMap[poi['id']]}" fill-opacity="0.3" stroke="black" />`);
        });     
        svgParts.push(`</svg>`);
        const poiMap =  svgParts.join('\n').toString();  
        poisMaps.push({floor,map:poiMap});        
    })
    return poisMaps;   
}

