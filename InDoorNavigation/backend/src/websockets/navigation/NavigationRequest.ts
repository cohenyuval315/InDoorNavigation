import { UserMapCoordinates } from "@/common/interfaces/engine/UserMapCoordinates.js";
import { UserSpatialInputData } from "../../common/interfaces/engine/UserSpatialInputData.js";
import { MapAccessibility } from "../../common/interfaces/MapAccessibility.js"
import { IWebSocketEvent } from "../IWebSocketEvent.js"
import { NavigationWebSocketEvent } from "./NavigationWebSocketEvent.js";


export enum NavigationRequestType {
    START = "start",
    POSITION = "position",
    END = "end"
}

export interface IStartNavigationRequestPayload {
    accessToken: string | undefined | null;
    buildingId: string;
    destinationPOIId: string;
    accessibility: MapAccessibility;
    mockInitialUserPosition:UserMapCoordinates | undefined | null;
    isMock:boolean | undefined | null;
}

export interface INavigationRequestPayload {
    spatialData: UserSpatialInputData;
    timestamp:any
}

export interface IEndNavigationRequestPayload {
   
}


export interface INavigationRequest<T extends NavigationRequestType> extends NavigationWebSocketEvent {
    type: T;
    payload: T extends NavigationRequestType.START ? IStartNavigationRequestPayload :
             T extends NavigationRequestType.POSITION ? INavigationRequestPayload :
             T extends NavigationRequestType.END ? IEndNavigationRequestPayload :
             never; // Ensure exhaustive checking for types
}




