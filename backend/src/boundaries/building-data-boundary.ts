import { BuildingStatus, BuildingType,Direction,CardinalDirection } from '../constants/constants';

class BuildingDataBoundary {
    id?:string;
    status?:BuildingStatus | string;
    details?:{
        title: string;
        description?: string;
        buildingType?: BuildingType | string;
        address?: string;
        owner?: string;
        openingHours?: string;
        closingHours?: string;
        websiteLink?: string;
        phonenumbers?: string;
        buildingOpeningDate?: Date | string;
        storageImageKey?: string;
        imageUri?: string;
    };
    geoArea?: {
        laptitude: number;
        longitude: number;
    };
    entrances?:{
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
    constructor(building:any) {
        this.id = building.id;
        this.details = {
            title:building.details.title,
            description:building.details.description,
            buildingType:building.details.buildingType,
            address:building.details.address,
            owner:building.details.owner,
            openingHours:building.details.openingHours,
            closingHours:building.details.closingHours,
            websiteLink:building.details.websiteLink,
            phonenumbers:building.details.phonenumbers,
            buildingOpeningDate:building.details.buildingOpeningDate,
            storageImageKey:building.details.storageImageKey,
            imageUri:building.details.imageUri,
        };
        this.geoArea = building.geoArea;
        this.entrances = building.entrances
    }

    toJSON(){

    }



}

export default BuildingDataBoundary;