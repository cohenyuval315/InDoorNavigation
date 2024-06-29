import { NavigationMetaData } from "@/common/interfaces/NavigationMetaData"
import { UserMapCoordinates } from "./UserMapCoordinates"
import { UserSpatialInputData } from "./UserSpatialInputData"
import { UserSpatialMetaData } from "./UserSpatialMetaData"
import { UserSpatialStateData } from "./UserSpatialStateData"


export interface UserSpatialState { 
    state: UserSpatialStateData
    position:UserMapCoordinates
    meta:NavigationMetaData
    timestamp:Date
}


