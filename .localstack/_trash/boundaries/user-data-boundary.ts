import { BuildingStatus, BuildingType } from '../constants/constants';
class UserDataBoundary {
    id?:string;
    email?:string
    password?:string;
    passwordResetToken?:string;
    passwordResetExpires?:boolean;
    emailVerificationToken?:string;
    emailVerified?:boolean;
    google?:{
        
    };
    tokens?:{
        title:string,
        token:string
    }[];
    recentDestinations?:{

    }[];
    settings?:{

    }
}

export default UserDataBoundary;
