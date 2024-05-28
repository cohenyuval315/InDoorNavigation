import { POIType,WaypointPathType, WaypointFacilityType, Direction, CardinalDirection } from '../constants/constants';
class BuildingMapDataBoundary {
    id?:string;
    buildingId?:string;
    POIs?:{
        mapArea:{
            x:number,
            y:number,
            floor:number
        }[],
        isAvailable:boolean,
        floor:number,
        isEmployeeOnly:boolean,
        POIDetails:{
            title:string,
            description?:string,
            POIType?:POIType | string,
            openingHours?:string,
            closingHours?:string,
            websiteLink?:string,
            phonenumbers?:string,
            POIOpeningDate?:string | Date,
            storageImageKey?:string,
            imageUri?:string,
        }
    }[];
    waypoints?:{
        title:string,
        weight?:number,
        pathType:WaypointPathType | string,
        facilityType:WaypointFacilityType | string,
        isAvailable:boolean,
        availableHeadings?:{
            diraction:Direction | string,
            cardinalDirection: CardinalDirection | string
        }[];
        mapCoordinates:{
            x:number,
            y:number,
            floor:number
        };
    }[];
}

export default BuildingMapDataBoundary;