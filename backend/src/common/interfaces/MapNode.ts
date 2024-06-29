import { WaypointFacilityType, WaypointPathType } from "../../../lib/constants/constants.js";
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
