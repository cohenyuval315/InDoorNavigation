import { RouteSVG } from "@/common/interfaces/RouteSVG";
import { NavigationWebSocketEvent } from "./NavigationWebSocketEvent";
import { FloorRouteSVG } from "@/common/interfaces/FloorRouteSVG";
import { UserMapCoordinates } from "@/common/interfaces/engine/UserMapCoordinates";

export enum NavigationResponseType {
    START = "start",
    END = "end",
    REROUTE = "reroute",
    REPOSITION = "position",
    NONE = "none",
    ERROR = "error"
}


export interface INavigationResponse<T extends NavigationResponseType> extends NavigationWebSocketEvent {
    type: T;
    payload: T extends NavigationResponseType.REPOSITION ? IRePositionNavigationResponsePayload :
             T extends NavigationResponseType.REROUTE ? IRouteNavigationResponsePayload :
             T extends NavigationResponseType.END ? IEndNavigationResponsePayload :
             T extends NavigationResponseType.NONE ? INoneNavigationResponsePayload :
             T extends NavigationResponseType.START ? IStartNavigationResponsePayload :
             T extends NavigationResponseType.ERROR ? IErrorNavigationResponsePayload :
             never; 
}

export interface INavigationResponsePayload {

}


export interface IRouteNavigationResponsePayload extends INavigationResponsePayload {
    routeSVG:FloorRouteSVG[],
    distance:number,
    timeLength:number
}

export interface IRePositionNavigationResponsePayload extends INavigationResponsePayload {
    userPosition:UserMapCoordinates
}

export interface IEndNavigationResponsePayload extends INavigationResponsePayload  {
   
}

export interface INoneNavigationResponsePayload extends INavigationResponsePayload {
   
}

export interface IStartNavigationResponsePayload extends INavigationResponsePayload  {
   
}

export interface IErrorNavigationResponsePayload extends INavigationResponsePayload  {
   
}

