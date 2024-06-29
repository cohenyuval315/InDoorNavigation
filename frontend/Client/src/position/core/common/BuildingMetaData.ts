
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