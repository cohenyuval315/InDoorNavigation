import {Request,Response,NextFunction} from 'express'
import { BuildingStatus } from "../constants/constants";
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


const afekaBuildingMapData = {
    buildingId:'324324324343',
    waypoints:[
        {
            title:'waypoint1',
            x:1,
            y:2,
            floor:0,
        },
        {
            title:'waypoint2',
            x:5,
            y:6,
            floor:1,
        }
    ]
}
export const getAllBuildingsData = async (req:Request,res:Response,next:NextFunction) => {
    console.log('someone ask this');
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
        const svgFile0 = await fs.readFile(path.join(__dirname,'..', '..','seeding','images', 'afeka_map_floor_0.svg').slice(3), 'utf-8');
        const svgFile1 = await fs.readFile(path.join(__dirname, '..','..','seeding','images', 'afeka_map_floor_1.svg').slice(3), 'utf-8');
        
        // const buildingMapData = await buildingsService.getBuildingMapData(buildingId);
        const response = {
            floorsFiles:[
                svgFile0,
                svgFile1
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


