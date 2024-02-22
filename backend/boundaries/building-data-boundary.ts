import { BuildingStatus, BuildingType,Direction,CardinalDirection } from '../constants/constants';

class BuildingDataBoundary {
    id?:string;
    status?:BuildingStatus | string;
    details:{
        title:string,
        description?:string,
        buildingType?:BuildingType | string,
        address?:string,
        owner?:string,
        openingHours?:string,
        closingHours?:string,
        websiteLink?:string,
        phonenumbers?:string,
        buildingOpeningDate?:Date | string,
        storageImageKey?:string,
        imageUri?:string,
    };
    geoArea:{
        laptitude:number,
        longitude:number
    }[];
    entrances:{
        title:string,
        description:string,
        isMain:boolean,
        isEmployeeOnly:boolean,
        isAvailable:boolean,
        geoTransitionArea:{
            laptitude:number,
            longitude:number
        }[],
        doorGeoCoordinate:{
            heading:{
                direction:Direction | string,
                cardinalDirection:CardinalDirection | string
            },
            laptitude:number,
            longitude:number
        },
    }[];

}

export default BuildingDataBoundary;