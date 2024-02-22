import { WaypointPathType,
    WaypointFacilityType,
    Direction,
    CardinalDirection,SegmentPathType } from '../constants/constants';
class BuildingNavigationDataBoundary {
    id?:string;
    buildingId:string
    waypoints?:{
        title:string,
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
    }[]
    segments?:{
        title:string,
        weight?:number,
        pathType:SegmentPathType | string,
        isAvailable:boolean,
        availableHeadings:{
            diraction:Direction | string,
            cardinalDirection: CardinalDirection | string
        }[],
        visualMapArea:{
            x:number,
            y:number,
            floor:number
        }[],
        sourceWaypoint:{

        },
        targetWaypoint:{

        },
    }[]
    WIFIFingerprintsSignalsMap?:{
        signals:{

        }[],
        mapCoordinate:{
            x:number,
            y:number,
            floor:number
        }
    }
    MagneticProfilesHeatMap?:{
        mapCoordinate:{
            x:number,
            y:number,
            floor:number
        }
        deviceOrientation
        declination
        magneticField
    }
}

export default BuildingNavigationDataBoundary;