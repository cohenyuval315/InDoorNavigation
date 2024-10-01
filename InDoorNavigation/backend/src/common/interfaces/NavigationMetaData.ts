import { BuildingMapData } from "./BuildingMapData";
import { MagneticMap } from "./MagneticMap";
import { MapAccessibility } from "./MapAccessibility";
import { MapEdge } from "./MapEdge";
import { MapNode } from "./MapNode";
import { MapPOI } from "./MapPOI";
import { WifiMap } from "./WifiMap";
import { UserMapCoordinates } from "./engine/UserMapCoordinates";

export interface NavigationMetaData {
    buildingMapData:BuildingMapData,
    buildingGraphData:{
        nodes:MapNode[],
        edges:MapEdge[],
        destinationPOI:MapPOI,
        accessibility:MapAccessibility
    },
    buildingWifiMap:WifiMap,
    buildingMagneticMap:MagneticMap,
    isMock:boolean,
    mockInitialUserPosition:UserMapCoordinates | undefined | null
}