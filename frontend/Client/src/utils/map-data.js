import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./scaling";
import { isOpen, stringifySchedule } from "./schedule-formatter";


export const calculateBottomLeftOffset = (mapWidth, mapHeight, windowWidth, windowHeight) => {
    let bottomLeftX, bottomLeftY;
    const aspectRatio = mapWidth / mapHeight;

    if (aspectRatio * windowHeight >= windowWidth) {
        bottomLeftX = 0;
        bottomLeftY = (windowHeight - (mapHeight * windowWidth / mapWidth)) / 2;
    } else {
        bottomLeftX = (windowWidth - (mapWidth * windowHeight / mapHeight)) / 2;
        bottomLeftY = 0;
    }

    return { offsetX: bottomLeftX, offsetY: bottomLeftY };
};
export const calculateDisplayDimensions = (mapWidth,mapHeight,windowWidth, windowHeight) => {
    const aspectRatio = mapWidth / mapHeight;
    const widthFirst = aspectRatio * windowHeight >= windowWidth;
    let displayedMapHeight,displayedMapWidth;
    if (widthFirst){
        displayedMapHeight = (mapHeight * windowWidth) / mapWidth;
        displayedMapWidth = windowWidth;
    }else{
        displayedMapWidth = (mapWidth * windowHeight) / mapHeight;
        displayedMapHeight = mapHeight;
    }

    return {
        displayedMapHeight,
        displayedMapWidth
    }
}
const getIconName = (icon) => {
    switch(icon){
        case 'toilet': {
            return 'toilet';
        }
        case 'stairs-down':{
            return 'stairs-down';
        }
        case 'stairs-up':{
            return 'stairs-up';
        }
        case 'food':{
            return 'food';
        }
        default:{
            return "close-circle-outline";
        }
    }
}
function normalizePoint(point, mapWidth,displayedMapWidth,mapHeight,displayedMapHeight,offsetX,offsetY) {
    const {x,y,floor} = point
    // console.log(point, mapWidth,displayedMapWidth,mapHeight,displayedMapHeight,offsetX,offsetY)
    return {
        x: x,
        y: y,
        floor:floor
    }
    // return {
    //     x: (x / mapWidth) * displayedMapWidth + offsetX,
    //     y: (y / mapHeight) * displayedMapHeight + offsetY,
    //     floor:floor
    // }
}

export function normalizePOIsPoints(POIs,mapWidth,mapHeight,floor,windowWidth,windowHeight){
    const {offsetX , offsetY} = calculateBottomLeftOffset(mapWidth,mapHeight,windowWidth,windowHeight);
    // const {displayedMapHeight, displayedMapWidth} = calculateDisplayDimensions(mapWidth,mapHeight,windowWidth,windowHeight);
    const displayedMapHeight = windowHeight;
    const displayedMapWidth = windowWidth;
    let _offsetX = 0 //offsetX
    let _offsetY = 0
    const normalize =  POIs.map((POI) => {
        return {
            ...POI,
            mapArea:POI.mapArea.map((point)=>{
                if (point.floor == floor){
                    return normalizePoint(point,mapWidth,displayedMapWidth,mapHeight,displayedMapHeight,_offsetX,_offsetY)
                }
                return point;
            }),
            center:normalizePoint(POI.center,mapWidth,displayedMapWidth,mapHeight,displayedMapHeight,_offsetX,_offsetY),
            openStatus:POI.details.openingHours ? isOpen(POI.details.openingHours) : null,
            icon:getIconName(POI.details.icon),
            scheduleString:POI.details.openingHours ? stringifySchedule(POI.details.openingHours) : null, 
            
        }
    })
    return normalize;
    
}