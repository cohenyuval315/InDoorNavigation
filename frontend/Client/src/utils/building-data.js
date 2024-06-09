import { BuildingType } from "../constants/constants";
import { getIsraelPointByGlobalCoordinates, getRelativeCoordsByIsrael } from "../static-maps/israel";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./scaling";
import { isOpen, stringifySchedule } from "./schedule-formatter";

const offsetFunction = (globalCoordinates) => getRelativeCoordsByIsrael(globalCoordinates);

const buildingIcon = (building) => {
    switch(building.buildingType){
        case BuildingType.COLLEGE:{
            return "university";
        }
        default:{
            return "building";
        }
    }
}
export const prepareBuildingsData = (buildings) => {
    return buildings.map((building) => {
        return prepareBuildingData(building);
    })
}
const prepareBuildingData = (building) => {
    const buildingDetails = building.details;
    console.log(building.globalCoordinates)
    const mapCoords = offsetFunction(building.globalCoordinates);
    console.log(mapCoords);
    return {
        ...building,
        mapCoordinates:offsetFunction(building.globalCoordinates),
        scheduleString:stringifySchedule(buildingDetails.openingHours),
        openStatus:isOpen(buildingDetails.openingHours),
        icon:buildingIcon(building),
        availableActivities: Object.entries(buildingDetails.activities).filter(([_, available]) => available),
        availableAccessibility: Object.entries(buildingDetails.accessibility).filter(([_, available]) => available)
    }
}
