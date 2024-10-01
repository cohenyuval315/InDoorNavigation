import { POIType } from "../constants/enums";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./scaling/scaling";
import { isOpen, stringifySchedule } from "./time/schedule-formatter";


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
        case POIType.RESTAURANT: {
            return 'food';
        }
        case POIType.CLASS_ROOM: {
            return 'google-classroom';
        }
        case POIType.PATIENT_ROOM: {
            return 'bed-outline';
        }
        case POIType.DOCTOR_ROOM: {
            return 'desk';
        }
        case POIType.YARD: {
            return 'yard';
        }
        case POIType.BATHROOM: {
            return 'toilet';
        }
        case POIType.LAB: {
            return 'glass-fragile';
        }
        case POIType.ROOM: {
            return 'headset';
        }
        case POIType.ELEVATOR: {
            return 'elevator';
        }
        case POIType.STAIRS: {
            return 'stairs';
        }
        case POIType.ESCALATORS: {
            return 'escalator';
        }
        case POIType.ROOM_ENTRANCE: {
            return 'door';
        }
        case POIType.BUILDING_ENTRANCE: {
            return 'door-sliding-open';
        }
        case POIType.EXIT: {
            return 'exit-run';
        }
        case POIType.EMERGENCY_EXIT: {
            return 'exit-run';
        }
        case POIType.INFORMATION_DESK: {
            return 'information';
        }
        case POIType.UNKNOWN: {
            return 'penguin';
        }
        case POIType.VENDING_MACHINE: {
            return 'slot-machine';
        }
        case POIType.SMOKING_AREA: {
            return 'smoking';
        }
        case POIType.CAFETERIA: {
            return 'food-outline';
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
            icon:getIconName(POI.details.POIType),
            scheduleString:POI.details.openingHours ? stringifySchedule(POI.details.openingHours) : null, 
            
        }
    })
    return normalize;
    
}