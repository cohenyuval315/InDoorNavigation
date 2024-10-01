import { UserMapCoordinates } from "./UserMapCoordinates"
import { UserSpatialInputData } from "./UserSpatialInputData"
import { UserSpatialMetaData } from "./UserSpatialMetaData"
import { UserSpatialStateData } from "./UserSpatialStateData"


export interface UserSpatialState { 
    state: UserSpatialStateData
    position:UserMapCoordinates | null
    meta:UserSpatialMetaData
    timestamp:any
}


