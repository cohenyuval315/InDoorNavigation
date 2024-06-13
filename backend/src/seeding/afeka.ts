import { truncate } from "fs";
import { BuildingStatus, BuildingType, CardinalDirection, Direction, POIType, SegmentPathType, WaypointFacilityType, WaypointPathType } from "../constants/constants";
import { BuildingSeed } from "./BuildingSeed";

// 24 Digit Hex Code
const afekaBuildingId = "E384F534F12C984588D8868E";

const nodes =[ 
    {
        id:"node_main_entrance",
        title:"node_main_entrance",
        pathType:WaypointPathType.INTERSECT,
        facilityType:WaypointFacilityType.BUILDING_ENTRANCE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP
        ],
        mapCoordinates:{
            x:656,
            y:1,
            floor:0
        }
    },
    {
        id:"node_main_entrance_path_center",
        title:"main entrance path center",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:656,
            y:36,
            floor:0
        }
    },

    {
        id:"node_main_front_entrance_path_center",
        title:"node_main_front_entrance_path_center",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:624,
            y:36,
            floor:0
        }
    },

    {
        id:"node_main_intersect_accessible_path",
        title:"node_main_intersect_accessible_path",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.RIGHT,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:882,
            y:36,
            floor:0
        }
    },   

    {
        id:"node_main_start_accessible_path",
        title:"node_main_start_accessible_path",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.RAMP,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
        ],
        mapCoordinates:{
            x:882,
            y:60,
            floor:0
        }
    },   

    {
        id:"node_main_path_outside_right_intersect",
        title:"node_main_path_outside_right_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:1104,
            y:36,
            floor:0
        }
    },  

    {
        id:"node_smoking_area_left_outside",
        title:"node_smoking_area_left_outside",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.POI,
        POIId:"poi_smoking_area_floor_0",
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:35,
            y:36,
            floor:0
        }
    },  

    
    {
        id:"node_smoking_area_stairs",
        title:"node_smoking_area_stairs",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:"poi_smoking_area_floor_0",
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
        ],
        mapCoordinates:{
            x:35,
            y:100,
            floor:0
        }
    },  


    {
        id:"node_smoking_area_stairs_floor_-1",
        title:"node_smoking_area_stairs_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
        ],
        mapCoordinates:{
            x:35,
            y:307,
            floor:-1
        }
    },  

    {
        id:"node_edge_align_front_left_front_entrance",
        title:"node_edge_align_front_left_front_entrance",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:35,
            y:316,
            floor:-1
        }
    },  
    {
        id:"node_left_front_entrance",
        title:"node_left_front_entrance",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:174,
            y:316,
            floor:-1
        }
    },  

    {
        id:"node_edge_align_112_intersect",
        title:"node_edge_align_112_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
            Direction.UP,
        ],
        mapCoordinates:{
            x:210,
            y:316,
            floor:-1
        }
    },  

    {
        id:"node_112_door",
        title:"node_112_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_120",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:210,
            y:291,
            floor:-1
        }
    },  


    {
        id:"node_edge_align_111_intersect",
        title:"node_edge_align_111_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:236,
            y:316,
            floor:-1
        }
    },  
    {
        id:"node_111_door",
        title:"node_111_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_111",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:236,
            y:338,
            floor:-1
        }
    },  


    {
        id:"node_edge_align_114_intersect",
        title:"node_edge_align_114_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:320,
            y:316,
            floor:-1
        }
    },  

    {
        id:"node_114_door",
        title:"node_114_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_112",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:320,
            y:338,
            floor:-1
        }
    },  

    
    {
        id:"node_edge_align_114_lab_intersect",
        title:"node_edge_align_114_lab_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:419,
            y:316,
            floor:-1
        }
    },  

    {
        id:"node_edge_align_114_lab_door_front",
        title:"node_edge_align_114_lab_door_front",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:419,
            y:274,
            floor:-1
        }
    },  
    {
        id:"node_114_lab_door",
        title:"node_114_lab_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_lab_114",
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:389,
            y:274,
            floor:-1
        }
    },  



    {
        id:"node_edge_align_unknown_room_intersect",
        title:"node_edge_align_unknown_room_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:429,
            y:316,
            floor:-1
        }
    },  
    {
        id:"node_unknown_room_door",
        title:"node_unknown_room_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_unknown_room_2",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:429,
            y:338,
            floor:-1
        }
    },  

    {
        id:"node_edge_align_115_lab_intersect",
        title:"node_edge_align_115_lab_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.UP,
        ],
        mapCoordinates:{
            x:440,
            y:316,
            floor:-1
        }
    }, 

    {
        id:"node_edge_align_115_lab_floor_intersect",
        title:"node_edge_align_115_lab_floor_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:440,
            y:305,
            floor:-1
        }
    }, 

    {
        id:"node_edge_align_115_lab_door_front",
        title:"node_edge_align_115_lab_door_front",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:440,
            y:274,
            floor:-1
        }
    }, 

    {
        id:"node_main_path_outside_stairs_right",
        title:"node_main_path_outside_stairs_right",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:1104,
            y:118,
            floor:0
        }
    },  

    {
        id:"node_115_door",
        title:"node_115_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_115",
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:471,
            y:274,
            floor:-1
        }
    },  

    {
        id:"node_116_door",
        title:"node_116_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_116",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:616,
            y:289,
            floor:-1
        }
    },  
    {
        id:"node_116_door_front",
        title:"node_116_door_front",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP,

        ],
        mapCoordinates:{
            x:616,
            y:305,
            floor:-1
        }
    },  

   
    {
        id:"node_edge_align_electricity_room_intersect",
        title:"node_edge_align_electricity_room_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP,

        ],
        mapCoordinates:{
            x:726,
            y:337,
            floor:-1
        }
    },  
 
   
    {
        id:"node_edge_align_stairs_floor-1_middle_up",
        title:"node_edge_align_stairs_floor-1_middle_up",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,

        ],
        mapCoordinates:{
            x:567,
            y:305,
            floor:-1
        }
    },  
    {
        id:"node_edge_align_stairs_floor-1_middle",
        title:"node_edge_align_stairs_floor-1_middle",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP,
            Direction.DOWN,

        ],
        mapCoordinates:{
            x:567,
            y:337,
            floor:-1
        }
    },  

    {
        id:"node_edge_align_stairs_floor-1_middle_down",
        title:"node_edge_align_stairs_floor-1_middle_down",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP,

        ],
        mapCoordinates:{
            x:567,
            y:368,
            floor:-1
        }
    },  



    {
        id:"node_edge_align_103_door_front",
        title:"node_edge_align_103_door_front",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:548,
            y:368,
            floor:-1
        }
    },  


    
    {
        id:"node_103_door",
        title:"node_103_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_103",
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
        ],
        mapCoordinates:{
            x:548,
            y:397,
            floor:-1
        }
    }, 





    {
        id:"node_main_path_outside_stairs_right_floor_-1",
        title:"node_main_path_outside_stairs_right_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:1104,
            y:283,
            floor:-1
        }
    },  















    

    {
        id:"node_main_corner_accessible_path",
        title:"node_main_corner_accessible_path",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.RAMP,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:882,
            y:142,
            floor:0
        }
    }, 

    {
        id:"node_edge_align_in_front_door",
        title:"node_edge_align_in_front_door",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:624,
            y:142,
            floor:0
        }
    },  
    
    {
        id:"node_edge_end_ramp_front_door",
        title:"node_edge_end_ramp_front_door",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:688,
            y:142,
            floor:0
        }
    },  
    
    {
        id:"node_front_door",
        title:"node_front_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.BUILDING_ENTRANCE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:624,
            y:197,
            floor:0
        }
    },  
    



    {
        id:"node_edge_align_male_bathroom_f0_door",
        title:"node_edge_align_male_bathroom_f0_door",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:624,
            y:212,
            floor:0
        }
    },  
    {
        id:"node_male_bathroom_f0_door",
        title:"node_male_bathroom_f0_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        isAvailable:true,
        POIId:"poi_bathroom_main_entrance",
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT
        ],
        mapCoordinates:{
            x:557,
            y:212,
            floor:0
        }
    },    




    {
        id:"node_edge_align_female_bathroom_f0_door",
        title:"node_edge_align_female_bathroom_f0_door",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:624,
            y:252,
            floor:0
        }
    },  
    {
        id:"node_female_bathroom_f0_door",
        title:"node_female_bathroom_f0_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        isAvailable:true,
        POIId:"poi_bathroom_main_entrance",
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT
        ],
        mapCoordinates:{
            x:557,
            y:252,
            floor:0
        }
    },  




    {
        id:"node_edge_align_handicap_bathroom_f0_door",
        title:"node_edge_align_handicap_bathroom_f0_door",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:624,
            y:274,
            floor:0
        }
    },  

    {
        id:"node_handicap_bathroom_f0_door",
        title:"node_handicap_bathroom_f0_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        isAvailable:true,
        POIId:"poi_bathroom_main_entrance",
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT
        ],
        mapCoordinates:{
            x:557,
            y:274,
            floor:0
        }
    },  













    {
        id:"node_edge_align_entrance_hall_intersect_left",
        title:"node_",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:624,
            y:307,
            floor:0
        }
    },  








    {
        id:"node_edge_align_entrance_hall_intersect_right",
        title:"node_edge_align_entrance_hall_intersect_right",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:624,
            y:337,
            floor:0
        }
    },  

    
    {
        id:"node_edge_align_beverage_machine",
        title:"node_edge_align_beverage_machine",
        pathType:WaypointPathType.EDGE_ALIGN_CORNER,
        facilityType:WaypointFacilityType.POI,
        POIId:"poi_vending_machine",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:933,
            y:337,
            floor:0
        }
    },  

    {
        id:"node_edge_align_entrance_hall_intersect_left_down",
        title:"node_edge_align_entrance_hall_intersect_left_down",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:624,
            y:365,
            floor:0
        }
    },  




    {
        id:"node_edge_align_stairs_middle_up",
        title:"node_edge_align_stairs_middle_up",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:422,
            y:307,
            floor:0
        }
    },  


    {
        id:"node_edge_align_stairs_middle_down",
        title:"node_edge_align_stairs_middle_down",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.UP,
        ],
        mapCoordinates:{
            x:422,
            y:365,
            floor:0
        }
    },  



    {
        id:"node_edge_align_stairs_middle",
        title:"node_edge_align_stairs_middle",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:422,
            y:337,
            floor:0
        }
    },  

    {
        id:"node_stairs_middle",
        title:"node_stairs_middle",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:451,
            y:337,
            floor:0
        }
    },  

    {
        id:"node_stairs_middle_floor_-1",
        title:"node_stairs_middle_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:555,
            y:337,
            floor:-1
        }
    }, 



    {
        id:"node_edge_align_right_area_classrooms_intersect_left",
        title:"node_edge_align_right_area_classrooms_intersect_left",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:805,
            y:337,
            floor:0
        }
    },  

    {
        id:"node_edge_align_classrooms_intersect_right",
        title:"node_edge_align_classrooms_intersect_right",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:828,
            y:337,
            floor:0
        }
    },  


    {
        id:"node_classroom_201",
        title:"node_classroom_201",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_201",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:805,
            y:294,
            floor:0
        }
    },  


    
    {
        id:"node_classroom_202",
        title:"node_classroom_202",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_202",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:828,
            y:294,
            floor:0
        }
    },  


    {
        id:"node_classroom_204",
        title:"node_classroom_204",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_204",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:805,
            y:381,
            floor:0
        }
    },  


    {
        id:"node_classroom_203",
        title:"node_classroom_203",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_203",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:828,
            y:381,
            floor:0
        }
    },  


    // {
    //     id:"node_edge_align_classrooms_intersect_left",
    //     title:"node_edge_align_classrooms_intersect_left",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //         Direction.DOWN_LEFT,
    //         Direction.DOWN_RIGHT,
    //         Direction.UP_LEFT,
    //         Direction.UP_RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:342,
    //         y:337,
    //         floor:0
    //     }
    // },  


    {
        id:"node_edge_align_intersect_stairs_left_hall",
        title:"node_edge_align_intersect_stairs_left_hall",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:242,
            y:337,
            floor:0
        }
    },  



    {
        id:"node_left_stairway_door",
        title:"node_left_stairway_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:174,
            y:337,
            floor:0
        }
    },  



    {
        id:"node_left_stairway_center",
        title:"node_left_stairway_center",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:135,
            y:337,
            floor:0
        }
    },  

    {
        id:"node_left_stairway_stairs",
        title:"node_left_stairway_stairs",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:135,
            y:385,
            floor:0
        }
    },  

    {
        id:"node_left_stairway_stairs_floor_-1",
        title:"node_left_stairway_stairs_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:135,
            y:514,
            floor:-1
        }
    },  



    {
        id:"node_classroom_207",
        title:"node_classroom_207",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_207",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:326,
            y:280,
            floor:0
        }
    },  


    {
        id:"node_classroom_208",
        title:"node_classroom_208",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_208",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:359,
            y:280,
            floor:0
        }
    },  

    {
        id:"node_classroom_205",
        title:"node_classroom_205",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_205",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:359,
            y:395,
            floor:0
        }
    },  




    {
        id:"node_classroom_206_top",
        title:"node_classroom_206_top",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_206",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:326,
            y:395,
            floor:0
        }
    },  



    {
        id:"node_edge_align_intersect_right_beverage",
        title:"node_edge_align_intersect_right_beverage",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:933,
            y:316,
            floor:0
        }
    },  

    {
        id:"node_edge_align_stairs_classroom_intersect_right",
        title:"node_edge_align_stairs_classroom_intersect_right",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:968,
            y:316,
            floor:0
        }
    },  

    {
        id:"node_edge_align_stairs_outside_door",
        title:"node_edge_align_stairs_outside_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:968,
            y:344,
            floor:0
        }
    },  

    {
        id:"node_classroom_200",
        title:"node_classroom_200",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_200",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:968,
            y:290,
            floor:0
        }
    },  



    {
        id:"node_stairs_right",
        title:"node_stairs_right",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:968,
            y:360,
            floor:0
        }
    },  



    {
        id:"node_edge_align_stairs_outside_right",
        title:"node_edge_align_stairs_outside_right",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:997,
            y:360,
            floor:0
        }
    },  


    {
        id:"node_stairs_right_half_floor_leftside",
        title:"node_stairs_outside_right",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.UP,
        ],
        mapCoordinates:{
            x:968,
            y:448,
            floor:-0.5
        }
    },  


    {
        id:"node_stairs_right_half_floor_rightside",
        title:"node_stairs_right_half_floor_rightside",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:997,
            y:448,
            floor:-0.5
        }
    },  



    {
        id:"node_stairs_right_floor_-1",
        title:"node_stairs_right_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:997,
            y:370,
            floor:-1
        }
    },  



    {
        id:"node_information_desk",
        title:"node_information_desk",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.POI,
        POIId:"poi_information_desk",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
        ],
        mapCoordinates:{
            x:624,
            y:400,
            floor:0
        }
    }, 






    
    {
        id:"node_edge_align_left_down_classrooms_intersect_right",
        title:"node_edge_align_left_down_classrooms_intersect_right",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:359,
            y:337,
            floor:0
        }
    },  

    {
        id:"node_edge_align_left_down_classrooms_intersect_left",
        title:"node_edge_align_left_down_classrooms_intersect_left",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:326,
            y:337,
            floor:0
        }
    }, 
    {
        id:"node_room_left_next_206",
        title:"node_room_left_next_206",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:216,
            y:466,
            floor:0
        }
    },  

    {
        id:"node_hall_intersect_left_down_front_room",
        title:"node_hall_intersect_left_down_front_room",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:242,
            y:466,
            floor:0
        }
    },  
    {
        id:"node_hall_intersect_left_down_front_206",
        title:"node_hall_intersect_left_down_front_206",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:242,
            y:451,
            floor:0
        }
    },  



    {
        id:"node_classroom_206_left_door",
        title:"node_classroom_206_left_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_206",
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:271,
            y:451,
            floor:0
        }
    },  




        
    {
        id:"node_edge_align_lab_area_intersect",
        title:"node_edge_align_lab_area_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:242,
            y:604,
            floor:0
        }
    },  

        
        
    {
        id:"node_floor_0_elevator",
        title:"node_floor_0_elevator",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.ELEVATOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:370,
            y:604,
            floor:0
        }
    },  

    


    {
        id:"node_edge_align_lab_area_bathroom_intersect",
        title:"node_edge_align_lab_area_bathroom_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.UP,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:242,
            y:713,
            floor:0
        }
    },  


    
    {
        id:"node_edge_align_lab_area_bathroom",
        title:"node_edge_align_lab_area_bathroom",
        pathType:WaypointPathType.INTERSECT,
        facilityType:WaypointFacilityType.POI,
        POIId:"poi_bathroom_labs",
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:210,
            y:713,
            floor:0
        }
    },  


    
    {
        id:"node_edge_align_lab_area_path_hall",
        title:"node_edge_align_lab_area_path_hall",
        pathType:WaypointPathType.INTERSECT,
        facilityType:WaypointFacilityType.POI,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:370,
            y:713,
            floor:0
        }
    },  


        
    {
        id:"node_edge_align_lab_area_lab_corner",
        title:"node_edge_align_lab_area_lab_corner",
        pathType:WaypointPathType.EDGE_ALIGN_CORNER,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.UP,
        ],
        mapCoordinates:{
            x:370,
            y:1106,
            floor:0
        }
    }, 


    {
        id:"node_lab_area_lab",
        title:"node_lab_area_lab",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.POI,
        POIId:"poi_labs",
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
            Direction.RIGHT
        ],
        mapCoordinates:{
            x:110,
            y:1106,
            floor:0
        }
    }, 

    {
        id:"node_edge_align_lab_area_stairs_intersect",
        title:"node_edge_align_lab_area_stairs_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:242,
            y:646,
            floor:0
        }
    },  

    {
        id:"node_edge_align_lab_stairs",
        title:"node_edge_align_lab_stairs",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:207,
            y:646,
            floor:0
        }
    },  



    {
        id:"node_edge_align_lab_stairs_middle_floor_bottom",
        title:"node_edge_align_lab_stairs_middle_floor_bottom",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:113,
            y:646,
            floor:-0.5
        }
    }, 

    {
        id:"node_edge_align_lab_stairs_middle_floor_up",
        title:"node_edge_align_lab_stairs_middle_floor_up",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:113,
            y:609,
            floor:-0.5
        }
    }, 


































    {
        id:"node_edge_align_lab_stairs_floor-1",
        title:"node_edge_align_lab_stairs_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:217,
            y:609,
            floor:-1
        }
    }, 


    {
        id:"node_edge_align_lab_stairs_entrace_intersect",
        title:"node_edge_align_lab_stairs_entrace_intersect",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP,
        ],
        mapCoordinates:{
            x:243,
            y:609,
            floor:-1
        }
    }, 










    {
        id:"node_edge_align_right_stairs_intersect",
        title:"node_edge_align_right_stairs_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:997,
            y:331,
            floor:-1
        }
    },  


    {
        id:"node_edge_align_right_stairs_room_intersect",
        title:"node_edge_align_right_stairs_room_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:1024,
            y:331,
            floor:-1
        }
    },  





    {
        id:"node_infront_right_stairs_room",
        title:"node_infront_right_stairs_room",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_unknown",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:1024,
            y:293,
            floor:-1
        }
    }, 

    {
        id:"node_edge_align_bathroom_intersect_floor-1",
        title:"node_edge_align_bathroom_intersect_floor-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:807,
            y:221,
            floor:-1
        }
    }, 
    {
        id:"node_bathroom_male_door_floor-1",
        title:"node_bathroom_male_door_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_bathroom_male_minus_1",
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:792,
            y:220,
            floor:-1
        }
    }, 

    {
        id:"node_bathroom_female_door_floor-1",
        title:"node_bathroom_female_door_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_bathroom_female_minus_1",
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:843,
            y:222,
            floor:-1
        }
    }, 

    {
        id:"node_unknown_room_4_floor-1",
        title:"node_unknown_room_4_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_room_119",
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:821,
            y:318,
            floor:-1
        }
    }, 


    {
        
        id:"node_yard_intersect_outside_right",
        title:"node_yard_intersect_outside_right",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:1104,
            y:553,
            floor:-1
        }
    }, 
   
    
    {
        id:"node_align_right_stairs_outside_intersect",
        title:"node_align_right_stairs_outside_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT
        ],
        mapCoordinates:{
            x:1104,
            y:331,
            floor:-1
        }
    }, 

    {
        
        id:"node_front_innovation_and_entrepreneurship_center",
        title:"node_front_innovation_and_entrepreneurship_center",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:1104,
            y:761,
            floor:-1
        }
    }, 
    {
        
        id:"node_innovation_and_entrepreneurship_center",
        title:"node_innovation_and_entrepreneurship_center",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_afeka_center_for_entrepreneurship_and_innovation",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:1104,
            y:808,
            floor:-1
        }
    }, 


    {
        
        id:"node_front_lab_top_entrance",
        title:"node_front_lab_top_entrance",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:243,
            y:553,
            floor:-1
        }
    }, 

    {
        
        id:"node_edge_align_116_room_intersect",
        title:"node_edge_align_116_room_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:628,
            y:305,
            floor:-1
        }
    }, 

    {
        
        id:"node_inside_front_yard_entrance",
        title:"node_inside_front_yard_entrance",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:628,
            y:368,
            floor:-1
        }
    }, 

    {
        
        id:"node_edge_align_102_hall_intersect",
        title:"node_edge_align_102_hall_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:704,
            y:337,
            floor:-1
        }
    },
    
    {
        
        id:"node_edge_align_center_floor-1",
        title:"node_edge_align_center_floor-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:628,
            y:337,
            floor:-1
        }
    }, 


    {
        
        id:"node_edge_align_102_front_door",
        title:"node_edge_align_102_front_door",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:704,
            y:368,
            floor:-1
        }
    }, 
    {
        
        id:"node_102_door",
        title:"node_102_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_102",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:704,
            y:380,
            floor:-1
        }
    }, 
    {
        
        id:"node_edge_align_right_area_hall_intersect",
        title:"node_edge_align_right_area_hall_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.DOWN,
            Direction.UP,
        ],
        mapCoordinates:{
            x:804,
            y:337,
            floor:-1
        }
    }, 

    {
        
        id:"node_edge_align_right_area_upward_hall_room_intersect",
        title:"node_edge_align_right_area_upward_hall_room_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.UP,
            Direction.RIGHT
        ],
        mapCoordinates:{
            x:807,
            y:319,
            floor:-1
        }
    }, 

    
    {
        
        id:"node_bathroom_door_floor-1",
        title:"node_bathroom_door_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:807,
            y:270,
            floor:-1
        }
    }, 

    {
        
        id:"node_edge_align_right_area_upward_hall_intersect",
        title:"node_edge_align_right_area_upward_hall_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:804,
            y:319,
            floor:-1
        }
    }, 


    {
        
        id:"node_edge_align_101_door_front",
        title:"node_edge_align_101_door_front",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:804,
            y:351,
            floor:-1
        }
    }, 
    {
        
        id:"node_101_door",
        title:"node_101_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_classroom_101",
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:817,
            y:351,
            floor:-1
        }
    }, 

    {
        
        id:"node_yard_entrance_floor-1",
        title:"node_yard_entrance_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:628,
            y:516,
            floor:-1
        }
    }, 


    {
        
        id:"node_front_yard_entrance_floor",
        title:"node_front_yard_entrance_floor",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:628,
            y:553,
            floor:-1
        }
    }, 


    {
        
        id:"node_lab_top_entrance_floor-1",
        title:"node_lab_top_entrance_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:243,
            y:592,
            floor:-1
        }
    }, 
    
    {
        
        id:"node_left_yard_intersect",
        title:"node_left_yard_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.DOWN,
            Direction.RIGHT
        ],
        mapCoordinates:{
            x:466,
            y:553,
            floor:-1
        }
    }, 
    



    {
        
        id:"node_cafeteria_door_floor_-1",
        title:"node_cafeteria_door_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:"poi_cafeteria_floor_-1",
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT
        ],
        mapCoordinates:{
            x:360,
            y:761,
            floor:-1
        }
    }, 

    
    {
        
        id:"node_cafeteria_infront_intersect",
        title:"node_cafeteria_infront_intersect",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP,
        ],
        mapCoordinates:{
            x:370,
            y:761,
            floor:-1
        }
    }, 

    {
        
        id:"node_edge_align_cafeteria_intersect",
        title:"node_edge_align_cafeteria_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:466,
            y:761,
            floor:-1
        }
    }, 


    {
        
        id:"node_smoking_area_floor-1",
        title:"node_smoking_area_floor-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.POI,
        POIId:"poi_smoking_area_floor_-1",
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
        ],
        mapCoordinates:{
            x:466,
            y:1022,
            floor:-1
        }
    }, 

    {
        
        id:"node_lab_yard_right_infront_intersect",
        title:"node_lab_yard_right_infront_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:370,
            y:674,
            floor:-1
        }
    }, 

    {
        
        id:"node_lab_right_yard_door_floor-1",
        title:"node_lab_right_yard_door_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:360,
            y:674,
            floor:-1
        }
    }, 































    // {
        
    //     id:"node_edge_align_yard_intersect_center",
    //     title:"node_edge_align_yard_intersect_center",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //         Direction.RIGHT,
    //         Direction.UP_RIGHT,
    //         Direction.LEFT,
    //         Direction.UP_LEFT
    //     ],
    //     mapCoordinates:{
    //         x:466,
    //         y:777,
    //         floor:-1
    //     }
    // }, 

    {
        
        id:"node_edge_align_yard_lab_intersect",
        title:"node_edge_align_yard_lab_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:466,
            y:674,
            floor:-1
        }
    }, 


    

    {
        
        id:"node_bottom_left",
        title:"node_bottom_left",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:35,
            y:1180,
            floor:-1
        }
    }, 

    {
        
        id:"node_smoking_area_bottom_left_intersect",
        title:"node_smoking_area_bottom_left_intersect",
        pathType:WaypointPathType.CORNER,
        facilityType:WaypointFacilityType.NONE,
        POIId:"poi_smoking_area_floor_-1",
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:466,
            y:1180,
            floor:-1
        }
    }, 


    {
        
        id:"node_bottom_left_yard_bottom_intersect",
        title:"node_bottom_left_yard_bottom_intersect",
        pathType:WaypointPathType.INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.RIGHT,

        ],
        mapCoordinates:{
            x:35,
            y:553,
            floor:-1
        }
    },

    {
        
        id:"node_bottom_left_yard_left_stairs_intersect",
        title:"node_bottom_left_yard_left_stairs_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,

        ],
        mapCoordinates:{
            x:135,
            y:553,
            floor:-1
        }
    },
    



    {
        
        id:"node_elevator_floor_-1",
        title:"node_elevator_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.ELEVATOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:370,
            y:604,
            floor:-1
        }
    },

    {
        
        id:"node_center_elevator_intersect_lab_floor_-1",
        title:"node_center_elevator_intersect_lab_floor_-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:293,
            y:604,
            floor:-1
        }
    },

    {
        
        id:"node_center_stairs_intersect_lab_floor_-1",
        title:"node_center_stairs_intersect_lab_floor_-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.UP,
            Direction.DOWN
        ],
        mapCoordinates:{
            x:293,
            y:609,
            floor:-1
        }
    },


    {
        
        id:"node_center_intersect_lab_floor_-1",
        title:"node_center_intersect_lab_floor_-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:293,
            y:674,
            floor:-1
        }
    },

    

    // {
        
    //     id:"node_elevator_entrance_floor_-1",
    //     title:"node_elevator_entrance_floor_-1",
    //     pathType:WaypointPathType.ONE_WAY,
    //     facilityType:WaypointFacilityType.ELEVATOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.LEFT,
    //     ],
    //     mapCoordinates:{
    //         x:353,
    //         y:571,
    //         floor:-1
    //     }
    // },
    
    // {
        
    //     id:"node_entrance_lab_floor_-1",
    //     title:"node_entrance_lab_floor_-1",
    //     pathType:WaypointPathType.ENTRANCE,
    //     facilityType:WaypointFacilityType.DOOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //     ],
    //     mapCoordinates:{
    //         x:237,
    //         y:558,
    //         floor:-1
    //     }
    // },

    // {
        
    //     id:"node_edge_align_lab_stairs_elevator_intersect",
    //     title:"node_edge_align_lab_stairs_elevator_intersect",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //         Direction.DOWN_RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:237,
    //         y:574,
    //         floor:-1
    //     }
    // },


    // {
        
    //     id:"node_edge_align_lab_stairs_floor_-1",
    //     title:"node_edge_align_lab_stairs_floor_-1",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //         Direction.DOWN_RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:211,
    //         y:574,
    //         floor:-1
    //     }
    // },



    // {
        
    //     id:"node_stairs_left_floor_-1",
    //     title:"node_stairs_left_floor_-1",
    //     pathType:WaypointPathType.ONE_WAY,
    //     facilityType:WaypointFacilityType.STAIRS,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //     ],
    //     mapCoordinates:{
    //         x:129,
    //         y:480,
    //         floor:-1
    //     }
    // },
   
    // {
        
    //     id:"node_edge_align_stairs_left_yard_intersect",
    //     title:"node_edge_align_stairs_left_yard_intersect",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //         Direction.RIGHT,
    //         Direction.LEFT,
    //     ],
    //     mapCoordinates:{
    //         x:129,
    //         y:519,
    //         floor:-1
    //     }
    // },



    // {
        
    //     id:"node_cafeteria_entrance",
    //     title:"node_cafeteria_entrance",
    //     pathType:WaypointPathType.ONE_WAY,
    //     facilityType:WaypointFacilityType.DOOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.RIGHT,
    //         Direction.LEFT,
    //     ],
    //     mapCoordinates:{
    //         x:352,
    //         y:725,
    //         floor:-1
    //     }
    // }, 

    
    
    // {
        
    //     id:"node_yard_main_entrance",
    //     title:"node_yard_main_entrance",
    //     pathType:WaypointPathType.ONE_WAY,
    //     facilityType:WaypointFacilityType.DOOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.RIGHT,
    //         Direction.LEFT,
    //     ],
    //     mapCoordinates:{
    //         x:622,
    //         y:481,
    //         floor:-1
    //     }
    // }, 


    // {
        
    //     id:"node_node_align_yard_main_entrance_outside_intersect",
    //     title:"node_node_align_yard_main_entrance_outside_intersect",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //         Direction.DOWN,
    //         Direction.DOWN_LEFT,
    //         Direction.DOWN_RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:622,
    //         y:519,
    //         floor:-1
    //     }
    // }, 

    // {
        
    //     id:"node_node_align_yard_entrance_stairs_right_intersect",
    //     title:"node_node_align_yard_entrance_stairs_right_intersect",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //         Direction.DOWN,
    //         Direction.DOWN_LEFT,
    //         Direction.DOWN_RIGHT,
    //         Direction.UP_RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:1098,
    //         y:519,
    //         floor:-1
    //     }
    // }, 

    // {
        
    //     id:"node_align_room_outside_stairs_right_intersect",
    //     title:"node_align_room_outside_stairs_right_intersect",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.RIGHT,
    //         Direction.DOWN_LEFT,
    //         Direction.DOWN_RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:1018,
    //         y:297,
    //         floor:-1
    //     }
    // }, 
    
    // {
        
    //     id:"node_align_stairs_left_stairs_right_intersect",
    //     title:"node_align_stairs_left_stairs_right_intersect",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //         Direction.DOWN,
    //         Direction.DOWN_LEFT,
    //         Direction.DOWN_RIGHT,
    //         Direction.UP_RIGHT,
    //         Direction.UP_LEFT,
    //     ],
    //     mapCoordinates:{
    //         x:1098,
    //         y:297,
    //         floor:-1
    //     }
    // }, 


    // {
        
    //     id:"node_align_stairs_left_stairs_right_intersect",
    //     title:"node_align_stairs_left_stairs_right_intersect",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //         Direction.DOWN,
    //         Direction.DOWN_LEFT,
    //         Direction.DOWN_RIGHT,
    //         Direction.UP_RIGHT,
    //         Direction.UP_LEFT,
    //     ],
    //     mapCoordinates:{
    //         x:1098,
    //         y:297,
    //         floor:-1
    //     }
    // }, 
    
    // {
        
    //     id:"node_entrance_left_floor_-1",
    //     title:"node_entrance_left_floor_-1",
    //     pathType:WaypointPathType.ENTRANCE,
    //     facilityType:WaypointFacilityType.DOOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:168,
    //         y:281,
    //         floor:-1
    //     }
    // }, 

    // {
        
    //     id:"node_edge_align_entrance_left_floor_-1",
    //     title:"node_edge_align_entrance_left_floor_-1",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.RIGHT,
    //         Direction.DOWN,
    //     ],
    //     mapCoordinates:{
    //         x:30,
    //         y:281,
    //         floor:-1
    //     }
    // }, 
    


    // /**INSIDE */


    // {
        
    //     id:"node_edge_align_entrance_left_hall_room_112_floor_-1",
    //     title:"node_edge_align_entrance_left_hall_room_112_floor_-1",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.RIGHT,
    //         Direction.LEFT,
    //     ],
    //     mapCoordinates:{
    //         x:210,
    //         y:291,
    //         floor:-1
    //     }
    // },


    // {
        
    //     id:"node_room_112_floor_-1",
    //     title:"node_room_112_floor_-1",
    //     pathType:WaypointPathType.ONE_WAY,
    //     facilityType:WaypointFacilityType.DOOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //     ],
    //     mapCoordinates:{
    //         x:210,
    //         y:291,
    //         floor:-1
    //     }
    // },
    

    // {
        
    //     id:"node_edge_align_entrance_left_hall_help_floor_-1",
    //     title:"node_edge_align_entrance_left_hall_help_floor_-1",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.DOWN,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:231,
    //         y:281,
    //         floor:-1
    //     }
    // },
    
    // {
        
    //     id:"node_help_room_floor_-1",
    //     title:"node_help_room_floor_-1",
    //     pathType:WaypointPathType.ONE_WAY,
    //     facilityType:WaypointFacilityType.DOOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.DOWN,
    //         Direction.UP,
    //     ],
    //     mapCoordinates:{
    //         x:231,
    //         y:281,
    //         floor:-1
    //     }
    // },

    // {
        
    //     id:"node_edge_align_entrance_left_hall_tech_help_floor_-1",
    //     title:"node_edge_align_entrance_left_hall_tech_help_floor_-1",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:327,
    //         y:281,
    //         floor:-1
    //     }
    // },
    
    // {
        
    //     id:"node_tech_help_floor_-1",
    //     title:"node_tech_help_floor_-1",
    //     pathType:WaypointPathType.ONE_WAY,
    //     facilityType:WaypointFacilityType.DOOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //     ],
    //     mapCoordinates:{
    //         x:327,
    //         y:338,
    //         floor:-1
    //     }
    // },
    

    // {
        
    //     id:"node_edge_align_lab_entrance_first_floor_-1",
    //     title:"node_edge_align_lab_entrance_first_floor_-1",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:413,
    //         y:271,
    //         floor:-1
    //     }
    // },
    

    // {
        
    //     id:"node_edge_align_lab_entrance_second_floor_-1",
    //     title:"node_edge_align_lab_entrance_second_floor_-1",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //         Direction.LEFT,
    //         Direction.RIGHT,
    //     ],
    //     mapCoordinates:{
    //         x:434,
    //         y:271,
    //         floor:-1
    //     }
    // },
    
    // {
        
    //     id:"node_edge_align_labs_intersect_floor-1",
    //     title:"node_edge_align_labs_intersect_floor-1",
    //     pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
    //     facilityType:WaypointFacilityType.NONE,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP_RIGHT,
    //         Direction.UP_LEFT,
    //         Direction.LEFT,
    //     ],
    //     mapCoordinates:{
    //         x:422,
    //         y:281,
    //         floor:-1
    //     }
    // },



    // {
        
    //     id:"node_room_under_stairs_floor-1",
    //     title:"node_room_under_stairs_floor-1",
    //     pathType:WaypointPathType.ONE_WAY,
    //     facilityType:WaypointFacilityType.DOOR,
    //     POIId:null,
    //     isAvailable:true,
    //     availableHeadings:[
    //         Direction.UP,
    //         Direction.DOWN,
    //     ],
    //     mapCoordinates:{
    //         x:428,
    //         y:304,
    //         floor:-1
    //     }
    // },

    

]

const edges = [
    {
        id:"edge_main_entrance",
        title:"edge_main_entrance",
        nodeA:"node_main_entrance",
        nodeB:"node_main_entrance_path_center",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    
    {
        id:"edge_main_entrance_path_center__main_front_entrance_path_center",
        title:"edge_main_entrance",
        nodeA:"node_main_entrance_path_center",
        nodeB:"node_main_front_entrance_path_center",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_main_entrance_path_center__main_front_entrance_path_center",
        title:"edge_main_entrance",
        nodeA:"node_main_front_entrance_path_center",
        nodeB:"node_edge_align_in_front_door",
        pathType:SegmentPathType.STAIRS,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_node_main_entrance_path_center_node_main_intersect_accessible_path",
        title:"edge_node_main_entrance_path_center_node_main_intersect_accessible_path",
        nodeA:"node_main_entrance_path_center",
        nodeB:"node_main_intersect_accessible_path",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    
    {
        id:"edge_node_main_intersect_accessible_path_node_main_path_outside_right_intersect",
        title:"edge_node_main_intersect_accessible_path_node_main_path_outside_right_intersect",
        nodeA:"node_main_intersect_accessible_path",
        nodeB:"node_main_path_outside_right_intersect",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    
    {
        id:"edge_node_main_path_outside_right_intersect_node_main_path_outside_stairs_right",
        title:"edge_node_main_path_outside_right_intersect_node_main_path_outside_stairs_right",
        nodeA:"node_main_path_outside_right_intersect",
        nodeB:"node_main_path_outside_stairs_right",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_node_main_front_entrance_path_center_node_smoking_area_left_outside",
        title:"edge_node_main_front_entrance_path_center_node_smoking_area_left_outside",
        nodeA:"node_main_front_entrance_path_center",
        nodeB:"node_smoking_area_left_outside",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
        

    {
        id:"edge_node_smoking_area_left_outside_node_smoking_area_stairs",
        title:"edge_node_smoking_area_left_outside_node_smoking_area_stairs",
        nodeA:"node_smoking_area_left_outside",
        nodeB:"node_smoking_area_stairs",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_node_main_intersect_accessible_path_node_main_start_accessible_path",
        title:"node_main_intersect_accessible_path_node_main_start_accessible_path",
        nodeA:"node_main_intersect_accessible_path",
        nodeB:"node_main_start_accessible_path",
        pathType:SegmentPathType.RAMP,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_node_main_start_accessible_path_node_main_corner_accessible_path",
        title:"edge_node_main_start_accessible_path_node_main_corner_accessible_path",
        nodeA:"node_main_start_accessible_path",
        nodeB:"node_main_corner_accessible_path",
        pathType:SegmentPathType.RAMP,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_node_main_corner_accessible_path_node_edge_end_ramp_front_door",
        title:"edge_node_main_corner_accessible_path_node_edge_end_ramp_front_door",
        nodeA:"node_main_corner_accessible_path",
        nodeB:"node_edge_end_ramp_front_door",
        pathType:SegmentPathType.RAMP,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_node_edge_end_ramp_front_door_node_edge_align_in_front_door",
        title:"edge_node_edge_end_ramp_front_door_node_edge_align_in_front_door",
        nodeA:"node_edge_end_ramp_front_door",
        nodeB:"node_edge_align_in_front_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_node_edge_align_in_front_door_node_front_door",
        title:"node_edge_align_in_front_door_node_front_door",
        nodeA:"node_edge_align_in_front_door",
        nodeB:"node_front_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_front_door",
        nodeB:"node_edge_align_male_bathroom_f0_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_male_bathroom_f0_door",
        nodeB:"node_male_bathroom_f0_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_female_bathroom_f0_door",
        nodeB:"node_female_bathroom_f0_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_male_bathroom_f0_door",
        nodeB:"node_edge_align_female_bathroom_f0_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_handicap_bathroom_f0_door",
        nodeB:"node_handicap_bathroom_f0_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_female_bathroom_f0_door",
        nodeB:"node_edge_align_handicap_bathroom_f0_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_handicap_bathroom_f0_door",
        nodeB:"node_edge_align_entrance_hall_intersect_left",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_entrance_hall_intersect_left",
        nodeB:"node_edge_align_entrance_hall_intersect_right",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_entrance_hall_intersect_right",
        nodeB:"node_edge_align_entrance_hall_intersect_left_down",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_entrance_hall_intersect_left_down",
        nodeB:"node_information_desk",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },



    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_entrance_hall_intersect_left",
        nodeB:"node_edge_align_stairs_middle_up",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_entrance_hall_intersect_left_down",
        nodeB:"node_edge_align_stairs_middle_down",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_stairs_middle_down",
        nodeB:"node_edge_align_stairs_middle",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_stairs_middle_up",
        nodeB:"node_edge_align_stairs_middle",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_stairs_middle",
        nodeB:"node_stairs_middle",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_stairs_middle",
        nodeB:"node_edge_align_left_down_classrooms_intersect_right",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_left_down_classrooms_intersect_right",
        nodeB:"node_classroom_208",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_left_down_classrooms_intersect_right",
        nodeB:"node_classroom_205",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_left_down_classrooms_intersect_right",
        nodeB:"node_edge_align_left_down_classrooms_intersect_left",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_left_down_classrooms_intersect_left",
        nodeB:"node_classroom_207",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_left_down_classrooms_intersect_left",
        nodeB:"node_classroom_206_top",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_left_down_classrooms_intersect_left",
        nodeB:"node_edge_align_intersect_stairs_left_hall",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_stairs_middle",
        nodeB:"node_stairs_middle_floor_-1",
        pathType:SegmentPathType.STAIRS,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_entrance_hall_intersect_right",
        nodeB:"node_edge_align_classrooms_intersect_right",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


        
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_entrance_hall_intersect_right",
        nodeB:"node_edge_align_right_area_classrooms_intersect_left",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_right_area_classrooms_intersect_left",
        nodeB:"node_edge_align_classrooms_intersect_right",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_classrooms_intersect_right",
        nodeB:"node_classroom_203",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_classrooms_intersect_right",
        nodeB:"node_classroom_202",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_right_area_classrooms_intersect_left",
        nodeB:"node_classroom_201",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_right_area_classrooms_intersect_left",
        nodeB:"node_classroom_204",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_intersect_stairs_left_hall",
        nodeB:"node_left_stairway_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_left_stairway_door",
        nodeB:"node_left_stairway_center",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_left_stairway_center",
        nodeB:"node_left_stairway_stairs",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_left_stairway_stairs",
        nodeB:"node_left_stairway_stairs_floor_-1",
        pathType:SegmentPathType.STAIRS,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },




    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_intersect_stairs_left_hall",
        nodeB:"node_hall_intersect_left_down_front_206",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_hall_intersect_left_down_front_206",
        nodeB:"node_hall_intersect_left_down_front_room",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_hall_intersect_left_down_front_206",
        nodeB:"node_classroom_206_left_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_hall_intersect_left_down_front_room",
        nodeB:"node_room_left_next_206",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_hall_intersect_left_down_front_room",
        nodeB:"node_edge_align_lab_area_intersect",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_area_intersect",
        nodeB:"node_edge_align_lab_area_stairs_intersect",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_area_intersect",
        nodeB:"node_floor_0_elevator",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_area_stairs_intersect",
        nodeB:"node_edge_align_lab_stairs",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_area_stairs_intersect",
        nodeB:"node_edge_align_lab_area_bathroom_intersect",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_area_bathroom_intersect",
        nodeB:"node_edge_align_lab_area_path_hall",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_area_bathroom_intersect",
        nodeB:"node_edge_align_lab_area_bathroom",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_area_path_hall",
        nodeB:"node_edge_align_lab_area_lab_corner",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_area_lab_corner",
        nodeB:"node_lab_area_lab",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_entrance_hall_intersect_right",
        nodeB:"node_edge_align_beverage_machine",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_beverage_machine",
        nodeB:"node_edge_align_intersect_right_beverage",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_intersect_right_beverage",
        nodeB:"node_edge_align_stairs_classroom_intersect_right",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_stairs_classroom_intersect_right",
        nodeB:"node_classroom_200",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_stairs_classroom_intersect_right",
        nodeB:"node_edge_align_stairs_outside_door",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_stairs_outside_door",
        nodeB:"node_stairs_right",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_stairs_right",
        nodeB:"node_edge_align_stairs_outside_right",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    {
        id:"edge_",
        title:"",
        nodeA:"node_stairs_right",
        nodeB:"node_stairs_right_half_floor_leftside",
        pathType:SegmentPathType.STAIRS,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    
    {
        id:"edge_",
        title:"",
        nodeA:"node_stairs_right_half_floor_leftside",
        nodeB:"node_stairs_right_half_floor_rightside",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },
    




    {
        id:"edge_",
        title:"",
        nodeA:"node_stairs_right_half_floor_rightside",
        nodeB:"node_stairs_right_floor_-1",
        pathType:SegmentPathType.STAIRS,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },


    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_stairs",
        nodeB:"node_edge_align_lab_stairs_middle_floor_bottom",
        pathType:SegmentPathType.STAIRS,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

 

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_stairs_middle_floor_bottom",
        nodeB:"node_edge_align_lab_stairs_middle_floor_up",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_edge_align_lab_stairs_middle_floor_up",
        nodeB:"node_edge_align_lab_stairs_floor-1",
        pathType:SegmentPathType.STAIRS,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_smoking_area_stairs",
        nodeB:"node_smoking_area_stairs_floor_-1",
        pathType:SegmentPathType.TRAIL,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_main_path_outside_stairs_right",
        nodeB:"node_main_path_outside_stairs_right_floor_-1",
        pathType:SegmentPathType.STAIRS,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },

    {
        id:"edge_",
        title:"",
        nodeA:"node_floor_0_elevator",
        nodeB:"node_elevator_floor_-1",
        pathType:SegmentPathType.ELEVATOR,
        isAvailable:true,
        visualMapArea:null,
        availableHeadings:null,
        weight:null,
    },



























  // 
  {
    id:"edge_",
    title:"",
    nodeA:"node_smoking_area_stairs_floor_-1",
    nodeB:"node_edge_align_front_left_front_entrance",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_left_front_entrance",
    nodeB:"node_edge_align_front_left_front_entrance",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_front_left_front_entrance",
    nodeB:"node_bottom_left_yard_bottom_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_bottom_left_yard_bottom_intersect",
    nodeB:"node_bottom_left",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},





{
    id:"edge_",
    title:"",
    nodeA:"node_front_lab_top_entrance",
    nodeB:"node_lab_top_entrance_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_front_lab_top_entrance",
    nodeB:"node_left_yard_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_bottom_left_yard_bottom_intersect",
    nodeB:"node_bottom_left_yard_left_stairs_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

  {
    id:"edge_",
    title:"",
    nodeA:"node_main_path_outside_stairs_right_floor_-1",
    nodeB:"node_align_right_stairs_outside_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_right_stairs_room_intersect",
    nodeB:"node_infront_right_stairs_room",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_right_stairs_intersect",
    nodeB:"node_edge_align_right_stairs_room_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_align_right_stairs_outside_intersect",
    nodeB:"node_edge_align_right_stairs_room_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},



{
    id:"edge_",
    title:"",
    nodeA:"node_left_front_entrance",
    nodeB:"node_edge_align_112_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_112_intersect",
    nodeB:"node_112_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_112_intersect",
    nodeB:"node_edge_align_111_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_111_intersect",
    nodeB:"node_111_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_111_intersect",
    nodeB:"node_edge_align_114_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_114_intersect",
    nodeB:"node_114_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_114_intersect",
    nodeB:"node_edge_align_114_lab_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_114_lab_intersect",
    nodeB:"node_edge_align_114_lab_door_front",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_114_lab_door_front",
    nodeB:"node_114_lab_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_114_lab_intersect",
    nodeB:"node_edge_align_unknown_room_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},
{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_unknown_room_intersect",
    nodeB:"node_unknown_room_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_unknown_room_intersect",
    nodeB:"node_edge_align_115_lab_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_115_lab_intersect",
    nodeB:"node_edge_align_115_lab_floor_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_115_lab_floor_intersect",
    nodeB:"node_edge_align_115_lab_door_front",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_115_lab_door_front",
    nodeB:"node_115_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_115_lab_floor_intersect",
    nodeB:"node_edge_align_stairs_floor-1_middle_up",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_102_front_door",
    nodeB:"node_102_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_102_front_door",
    nodeB:"node_inside_front_yard_entrance",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_116_room_intersect",
    nodeB:"node_inside_front_yard_entrance",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_116_door_front",
    nodeB:"node_edge_align_stairs_floor-1_middle_up",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_102_hall_intersect",
    nodeB:"node_edge_align_electricity_room_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_102_hall_intersect",
    nodeB:"node_edge_align_102_front_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_102_hall_intersect",
    nodeB:"node_edge_align_center_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_right_area_upward_hall_intersect",
    nodeB:"node_edge_align_right_area_hall_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_right_area_upward_hall_intersect",
    nodeB:"node_edge_align_right_area_upward_hall_room_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_bathroom_door_floor-1",
    nodeB:"node_edge_align_right_area_upward_hall_room_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_electricity_room_intersect",
    nodeB:"node_edge_align_right_area_hall_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_101_door_front",
    nodeB:"node_edge_align_right_area_hall_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_101_door_front",
    nodeB:"node_101_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_116_door_front",
    nodeB:"node_116_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_bathroom_female_door_floor-1",
    nodeB:"node_edge_align_bathroom_intersect_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_bathroom_male_door_floor-1",
    nodeB:"node_edge_align_bathroom_intersect_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_116_room_intersect",
    nodeB:"node_116_door_front",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_stairs_floor-1_middle_down",
    nodeB:"node_inside_front_yard_entrance",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_inside_front_yard_entrance",
    nodeB:"node_yard_entrance_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_stairs_floor-1_middle",
    nodeB:"node_stairs_middle_floor_-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},
{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_stairs_floor-1_middle",
    nodeB:"node_edge_align_stairs_floor-1_middle_up",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_stairs_floor-1_middle",
    nodeB:"node_edge_align_stairs_floor-1_middle_down",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_stairs_floor-1_middle_down",
    nodeB:"node_edge_align_103_door_front",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_103_door_front",
    nodeB:"node_103_door",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


// {
//     id:"edge_",
//     title:"",
//     nodeA:"node_edge_align_115_lab_floor_intersect",
//     nodeB:"x",
//     pathType:SegmentPathType.TRAIL,
//     isAvailable:true,
//     visualMapArea:null,
//     availableHeadings:null,
//     weight:null,
// },

// {
//     id:"edge_",
//     title:"",
//     nodeA:"x",
//     nodeB:"node_116_door_front",
//     pathType:SegmentPathType.TRAIL,
//     isAvailable:true,
//     visualMapArea:null,
//     availableHeadings:null,
//     weight:null,
// },

// { UNSURE
//     id:"edge_",
//     title:"",
//     nodeA:"node_align_room_right_stairs_outside_intersect",
//     nodeB:"node_yard_intersect_outside_right",
//     pathType:SegmentPathType.TRAIL,
//     isAvailable:true,
//     visualMapArea:null,
//     availableHeadings:null,
//     weight:null,
// },
{
    id:"edge_",
    title:"",
    nodeA:"node_left_stairway_stairs_floor_-1",
    nodeB:"node_bottom_left_yard_left_stairs_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_lab_stairs_floor-1",
    nodeB:"node_edge_align_lab_stairs_entrace_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_center_stairs_intersect_lab_floor_-1",
    nodeB:"node_center_elevator_intersect_lab_floor_-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_center_stairs_intersect_lab_floor_-1",
    nodeB:"node_edge_align_lab_stairs_entrace_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_right_area_upward_hall_room_intersect",
    nodeB:"node_unknown_room_4_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_lab_right_yard_door_floor-1",
    nodeB:"node_center_intersect_lab_floor_-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_elevator_floor_-1",
    nodeB:"node_center_elevator_intersect_lab_floor_-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_floor_0_elevator",
    nodeB:"node_edge_align_lab_area_path_hall",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_left_yard_intersect",
    nodeB:"node_edge_align_yard_lab_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_front_innovation_and_entrepreneurship_center",
    nodeB:"node_innovation_and_entrepreneurship_center",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_yard_lab_intersect",
    nodeB:"node_lab_yard_right_infront_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_center_stairs_intersect_lab_floor_-1",
    nodeB:"node_center_intersect_lab_floor_-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_lab_stairs_entrace_intersect",
    nodeB:"node_front_lab_top_entrance",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_right_area_upward_hall_room_intersect",
    nodeB:"node_edge_align_bathroom_intersect_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},



{
    id:"edge_",
    title:"",
    nodeA:"node_bottom_left_yard_left_stairs_intersect",
    nodeB:"node_front_lab_top_entrance",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_align_right_stairs_outside_intersect",
    nodeB:"node_yard_intersect_outside_right",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

// {
//     id:"edge_",
//     title:"",
//     nodeA:"node_edge_align_cafeteria_intersect",
//     nodeB:"",
//     pathType:SegmentPathType.TRAIL,
//     isAvailable:true,
//     visualMapArea:null,
//     availableHeadings:null,
//     weight:null,
// },

{
    id:"edge_",
    title:"",
    nodeA:"node_yard_intersect_outside_right",
    nodeB:"node_front_innovation_and_entrepreneurship_center",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_smoking_area_floor-1",
    nodeB:"node_smoking_area_bottom_left_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_right_stairs_intersect",
    nodeB:"node_stairs_right_floor_-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_cafeteria_infront_intersect",
    nodeB:"node_edge_align_cafeteria_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_cafeteria_intersect",
    nodeB:"node_front_innovation_and_entrepreneurship_center",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},
{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_stairs_floor-1_middle",
    nodeB:"node_edge_align_center_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_116_room_intersect",
    nodeB:"node_edge_align_center_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_inside_front_yard_entrance",
    nodeB:"node_edge_align_center_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_yard_entrance_floor-1",
    nodeB:"node_front_yard_entrance_floor",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},

{
    id:"edge_",
    title:"",
    nodeA:"node_front_yard_entrance_floor",
    nodeB:"node_left_yard_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},
{
    id:"edge_",
    title:"",
    nodeA:"node_front_yard_entrance_floor",
    nodeB:"node_yard_intersect_outside_right",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_cafeteria_intersect",
    nodeB:"node_smoking_area_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},




{
    id:"edge_",
    title:"",
    nodeA:"node_edge_align_cafeteria_intersect",
    nodeB:"node_edge_align_yard_lab_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},




{
    id:"edge_",
    title:"",
    nodeA:"node_smoking_area_bottom_left_intersect",
    nodeB:"node_bottom_left",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},




{
    id:"edge_",
    title:"",
    nodeA:"node_cafeteria_infront_intersect",
    nodeB:"node_cafeteria_door_floor_-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_cafeteria_infront_intersect",
    nodeB:"node_lab_yard_right_infront_intersect",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},


{
    id:"edge_",
    title:"",
    nodeA:"node_lab_yard_right_infront_intersect",
    nodeB:"node_lab_right_yard_door_floor-1",
    pathType:SegmentPathType.TRAIL,
    isAvailable:true,
    visualMapArea:null,
    availableHeadings:null,
    weight:null,
},












]

const POIs = [
    {
        id:"poi_classroom_201",
        mapArea:[
            {
                x:692,
                y:161,
                floor:0,
            },
            {
                x:815,
                y:161,
                floor:0,
            },    
            {
                x:815,
                y:296,
                floor:0,
            },     
  
            {
                x:783,
                y:296,
                floor:0,
            },               
            {
                x:783,
                y:306,
                floor:0,
            },  
            {
                x:692,
                y:306,
                floor:0,
            }, 
                                                       
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Classroom 201",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },
    {
        id:"poi_classroom_202",
        mapArea:[
            {
                x:819,
                y:161,
                floor:0,
            },
            {
                x:943,
                y:161,
                floor:0,
            },    
            {
                x:943,
                y:306,
                floor:0,
            },     
            {
                x:851,
                y:306,
                floor:0,
            },   
            {
                x:851,
                y:296,
                floor:0,
            },  
            {
                x:819,
                y:296,
                floor:0,
            },                                                          
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Classroom 202",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },
    {
        id:"poi_classroom_200",
        mapArea:[
            {
                x:947,
                y:107,
                floor:0,
            },
            {
                x:1076,
                y:107,
                floor:0,
            },    
            {
                x:1076,
                y:292,
                floor:0,
            },     
            {
                x:947,
                y:292,
                floor:0,
            },                                                            
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Classroom 200",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },
    {
        id:"poi_classroom_204",
        mapArea:[
            {
                x:692,
                y:368,
                floor:0,
            },
            {
                x:791,
                y:368,
                floor:0,
            },         
            {
                x:791,
                y:379,
                floor:0,
            },                    
            {
                x:815,
                y:379,
                floor:0,
            }, 
            {
                x:815,
                y:513,
                floor:0,
            },               
            {
                x:692,
                y:513,
                floor:0,
            },                                                        
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Classroom 204",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },
    {
        id:"poi_classroom_203",
        mapArea:[
            {
                x:819,
                y:379,
                floor:0,
            },
            {
                x:843,
                y:379,
                floor:0,
            },    
            {
                x:843,
                y:369,
                floor:0,
            },     
            {
                x:942,
                y:369,
                floor:0,
            }, 
            {
                x:942,
                y:513,
                floor:0,
            },     
            {
                x:819,
                y:513,
                floor:0,
            },                                                                         
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Classroom 203",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },
    
    {
        id:"poi_information_desk",
        mapArea:[
            {
                x:563,
                y:413,
                floor:0,
            },
            {
                x:687,
                y:413,
                floor:0,
            },    
            {
                x:687,
                y:453,
                floor:0,
            },               
            {
                x:563,
                y:453,
                floor:0,
            },     
                                                                      
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Information Desk",
            description:"Information Desk",
            POIType:POIType.INFORMATION_DESK,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },
    
    {
        id:"poi_classroom_205",
        mapArea:[
            {
                x:515,
                y:513,
                floor:0,
            },
            {
                x:515,
                y:384,
                floor:0,
            },    
            {
                x:374,
                y:384,
                floor:0,
            },     
            {
                x:374,
                y:394,
                floor:0,
            }, 
            {
                x:349,
                y:394,
                floor:0,
            },     
            {
                x:349,
                y:513,
                floor:0,
            },                                                                         
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Classroom 205",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },
    {
        id:"poi_room_206",
        mapArea:[
            {
                x:345,
                y:513,
                floor:0,
            },
            {
                x:345,
                y:394,
                floor:0,
            },    
            {
                x:311,
                y:394,
                floor:0,
            },     
            {
                x:311,
                y:389,
                floor:0,
            }, 
            {
                x:271,
                y:389,
                floor:0,
            },     
            {
                x:271,
                y:513,
                floor:0,
            },                                                                         
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Room 206",
            description:"Room",
            POIType:POIType.UNKNOWN,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },

    {
        id:"poi_classroom_207",
        mapArea:[
            {
                x:178,
                y:161,
                floor:0,
            },
            {
                x:345,
                y:161,
                floor:0,
            },    
            {
                x:345,
                y:282,
                floor:0,
            },     
            {
                x:311,
                y:282,
                floor:0,
            }, 
            {
                x:311,
                y:291,
                floor:0,
            },     
            {
                x:178,
                y:291,
                floor:0,
            },                                                                         
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Classroom 207",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },   
    
    {
        id:"poi_classroom_208",
        mapArea:[
            {
                x:348,
                y:161,
                floor:0,
            },
            {
                x:507,
                y:161,
                floor:0,
            },    
            {
                x:507,
                y:291,
                floor:0,
            },     
            {
                x:374,
                y:291,
                floor:0,
            }, 
            {
                x:374,
                y:282,
                floor:0,
            },     
            {
                x:348,
                y:282,
                floor:0,
            },                                                                         
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"Classroom 208",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },  


    {
        id:"poi_bathroom_main_entrance",
        mapArea:[
            {
                x:511,
                y:161,
                floor:0,
            },
            {
                x:559,
                y:161,
                floor:0,
            },    
            {
                x:559,
                y:291,
                floor:0,
            },     
            {
                x:511,
                y:291,
                floor:0,
            },                                                                         
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"bathroom",
            description:"near main entrance bathroom",
            POIType:POIType.BATHROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },  

    {
        id:"poi_bathroom_labs",
        mapArea:[
            {
                x:98,
                y:667,
                floor:0,
            },
            {
                x:216,
                y:667,
                floor:0,
            },    
            {
                x:216,
                y:723,
                floor:0,
            },     
            {
                x:98,
                y:723,
                floor:0,
            },      
            {
                x:98,
                y:667,
                floor:0,
            },                                                                                   
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"bathroom",
            description:"near labs bathroom",
            POIType:POIType.BATHROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },     

    {
        id:"poi_labs",
        mapArea:[
            {
                x:98,
                y:1037,
                floor:0,
            },   
            {
                x:349,
                y:1037,
                floor:0,
            },                 

            {
                x:349,
                y:1091,
                floor:0,
            },    

            {
                x:98,
                y:1091,
                floor:0,
            },
                                                                                
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"labs",
            description:"labs",
            POIType:POIType.LAB,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },  
    
    {
        id:"poi_vending_machine",
        mapArea:[
            {
                x:956,
                y:342,
                floor:0,
            },
            {
                x:943,
                y:342,
                floor:0,
            },  
            {
                x:943,
                y:326,
                floor:0,
            },                
            {
                x:956,
                y:326,
                floor:0,
            },     
                                                                       
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"vending machine",
            description:"snacks and foods",
            POIType:POIType.VENDING_MACHINE,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_smoking_area_floor_0",
        mapArea:[
            {
                x:3,
                y:3,
                floor:0,
            },
            {
                x:85,
                y:3,
                floor:0,
            },   
            {
                x:85,
                y:100,
                floor:0,
            },            
            {
                x:3,
                y:100,
                floor:0,
            },                
            
                                                                      
        ],
        isAvailable:true,
        floor:0,
        isEmployeeOnly:false,
        details:{
            title:"smoking area",
            description:"smoking area",
            POIType:POIType.SMOKING_AREA,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_lab_114",
        mapArea:[
            {
                x:242,
                y:290,
                floor:-1,
            },
            {
                x:387,
                y:290,
                floor:-1,
            },    
            {
                x:387,
                y:257,
                floor:-1,
            },     
            {
                x:429,
                y:257,
                floor:-1,
            },      
            {
                x:429,
                y:161,
                floor:-1,
            },     
            {
                x:242,
                y:161,
                floor:-1,
            },                                                                    
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"shelter lab room 114",
            description:"",
            POIType:POIType.VENDING_MACHINE,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_room_116",
        mapArea:[
            {
                x:563,
                y:161,
                floor:-1,
            },
            {
                x:687,
                y:161,
                floor:-1,
            },    
            {
                x:687,
                y:287,
                floor:-1,
            },     
            {
                x:563,
                y:287,
                floor:-1,
            },                                                                         
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"Room 116",
            description:"Room",
            POIType:POIType.UNKNOWN,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },



    {
        id:"poi_room_120",
        mapArea:[
            {
                x:177,
                y:161,
                floor:-1,
            },
            {
                x:177,
                y:290,
                floor:-1,
            },    
            {
                x:238,
                y:290,
                floor:-1,
            },     
            {
                x:238,
                y:161,
                floor:-1,
            },                                                                         
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"Room 112",
            description:"Room",
            POIType:POIType.UNKNOWN,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },





    {
        id:"poi_room_111",
        mapArea:[
            {
                x:177,
                y:340,
                floor:-1,
            },
            {
                x:247,
                y:340,
                floor:-1,
            },  
            {
                x:247,
                y:413,
                floor:-1,
            },   
            {
                x:247,
                y:417,
                floor:-1,
            },  
            {
                x:225,
                y:417,
                floor:-1,
            },     
            {
                x:225,
                y:413,
                floor:-1,
            },         
            {
                x:177,
                y:413,
                floor:-1,
            },     
                                                                        
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"Room 111",
            description:"Room",
            POIType:POIType.ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },



    // {
    //     id:"poi_room_109",
    //     mapArea:[
    //         {
    //             x:177,
    //             y:455,
    //             floor:-1,
    //         },
    //         {
    //             x:249,
    //             y:455,
    //             floor:-1,
    //         },    
    //         {
    //             x:249,
    //             y:514,
    //             floor:-1,
    //         },     
    //         {
    //             x:177,
    //             y:514,
    //             floor:-1,
    //         },                                                                         
    //     ],
    //     isAvailable:true,
    //     floor:-1,
    //     isEmployeeOnly:false,
    //     details:{
    //         title:"Room 109",
    //         description:"Room",
    //         POIType:POIType.ROOM,
    //         openingHours:null,
    //         closingHours:null,
    //         websiteLink:null,
    //         phonenumbers:null,
    //         POIOpeningDate:null,
    //         storageImageKey:null,
    //         imageUri:null
    //     }
      
    // },



    {
        id:"poi_room_112",
        mapArea:[
            {
                x:249,
                y:340,
                floor:-1,
            },
            {
                x:331,
                y:340,
                floor:-1,
            },  
            {
                x:331,
                y:514,
                floor:-1,
            },             
            {
                x:249,
                y:514,
                floor:-1,
            },    
    
                                                                       
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"Room 109",
            description:"Room",
            POIType:POIType.ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },



    {
        id:"poi_room_107_105",
        mapArea:[
            {
                x:334,
                y:340,
                floor:-1,
            },
            {
                x:390,
                y:340,
                floor:-1,
            },    
            {
                x:390,
                y:514,
                floor:-1,
            },     
            {
                x:334,
                y:514,
                floor:-1,
            },                                                                         
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"Room 107 and 105",
            description:"Room",
            POIType:POIType.ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },



    {
        id:"poi_classroom_103",
        mapArea:[
            {
                x:393,
                y:384,
                floor:-1,
            },
            {
                x:529,
                y:384,
                floor:-1,
            },    
            {
                x:529,
                y:399,
                floor:-1,
            },     
            {
                x:565,
                y:399,
                floor:-1,
            },    
            {
                x:565,
                y:514,
                floor:-1,
            },     
            {
                x:393,
                y:514,
                floor:-1,
            },                                                                      
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"classroom 103",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_classroom_102",
        mapArea:[
            {
                x:690,
                y:382,
                floor:-1,
            },
            {
                x:718,
                y:382,
                floor:-1,
            },    
            {
                x:718,
                y:367,
                floor:-1,
            },     
            {
                x:814,
                y:367,
                floor:-1,
            },    
            {
                x:814,
                y:514,
                floor:-1,
            },     
            {
                x:690,
                y:514,
                floor:-1,
            },                                                                      
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"classroom 102",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_classroom_101",
        mapArea:[
            {
                x:818,
                y:339,
                floor:-1,
            },
            {
                x:945,
                y:339,
                floor:-1,
            },   

            {
                x:945,
                y:514,
                floor:-1,
            },     
            {
                x:818,
                y:514,
                floor:-1,
            },   
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"classroom 101",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },



    {
        id:"poi_afeka_center_for_entrepreneurship_and_innovation",
        mapArea:[
            {
                x:963,
                y:810,
                floor:-1,
            },
            {
                x:963,
                y:886,
                floor:-1,
            },    
            {
                x:1128,
                y:886,
                floor:-1,
            },     
            {
                x:1128,
                y:810,
                floor:-1,
            },    
                                                                    
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"classroom 101",
            description:"classroom",
            POIType:POIType.CLASS_ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    
    {
        id:"poi_bathroom_female_minus_1",
        mapArea:[
            {
                x:945,
                y:161,
                floor:-1,
            },   
            {
                x:945,
                y:238,
                floor:-1,
            },  
            {
                x:878,
                y:238,
                floor:-1,
            },  
            {
                x:878,
                y:231,
                floor:-1,
            },  
            {
                x:844,
                y:231,
                floor:-1,
            }, 

            {
                x:844,
                y:207,
                floor:-1,
            }, 
            {
                x:832,
                y:207,
                floor:-1,
            }, 

            {
                x:832,
                y:161,
                floor:-1,
            },
 
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"female bathroom floor -1",
            description:"female bathroom",
            POIType:POIType.BATHROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_bathroom_male_minus_1",
        mapArea:[
            {
                x:692,
                y:161,
                floor:-1,
            },

            {
                x:800,
                y:161,
                floor:-1,
            },

            {
                x:800,
                y:207,
                floor:-1,
            },

            {
                x:791,
                y:207,
                floor:-1,
            },

            {
                x:791,
                y:260,
                floor:-1,
            },

            {
                x:758,
                y:260,
                floor:-1,
            },
            {
                x:758,
                y:216,
                floor:-1,
            },

            {
                x:692,
                y:216,
                floor:-1,
            },    
                                                                    
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"males bathroom floor -1",
            description:"male bathroom",
            POIType:POIType.BATHROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_smoking_area_floor_-1",
        mapArea:[
            {
                x:362,
                y:1020,
                floor:-1,
            },
            {
                x:362,
                y:1204,
                floor:-1,
            },   
            {
                x:570,
                y:1204,
                floor:-1,
            },             
            {
                x:570,
                y:1020,
                floor:-1,
            },    
  
                                                                        
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"smoking area",
            description:"smoking area",
            POIType:POIType.SMOKING_AREA,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    
    {
        id:"poi_cafeteria_floor_-1",
        mapArea:[
            {
                x:359,
                y:697,
                floor:-1,
            },
            {
                x:359,
                y:1116,
                floor:-1,
            },    
            {
                x:98,
                y:1116,
                floor:-1,
            },     
            {
                x:98,
                y:666,
                floor:-1,
            },        
            {
                x:224,
                y:666,
                floor:-1,
            },     
            {
                x:224,
                y:697,
                floor:-1,
            },                                                                 
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"cafeteria",
            description:"cafeteria has a store and free for use microwaves",
            POIType:POIType.CAFETERIA,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_room_119",
        mapArea:[
            {
                x:823,
                y:271,
                floor:-1,
            },
            {
                x:834,
                y:271,
                floor:-1,
            },    
            {
                x:834,
                y:274,
                floor:-1,
            },  
            
            

            {
                x:945,
                y:274,
                floor:-1,
            },   
            
            
            {
                x:945,
                y:336,
                floor:-1,
            },  
            
            

            {
                x:823,
                y:336,
                floor:-1,
            },                                                                 
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"room 119",
            description:"",
            POIType:POIType.ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_room_unknown",
        mapArea:[
            {
                x:949,
                y:107,
                floor:-1,
            },
            {
                x:1076,
                y:107,
                floor:-1,
            },    
            {
                x:1076,
                y:292,
                floor:-1,
            },  
            
            {
                x:949,
                y:292,
                floor:-1,
            },   
                                                                           
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"room unknown",
            description:"",
            POIType:POIType.ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_room_115",
        mapArea:[
            {
                x:432,
                y:161,
                floor:-1,
            },
            {
                x:558,
                y:161,
                floor:-1,
            },    
            {
                x:558,
                y:290,
                floor:-1,
            },  
            
            {
                x:472,
                y:290,
                floor:-1,
            },   

            {
                x:472,
                y:257,
                floor:-1,
            }, 
                       
            
            {
                x:432,
                y:257,
                floor:-1,
            }, 
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"room 115",
            description:"",
            POIType:POIType.ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },


    {
        id:"poi_unknown_room_2",
        mapArea:[
            {
                x:393,
                y:340,
                floor:-1,
            },
            {
                x:464,
                y:340,
                floor:-1,
            },    
            {
                x:464,
                y:381,
                floor:-1,
            },  
            
            {
                x:393,
                y:381,
                floor:-1,
            },   

        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"unknown room 2",
            description:"",
            POIType:POIType.ROOM,
            openingHours:null,
            closingHours:null,
            websiteLink:null,
            phonenumbers:null,
            POIOpeningDate:null,
            storageImageKey:null,
            imageUri:null
        }
      
    },
]

const afekaBuildingCardinalDirections = {
    [Direction.DOWN]:CardinalDirection.NORTH,
    [Direction.UP]:CardinalDirection.SOUTH,
    [Direction.LEFT]: CardinalDirection.EAST,
    [Direction.RIGHT]: CardinalDirection.WEST,    
    [Direction.UP_LEFT]: CardinalDirection.SOUTH_EAST,
    [Direction.UP_RIGHT]: CardinalDirection.SOUTH_WEST,
    [Direction.DOWN_LEFT]:CardinalDirection.NORTH_EAST,
    [Direction.DOWN_RIGHT]:CardinalDirection.NORTH_WEST,
}

const afekaBuildingData = {
    _id:afekaBuildingId,
    status:BuildingStatus.PRODUCTION,
    details:{
        title:'Afeka',
        description:'afeka college',
        buildingType:BuildingType.COLLEGE,
        address:{
            country: "Israel",
            state: "Tel Aviv District",
            city: "Tel Aviv-Yafo",
            street: "Mivtsa Kadesh",
            streetNumber: "38",
            postalCode:6998812,
        },
        openingHours:{
            "Sunday": { open: 9, close: 21 },
            "Monday": { open: 9, close: 21 },
            "Tuesday": { open: 9, close: 21 },
            "Wednesday": { open: 9, close: 21 },
            "Thursday": { open: 9, close: 21 },
            "Friday": { open: 9, close: 13 },
            "Saturday": { open: null, close: null } // Closed all day
        },
        owner:null,
        
        websiteLink:`https://www.afeka.ac.il/`,
        phoneNumbers:{
            "secretery":`03-768-8600`
        },
        buildingOpeningDate: new Date('1996-01-01'),
        accessibility:{
            elevator:true,
            parking:true,
            wheelchairAccessibleParking:true,
            wheelchairAccessibleToilet:true,
            wheelchairAccessibleEntrance:true
        },
        activities:{
            toilets:true,
            freeWifi:true,
            restaurants:false,
            delis:true,
            convenienceStores:false,
            smokingArea:true
        }
    },
    geoArea:[
        {
            latitude:31.93441555065376, 
            longitude:34.80631845630264
        },
        {
            latitude:31.93439651279175, 
            longitude:34.80696153568204
        },
        {
            latitude:31.933977678830264, 
            longitude:34.80699892401805
        },
        {
            latitude:31.934034792664654, 
            longitude:34.80640818830907
        },                        
    ],
    entrances:[
        {
            title:'main-entrance',
            description:" afeka campus main entrance",
            isMain:true,
            floor:0,
            isEmployeeOnly:false,
            isAvailable:true,
            geoTransitionArea:[
                {
                    latitude:32.11346715888711,
                    longitude:34.818165001968
                }
            ],
            doorGeoCoordinate:{
                latitude:32.11346715888711,
                longitude:34.818165001968
            }

        },

    ]
}

const afekaBuildingMapData = {
    buildingId:afekaBuildingId,
    minFloor:-1,
    maxFloor:0,
    numFloors:2,
    cardinalDirections:afekaBuildingCardinalDirections,
    POIs:POIs,
    floorHeights:{
        [-1]: 1,
        0: 1, 
    },
    // POIsMaps:
}


const afekaBuildingGraphMap = {
    buildingId:afekaBuildingId,
    // graphMaps:
    nodes:nodes,
    edges:edges
}


const afekaBuildingWifiMap = {
    buildingId:afekaBuildingId,
    data:[]
}

const afekaBuildingMagneticMap = {
    buildingId:afekaBuildingId,
    data:[]
}

const afekaBuildingSeed:BuildingSeed = {
    buildingTitle:"afeka",
    buildingId:afekaBuildingId,
    data:{
        override:true,
        data:afekaBuildingData
    },
    map:{
        override:true,
        data:afekaBuildingMapData
    },
    graph:{
        override:false,
        data:afekaBuildingGraphMap
    },
    wifi:{
        override:true,
        data:afekaBuildingWifiMap
    },
    magnetic:{
        override:true,
        data:afekaBuildingMagneticMap
    },
    mapFloors:[
        {
            floor:-1,
            width: 1326,
            height: 1207,
            floorHeight:1,
        },
        {
            floor:0,
            width: 1326,
            height: 1207,
            floorHeight:1,
        }
    ]
}

export default afekaBuildingSeed;