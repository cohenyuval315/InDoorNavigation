import { UserSpatialInputData } from "@/common/interfaces/engine/UserSpatialInputData";
import { MapAccessibility } from "../../common/interfaces/MapAccessibility"
import { IWebSocketEvent } from "../IWebSocketEvent"
import { NavigationWebSocketEvent } from "./NavigationWebSocketEvent";


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
}

export interface INavigationRequestPayload {
    spatialData: UserSpatialInputData;
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

function ok(e:INavigationRequest<NavigationRequestType.POSITION>){

}




