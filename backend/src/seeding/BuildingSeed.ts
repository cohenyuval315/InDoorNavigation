import { MapFloor } from "../common/interfaces/MapFloor";


export interface BuildingSeed { 
    buildingId: string;
    buildingTitle:string,
    data:{
        override:boolean,
        data:any
    },
    map:{
        override:boolean,
        data:any
    },
    graph:{
        override:boolean,
        data:any
    },
    wifi:{
        override:boolean,
        data:any
    },
    magnetic:{
        override:boolean,
        data:any
    },
}
