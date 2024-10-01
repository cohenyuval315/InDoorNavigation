import { BuildingType } from "../constants/enums";
import { isOpen, stringifySchedule } from "./time/schedule-formatter";
import { getRelativeCoordsByIsrael } from "../static-maps/israel/israel";

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
