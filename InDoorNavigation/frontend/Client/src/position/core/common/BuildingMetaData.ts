
export interface BuildingMetaData {
    buildingId:string | null;
    floorAltitudes:object | null;
    normalHeading:number
    buildingBoundaryBox:{
        latitude:number
        longitude:number
    }[];
    mapWidth:number
    mapHeight:number,
    unitInMeters:number,
    displacement: {
        dx:number,
        dy:number,
    }
}

export interface GeoCoordinates {
    latitude:number,
    longitude:number,
    altitude?:number,
}

export interface MapFloor{
    floor:number,
    height:number,
    width:number,
    floorHeight:number,
    altitude:number,
    map?:string,
}

export interface BuildingMapData {
    buildingId:string,
    mapFloors:MapFloor[],
    mapHeading:number,
    geoArea:GeoCoordinates[],
    mapWidth:number
    mapHeight:number,
    scale:number,
    zScale:number
}


