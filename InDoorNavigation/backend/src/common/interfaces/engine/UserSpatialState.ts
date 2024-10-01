import { NavigationMetaData } from "@/common/interfaces/NavigationMetaData"
import { UserMapCoordinates } from "./UserMapCoordinates"
import { UserSpatialStateData } from "./UserSpatialStateData"


export interface UserSpatialState { 
    state: UserSpatialStateData
    position:UserMapCoordinates
    meta:NavigationMetaData
    timestamp:Date | number
}


