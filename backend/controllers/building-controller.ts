import {Request,Response,NextFunction} from 'express'
import { BuildingStatus, CardinalDirection, Direction, POIType, SegmentPathType, WaypointFacilityType, WaypointPathType } from "../constants/constants";
import BuildingData from "../models/BuildingData";
import BuildingMapData from "../models/BuildingMapData";
import * as buildingsService from '../services/buildings-service';
import fs from 'fs/promises';
import path from 'path';


const afekaBuildingData = {
    id:'324324324343',
    status:'PRODUCTION',
    details:{
        title:'Afeka',
        description:'afeka college',
        buildingType:'COLLEGE',
        address:'Mivtsa Kadesh St 38',
        city:'Tel Aviv-Yafo',
        zipCode:6998812,
        openingHours:{
            "Sunday": { open: 9, close: 21 },
            "Monday": { open: 9, close: 21 },
            "Tuesday": { open: 9, close: 21 },
            "Wednesday": { open: 9, close: 21 },
            "Thursday": { open: 9, close: 21 },
            "Friday": { open: 9, close: 13 },
            "Saturday": { open: null, close: null } // Closed all day
        },
        // `
        //     Sunday	    9 am - 9 pm
        //     Monday	    9 am - 9 pm
        //     Tuesday	    9 am - 9 pm
        //     Wednesday	9 am - 9 pm
        //     Thursday	9 am - 9 pm
        //     Friday	    9 am - 1 pm
        //     Saturday	Closed
        // `,
        
        websiteLink:`https://www.afeka.ac.il/`,
        phonenumbers:`03-768-8600`,
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
    globalCoordinates:{
        latitude:32.113912134046394,
        longitude:34.81804756153953
    },
    geoArea:[
        {
            latitude:32.11346715888711,
            longitude:34.818165001968
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
                direction:'NORTH',
                latitude:32.11346715888711,
                longitude:34.818165001968
            }

        },

    ]
   
}

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
            Direction.DOWN,
            Direction.UP
        ],
        mapCoordinates:{
            x:656,
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
            Direction.UP,
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
            Direction.RIGHT,
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
        POIId:null,
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
        POIId:null,
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
            y:250,
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
        id:"node_male_bathroom_f0_door",
        title:"node_male_bathroom_f0_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        isAvailable:true,
        POIId:null,
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
        id:"node_female_bathroom_f0_door",
        title:"node_female_bathroom_f0_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        isAvailable:true,
        POIId:null,
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
        id:"node_handicap_bathroom_f0_door",
        title:"node_handicap_bathroom_f0_door",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        isAvailable:true,
        POIId:null,
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
            y:307,
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
            floor:0
        }
    }, 

    {
        id:"node_edge_align_stairs_middle_floor_-1",
        title:"node_edge_align_stairs_middle_floor_-1",
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
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
            Direction.UP_LEFT,
            Direction.UP_RIGHT,
        ],
        mapCoordinates:{
            x:817,
            y:337,
            floor:0
        }
    },  


    {
        id:"node_classroom_201",
        title:"node_classroom_201",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
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
        POIId:null,
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
        POIId:null,
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
        POIId:null,
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


    {
        id:"node_edge_align_classrooms_intersect_left",
        title:"node_edge_align_classrooms_intersect_left",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
            Direction.UP_LEFT,
            Direction.UP_RIGHT,
        ],
        mapCoordinates:{
            x:342,
            y:337,
            floor:0
        }
    },  


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
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
            Direction.UP_LEFT,
            Direction.UP_RIGHT,
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
        POIId:null,
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
        POIId:null,
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
        POIId:null,
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
        id:"node_classroom_200",
        title:"node_classroom_200",
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
        ],
        mapCoordinates:{
            x:968,
            y:345,
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
            Direction.RIGHT,
            Direction.DOWN,
            Direction.UP,
        ],
        mapCoordinates:{
            x:968,
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
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:997,
            y:370,
            floor:0
        }
    },  



    {
        id:"node_information_desk",
        title:"node_information_desk",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.POI,
        POIId:null,
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
        id:"node_edge_align_left_down_classrooms_intersect",
        title:"node_edge_align_left_down_classrooms_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP_RIGHT,
            Direction.DOWN_LEFT,
            Direction.DOWN,
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:242,
            y:457,
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
        id:"node_classroom_206_left",
        title:"node_classroom_206_left",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
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
            x:244,
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
        ],
        mapCoordinates:{
            x:366,
            y:570,
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
        ],
        mapCoordinates:{
            x:244,
            y:713,
            floor:0
        }
    },  


    
    {
        id:"node_edge_align_lab_area_bathroom",
        title:"node_edge_align_lab_area_bathroom",
        pathType:WaypointPathType.INTERSECT,
        facilityType:WaypointFacilityType.POI,
        POIId:null,
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
        id:"node_edge_align_lab_area_bathroom",
        title:"node_edge_align_lab_area_bathroom",
        pathType:WaypointPathType.INTERSECT,
        facilityType:WaypointFacilityType.POI,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:370,
            y:724,
            floor:0
        }
    },  


        
    {
        id:"node_edge_align_lab_area_lab_corner",
        title:"node_edge_align_lab_area_lab_corner",
        pathType:WaypointPathType.CORNER,
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
        title:"node_edge_align_lab_area_lab_corner",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.POI,
        POIId:null,
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
            x:244,
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
            floor:-0.5
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
        id:"node_infront_stairs_right_room",
        title:"node_infront_stairs_right_room",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:1018,
            y:257,
            floor:-1
        }
    }, 


    {
        id:"node_infront_stairs_right_room",
        title:"node_infront_stairs_right_room",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:1018,
            y:257,
            floor:-1
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
            x:991,
            y:334,
            floor:-1
        }
    }, 



    {
        id:"node_outside_stairs_right_floor_-1",
        title:"node_outside_stairs_right_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.RIGHT,
            Direction.UP_RIGHT,
            Direction.DOWN_RIGHT,
            Direction.DOWN_LEFT,
        ],
        mapCoordinates:{
            x:1098,
            y:249,
            floor:-1
        }
    }, 


    {
        
        id:"node_edge_align_outside_innovation_and_entrepreneurship_center",
        title:"node_edge_align_outside_innovation_and_entrepreneurship_center",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP_LEFT,
            Direction.UP_RIGHT,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
        ],
        mapCoordinates:{
            x:1098,
            y:755,
            floor:-1
        }
    }, 


    

    {
        
        id:"node_innovation_and_entrepreneurship_center",
        title:"node_innovation_and_entrepreneurship_center",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:1098,
            y:777,
            floor:-1
        }
    }, 

    {
        
        id:"node_edge_align_yard_intersect_center",
        title:"node_edge_align_yard_intersect_center",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.RIGHT,
            Direction.UP_RIGHT,
            Direction.LEFT,
            Direction.UP_LEFT
        ],
        mapCoordinates:{
            x:460,
            y:777,
            floor:-1
        }
    }, 

    {
        
        id:"node_yard_smoking_area",
        title:"node_yard_smoking_area",
        pathType:WaypointPathType.INTERSECT,
        facilityType:WaypointFacilityType.POI,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.UP_RIGHT,
            Direction.UP_LEFT,

            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN_RIGHT,
            Direction.DOWN_LEFT,

        ],
        mapCoordinates:{
            x:460,
            y:944,
            floor:-1
        }
    }, 
    {
        
        id:"node_edge_align_bottom_corner",
        title:"node_edge_align_bottom_corner",
        pathType:WaypointPathType.INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.UP_RIGHT,
            Direction.UP_LEFT,

            Direction.LEFT,
            Direction.RIGHT,

        ],
        mapCoordinates:{
            x:460,
            y:1146,
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
            x:30,
            y:1146,
            floor:-1
        }
    }, 


    {
        
        id:"node_bottom_left_start_path",
        title:"node_bottom_left_start_path",
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
            x:30,
            y:519,
            floor:-1
        }
    },

    


    {
        
        id:"node_edge_align_stairs_left_yard_intersect",
        title:"node_edge_align_stairs_left_yard_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
            Direction.UP_LEFT,
            Direction.DOWN_RIGHT,
        ],
        mapCoordinates:{
            x:237,
            y:519,
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
            x:366,
            y:570,
            floor:-1
        }
    },

    {
        
        id:"node_elevator_floor_0",
        title:"node_elevator_floor_0",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.ELEVATOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:366,
            y:570,
            floor:0
        }
    },


    {
        
        id:"node_lab_entrance_yard_lab_right",
        title:"node_lab_entrance_yard_lab_right",
        pathType:WaypointPathType.ENTRANCE,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:354,
            y:637,
            floor:-1
        }
    },

    
    

    {
        
        id:"node_elevator_entrance_floor_-1",
        title:"node_elevator_entrance_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.ELEVATOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:353,
            y:571,
            floor:-1
        }
    },
    {
        
        id:"node_entrance_lab_floor_-1",
        title:"node_entrance_lab_floor_-1",
        pathType:WaypointPathType.ENTRANCE,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:237,
            y:558,
            floor:-1
        }
    },

    {
        
        id:"node_edge_align_lab_stairs_elevator_intersect",
        title:"node_edge_align_lab_stairs_elevator_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN_RIGHT,
        ],
        mapCoordinates:{
            x:237,
            y:574,
            floor:-1
        }
    },


    {
        
        id:"node_edge_align_lab_stairs_floor_-1",
        title:"node_edge_align_lab_stairs_floor_-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN_RIGHT,
        ],
        mapCoordinates:{
            x:211,
            y:574,
            floor:-1
        }
    },

    



    {
        
        id:"node_stairs_left_floor_-1",
        title:"node_stairs_left_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.STAIRS,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:129,
            y:480,
            floor:-1
        }
    },
    {
        
        id:"node_edge_align_stairs_left_yard_intersect",
        title:"node_edge_align_stairs_left_yard_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:129,
            y:519,
            floor:-1
        }
    },
    






    {
        
        id:"node_cafeteria_entrance",
        title:"node_cafeteria_entrance",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:352,
            y:725,
            floor:-1
        }
    }, 

    
    
    {
        
        id:"node_yard_main_entrance",
        title:"node_yard_main_entrance",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:622,
            y:481,
            floor:-1
        }
    }, 


    {
        
        id:"node_node_align_yard_main_entrance_outside_intersect",
        title:"node_node_align_yard_main_entrance_outside_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
        ],
        mapCoordinates:{
            x:622,
            y:519,
            floor:-1
        }
    }, 

    {
        
        id:"node_node_align_yard_entrance_stairs_right_intersect",
        title:"node_node_align_yard_entrance_stairs_right_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
            Direction.UP_RIGHT,
        ],
        mapCoordinates:{
            x:1098,
            y:519,
            floor:-1
        }
    }, 

    {
        
        id:"node_align_room_outside_stairs_right_intersect",
        title:"node_align_room_outside_stairs_right_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
        ],
        mapCoordinates:{
            x:1018,
            y:297,
            floor:-1
        }
    }, 
    {
        
        id:"node_align_stairs_left_stairs_right_intersect",
        title:"node_align_stairs_left_stairs_right_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
            Direction.UP_RIGHT,
            Direction.UP_LEFT,
        ],
        mapCoordinates:{
            x:1098,
            y:297,
            floor:-1
        }
    }, 


    {
        
        id:"node_align_stairs_left_stairs_right_intersect",
        title:"node_align_stairs_left_stairs_right_intersect",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.LEFT,
            Direction.RIGHT,
            Direction.DOWN,
            Direction.DOWN_LEFT,
            Direction.DOWN_RIGHT,
            Direction.UP_RIGHT,
            Direction.UP_LEFT,
        ],
        mapCoordinates:{
            x:1098,
            y:297,
            floor:-1
        }
    }, 
    {
        
        id:"node_entrance_left_floor_-1",
        title:"node_entrance_left_floor_-1",
        pathType:WaypointPathType.ENTRANCE,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.LEFT,
            Direction.RIGHT,
        ],
        mapCoordinates:{
            x:168,
            y:281,
            floor:-1
        }
    }, 

    {
        
        id:"node_edge_align_entrance_left_floor_-1",
        title:"node_edge_align_entrance_left_floor_-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:30,
            y:281,
            floor:-1
        }
    }, 
    


    /**INSIDE */


    {
        
        id:"node_edge_align_entrance_left_hall_room_112_floor_-1",
        title:"node_edge_align_entrance_left_hall_room_112_floor_-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.RIGHT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:210,
            y:291,
            floor:-1
        }
    },


    {
        
        id:"node_room_112_floor_-1",
        title:"node_room_112_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
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
        
        id:"node_edge_align_entrance_left_hall_help_floor_-1",
        title:"node_edge_align_entrance_left_hall_help_floor_-1",
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
            x:231,
            y:281,
            floor:-1
        }
    },
    {
        
        id:"node_help_room_floor_-1",
        title:"node_help_room_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.DOWN,
            Direction.UP,
        ],
        mapCoordinates:{
            x:231,
            y:281,
            floor:-1
        }
    },

    {
        
        id:"node_edge_align_entrance_left_hall_tech_help_floor_-1",
        title:"node_edge_align_entrance_left_hall_tech_help_floor_-1",
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
            x:327,
            y:281,
            floor:-1
        }
    },
    
    {
        
        id:"node_tech_help_floor_-1",
        title:"node_tech_help_floor_-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:327,
            y:338,
            floor:-1
        }
    },
    

    {
        
        id:"node_edge_align_lab_entrance_first_floor_-1",
        title:"node_edge_align_lab_entrance_first_floor_-1",
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
            x:413,
            y:271,
            floor:-1
        }
    },
    

    {
        
        id:"node_edge_align_lab_entrance_second_floor_-1",
        title:"node_edge_align_lab_entrance_second_floor_-1",
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
            x:434,
            y:271,
            floor:-1
        }
    },
    {
        
        id:"node_edge_align_labs_intersect_floor-1",
        title:"node_edge_align_labs_intersect_floor-1",
        pathType:WaypointPathType.EDGE_ALIGN_INTERSECT,
        facilityType:WaypointFacilityType.NONE,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP_RIGHT,
            Direction.UP_LEFT,
            Direction.LEFT,
        ],
        mapCoordinates:{
            x:422,
            y:281,
            floor:-1
        }
    },



    {
        
        id:"node_room_under_stairs_floor-1",
        title:"node_room_under_stairs_floor-1",
        pathType:WaypointPathType.ONE_WAY,
        facilityType:WaypointFacilityType.DOOR,
        POIId:null,
        isAvailable:true,
        availableHeadings:[
            Direction.UP,
            Direction.DOWN,
        ],
        mapCoordinates:{
            x:428,
            y:304,
            floor:-1
        }
    },



    


    
    

    


    


    

    
  




    
    
    
    




    

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
    }
]





const p = {
    id:"",
    mapArea:[
        {
            x:0,
            y:0,
            floor:0,
        }
    ],
    isAvailable:true,
    floor:0,
    isEmployeeOnly:false,
    details:{
        title:"",
        description:"",
        POIType:POIType.BUILDING_ENTRANCE,
        openingHours:null,
        closingHours:null,
        websiteLink:null,
        phonenumbers:null,
        POIOpeningDate:null,
        storageImageKey:null,
        imageUri:null
    }
  
}

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
                x:692,
                y:306,
                floor:0,
            },   
            {
                x:783,
                y:306,
                floor:0,
            },  
            {
                x:783,
                y:296,
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
                x:692,
                y:513,
                floor:0,
            },    
            {
                x:815,
                y:513,
                floor:0,
            },     
            {
                x:815,
                y:379,
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
                x:563,
                y:453,
                floor:0,
            },     
            {
                x:687,
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
                y:1092,
                floor:0,
            },
            {
                x:349,
                y:1092,
                floor:0,
            },    
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
                x:956,
                y:326,
                floor:0,
            },     
            {
                x:943,
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
                y:100,
                floor:0,
            },    
            {
                x:3,
                y:100,
                floor:0,
            },     
            {
                x:85,
                y:3,
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

    // FLOOR -1

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
        id:"poi_room_112",
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
        id:"poi_room_115",
        mapArea:[
            {
                x:563,
                y:161,
                floor:-1,
            },
            {
                x:563,
                y:287,
                floor:-1,
            },    
            {
                x:687,
                y:287,
                floor:-1,
            },     
            {
                x:687,
                y:161,
                floor:-1,
            },                                                                         
        ],
        isAvailable:true,
        floor:-1,
        isEmployeeOnly:false,
        details:{
            title:"Room 115",
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
                x:177,
                y:413,
                floor:-1,
            },     
            {
                x:247,
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


    {
        id:"poi_room_109",
        mapArea:[
            {
                x:177,
                y:455,
                floor:-1,
            },
            {
                x:249,
                y:455,
                floor:-1,
            },    
            {
                x:249,
                y:514,
                floor:-1,
            },     
            {
                x:177,
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
        id:"poi_room_112",
        mapArea:[
            {
                x:249,
                y:385,
                floor:-1,
            },
            {
                x:249,
                y:514,
                floor:-1,
            },    
            {
                x:331,
                y:514,
                floor:-1,
            },     
            {
                x:331,
                y:385,
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
                x:818,
                y:514,
                floor:-1,
            },    
            {
                x:945,
                y:514,
                floor:-1,
            },     
            {
                x:945,
                y:339,
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
                x:844,
                y:161,
                floor:-1,
            },
            {
                x:844,
                y:236,
                floor:-1,
            },    
            {
                x:945,
                y:236,
                floor:-1,
            },     
            {
                x:945,
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
                x:692,
                y:216,
                floor:-1,
            },    
            {
                x:791,
                y:216,
                floor:-1,
            },     
            {
                x:791,
                y:161,
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
                x:570,
                y:1020,
                floor:-1,
            },    
            {
                x:362,
                y:1193,
                floor:-1,
            },     
            {
                x:570,
                y:1193,
                floor:-1,
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
        id:"poi_cafeteria_floor_-1",
        mapArea:[
            {
                x:359,
                y:688,
                floor:-1,
            },
            {
                x:359,
                y:1107,
                floor:-1,
            },    
            {
                x:98,
                y:1107,
                floor:-1,
            },     
            {
                x:98,
                y:657,
                floor:-1,
            },        
            {
                x:224,
                y:657,
                floor:-1,
            },     
            {
                x:224,
                y:688,
                floor:-1,
            },                                                                 
        ],
        isAvailable:true,
        floor:0,
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
]

const afekaBuildingMapData = {
    buildingId:'324324324343',
    minFloor:-1,
    maxFloor:0,
    POIs:[
        {
            id:"12345586",
            floor:1,
            mapArea:[
                {
                    x:200,
                    y:200,
                    floor:1,
                },
            ],
            isEmployeeOnly:false,
            details:{
                title:"bathroom",
                icon:"toilet",
                description:null,
                POIType:POIType.BATHROOM,
                openingHours:null,
                websiteLink:null,
                phonenumbers:null,
                POIOpeningDate:null,
            }
        },        
        {
            id:"1234556",
            floor:0,
            mapArea:[
                {
                    x:200,
                    y:200,
                    floor:0,
                },
            ],
            isEmployeeOnly:false,
            details:{
                title:"bathroom",
                icon:"toilet",
                description:null,
                POIType:POIType.BATHROOM,
                openingHours:null,
                websiteLink:null,
                phonenumbers:null,
                POIOpeningDate:null,
            }
        },
        {
            id:"12345856",
            floor:0,
            mapArea:[
                {
                    x:50,
                    y:2,
                    floor:0,
                },              
            ],
            isEmployeeOnly:false,
            details:{
                title:"stairs",
                icon:"stairs-down",
                description:null,
                POIType:POIType.STAIRS,
                openingHours:null,
                websiteLink:null,
                phonenumbers:null,
                POIOpeningDate:null,
            }
        },
        {
            id:"123453856",
            floor:-1,
            mapArea:[
                {
                    x:300,
                    y:300,
                    floor:-1,
                },                
            ],
            isEmployeeOnly:false,
            details:{
                title:"stairs",
                icon:"stairs-up",
                description:null,
                POIType:POIType.STAIRS,
                openingHours:null,
                websiteLink:null,
                phonenumbers:null,
                POIOpeningDate:null,
            }
        },
        {
            id:"123400556",
            floor:0,
            mapArea:[
                {
                    x:321,
                    y:242,
                    floor:0,
                },
                {
                    x:200,
                    y:200,
                    floor:0,
                },
                {
                    x:0,
                    y:0,
                    floor:0,
                },
                {
                    x:100,
                    y:100,
                    floor:0,
                },                                                
            ],
            isEmployeeOnly:false,
            details:{
                title:"resturant",
                icon:"food",
                description:"resturant Koshers descrip",
                POIType:POIType.RESTAURANT,
                openingHours:{
                    "Sunday": { open: 9, close: 21 },
                    "Monday": { open: 9, close: 21 },
                    "Tuesday": { open: 9, close: 21 },
                    "Wednesday": { open: 9, close: 21 },
                    "Thursday": { open: 9, close: 21 },
                    "Friday": { open: 9, close: 13 },
                    "Saturday": { open: null, close: null }
                },
                websiteLink:null,
                phonenumbers:"0523012344",
                POIOpeningDate:null,
            }
        }                
    ],
    nodes:[
        {
            id:"node_1",
            floor:1,
            x:660,
            y:0,
            details:{
                title:"entrance",
            }

        }
    ]
}
export const getAllBuildingsData = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const buildings = await buildingsService.getAllBuildingsData();
        if (buildings && buildings.length > 0) {
            return res.status(200).json({ data: buildings });
        } else {
            return res.status(200).json({ data: [afekaBuildingData] });
        }        
    }catch(error){
        next(error);
    }
}
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// doesnt handle building status check. assumes the id comes from client
export const getBuildingMapData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.id;
        const svgFileMinus1 = await fs.readFile(path.join(__dirname, '..','..','seeding','images', 'afeka_-1_.svg').slice(3), 'utf-8');
        const svgFile0 = await fs.readFile(path.join(__dirname,'..', '..','seeding','images', 'afeka_0_.svg').slice(3), 'utf-8');
        
        
        // const buildingMapData = await buildingsService.getBuildingMapData(buildingId);
        const response = {
            floorsFiles:[
                {
                    file:svgFileMinus1,
                    floor:-1,
                    width: 1326,
                    height: 1197
                },
                {
                    file:svgFile0,
                    floor:0,
                    width: 1326,
                    height: 1207
                }
            ],
            data:afekaBuildingMapData
        }
        return res.status(200).json(response);
    }catch(error){
        console.error(error);
        next(error);
    }
    
    // try{
    //     const building = await BuildingMapData.findById(buildingId);
    //     if (!building) {
    //         const error = new NotFoundError("Building not found");
    //         return next(error);
    //         return res.status(404).json({ error: "Building not found" });
    //     }        
    // }catch(err){
    //     console.error("Error occurred while querying buildings maps:", err);
    //     return res.status(500).json({ error: "Internal server error" });
    // }       
    // try{
    //     const mapImage = 'map'; // TODO
    //     return res.status(200).json({building,mapImage});      
    // }catch(err){
    //     console.error("Error occurred getting map:", err);
    //     return res.status(500).json({ error: "Internal server error" });
    // }           

}


