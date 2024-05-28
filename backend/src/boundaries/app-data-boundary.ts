// import {  } from '../constants/constants';
class AppDataBoundary {
    id?:string;
    appDataVersion?:string;
    systemVersion?:string;
    settings?: {
        title:string,
        defaultValue: string,
        description:string
    }[];
}

export default AppDataBoundary;