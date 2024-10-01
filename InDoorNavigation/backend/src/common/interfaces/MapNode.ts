import { WaypointFacilityType } from "../enums/WaypointFacilityType.js";
import { WaypointPathType } from "../enums/WaypointPathType.js";
import { MapCoordinates } from "./MapCoordinates.js";


export interface MapNode {
    id: string;
    title: string;
    pathType: WaypointPathType;
    facilityType: WaypointFacilityType;
    POIId: string | null;
    isAvailable: boolean;
    availableHeadings: string[];
    mapCoordinates: MapCoordinates;
}
