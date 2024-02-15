
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { createTransport } from 'nodemailer';
import { authenticate } from 'passport';
import { startCase, toLower } from 'lodash';
import { isEmail, isEmpty, normalizeEmail, isLength, escape, isHexadecimal } from 'validator';
import { isValid } from 'mailchecker';
import User, { findOne, findById, deleteOne } from '../models/User';

/** Building Data */

export function putBuildingData(req, res, next) {
    //admin , building admin 
}

export function postBuildingData(req, res, next) {

}

function postBuildingStatus(req, res, next){

}

export function putBuildingStatus(req, res, next){

}

export function postBuildingPOI(req, res, next){

}

export function putBuildingPOI(req, res, next){

}

export function getDeviceSystemSettings(req, res, next){

}

export function getAppData(req, res, next){

}

export function getBuildingsData(req, res, next){

}



export function getBuildingMapData(req, res, next){

}

export function getRoute(req, res, next){

}

export function postLogin(req, res, next){
    
}

export function postSignUp(req, res, next){
    
}

export function postRegisterBuildingManager(req, res, next){
    
}
export function deleteRegisterBuildingManager(req, res, next){
    

}


export function postRegisterBuildingAdmin(req, res, next){
    
}


export function deleteRegisterBuildingAdmin(req, res, next){
    
}

export function putUpdateUserProfile(req, res, next){
    
}

export function postRoute(req, res, next){
    
}







/** Building Map */

export function postBuildingMapViewBlueprint(req, res, next) {
    //  /MapViewBlueprint
    // upload image
    // admin
}
export function deleteBuildingMapViewBlueprint(req, res, next) {

}



export function postBuildingGraphMap(req, res, next) {
    //  /MapNavigationBlueprint
    // upload graph map of building 
    // admin
}
export function deleteBuildingGraphMap(req, res, next) {

}





/** Building Delegates */


/** Navigation */


/** Users */
