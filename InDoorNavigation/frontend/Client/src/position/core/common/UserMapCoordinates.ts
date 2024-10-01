export interface UserMapCoordinates { 
    x:number,
    y:number,
    z:number,
    heading:number,
    floor:number,
}

export interface SpatialPosition { 
    position?:UserMapCoordinates,
    data?:any
}