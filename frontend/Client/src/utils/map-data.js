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
            return "image";
        }
    }
}

export function normalizePOIsPoints(POIs,mapWidth,mapHeight,floor,windowWidth,windowHeight){
    const {offsetX , offsetY} = calculateBottomLeftOffset(mapWidth,mapHeight,windowWidth,windowHeight);
    const {displayedMapHeight, displayedMapWidth} = calculateDisplayDimensions(mapWidth,mapHeight,windowWidth,windowHeight);
    let _offsetX = 0 //offsetX
    let _offsetY = offsetY
    const normalize =  POIs.map((POI) => {
        return {
            ...POI,
            mapArea:POI.mapArea.map((point)=>{
                if (point.floor == floor){
                    const normalizedX = (point.x / mapWidth) * displayedMapWidth + _offsetX;
                    const normalizedY = (point.y / mapHeight) * displayedMapHeight + _offsetY;
                    const normalPoint =  { 
                        ...point,
                        x: normalizedX, 
                        y: normalizedY
                    };      
                    return normalPoint
                }
                return point;
                
            }),
            openStatus:POI.details.openingHours ? isOpen(POI.details.openingHours) : null,
            icon:getIconName(POI.details.icon),
            scheduleString:POI.details.openingHours ? stringifySchedule(POI.details.openingHours) : null, 
            
        }
    })

    const withCenter = normalize.map((POI)=>{
        let x = 0;
        let y = 0;
        POI.mapArea.forEach(coord => {
            x += coord.x;
            y += coord.y;
        });
        x = x /  POI.mapArea.length
        y = y /  POI.mapArea.length
        return {
            ...POI,
            center: {
                x:x,
                y:y,
                floor:POI.floor
            }
        }
    })

    return withCenter;
    
}