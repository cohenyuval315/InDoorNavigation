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

function findGeographicalCenter(locations) {
    if (locations.length === 0) {
        return null; // No locations to calculate the center
    }

    let totalLongitude = 0;
    let totalLatitude = 0;

    locations.forEach(location => {
        totalLongitude += location.longitude;
        totalLatitude += location.latitude;
    });

    const centerLongitude = totalLongitude / locations.length;
    const centerLatitude = totalLatitude / locations.length;

    return {
        longitude: centerLongitude,
        latitude: centerLatitude
    };
}
export const prepareBuildingsData = (buildings) => {
    return buildings.map((building) => {
        return prepareBuildingData(building);
    })
}
const prepareBuildingData = (building) => {
    const buildingDetails = building.details;
    // console.log(building.globalCoordinates)
    const center = findGeographicalCenter(building.geoArea)
    const mapCoords = offsetFunction(center);
    console.log(mapCoords);
    return {
        ...building,
        mapCoordinates:mapCoords,
        scheduleString:stringifySchedule(buildingDetails.openingHours),
        openStatus:isOpen(buildingDetails.openingHours),
        icon:buildingIcon(building),
        availableActivities: Object.entries(buildingDetails.activities).filter(([_, available]) => available),
        availableAccessibility: Object.entries(buildingDetails.accessibility).filter(([_, available]) => available)
    }
}
