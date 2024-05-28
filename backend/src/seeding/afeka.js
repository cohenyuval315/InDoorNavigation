import { BuildingStatus, BuildingType, CardinalDirection, Direction } from "../constants/constants"


const afekaBuildingData = {
    status:BuildingStatus.PRODUCTION,
    details:{
        title:'afeka',
        description:'afeka college',
        buildingType:BuildingType.COLLEGE,
        address:'Mivtsa Kadesh St 38, Tel Aviv-Yafo, 6998812',
        openingHours:`
            Sunday	    9 am - 9 pm
            Monday	    9 am - 9 pm
            Tuesday	    9 am - 9 pm
            Wednesday	9 am - 9 pm
            Thursday	9 am - 9 pm
            Friday	    9 am - 1 pm
            Saturday	Closed
        `,
        websiteLink:`https://www.afeka.ac.il/`,
        phonenumbers:`03-768-8600`,
        buildingOpeningDate: new Date('1996-01-01')
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
                direction:CardinalDirection.NORTH,
                latitude:32.11346715888711,
                longitude:34.818165001968
            }

        },

    ]
   
}

const afeka_logo_image_path = './images/afeka_logo.png';
const afeka_main_entrance_image_path = './images/afeka_main_entrance.png';

export function initAfekaData(){
    
}