import {Request,Response,NextFunction} from 'express'
import User from "../models/UserData";
import * as buildingsService from '../services/buildings-service';
import * as usersService from '../services/users-service';
import * as storageService from '../services/storage-service';


export const createBuildingData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const body = req.body;
        const {buildingId,newBuildingData,override} = body;

        return await buildingsService.createBuildingData(buildingId,newBuildingData,override)
    }catch(error){
        next(error);
    }
    
}

export const updateBuildingData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.id;
        const body = req.body;
        const {updatedBuildingData} = body;        
        return await buildingsService.updateBuildingData(buildingId,updatedBuildingData);
    }catch(error){
        next(error);
    }    
    
}

export const deleteBuildingData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.id;
        return await buildingsService.deleteBuildingData(buildingId)
    }catch(error){
        next(error);
    }
    
}

export const deleteAllBuildingsData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        return await buildingsService.deleteAllBuildingsData()
    }catch(error){
        next(error);
    }    
}


export const createBuildingMapData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const body = req.body;
        const {buildingId,newBuildingMapData,override} = body;
        return await buildingsService.createBuildingMapData(buildingId,newBuildingMapData,override);
    }catch(error){
        next(error);
    }       
    
}

export const updateBuildingMapData = async (req:Request,res:Response,next:NextFunction) => {
    
    try{
        const buildingId = req.params.id;
        const body = req.body;
        const {updatedBuildingMapData} = body;             
        return await buildingsService.updateBuildingMapData(buildingId,updatedBuildingMapData);
    }catch(error){
        next(error);
    }       
    
}

export const deleteBuildingMapData = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.id;
        return await buildingsService.deleteBuildingMapData(buildingId);
    }catch(error){
        next(error);
    }       
}

export const deleteAllBuildingsMapsData = async (req:Request,res:Response,next:NextFunction) => {
    // const buildingId = req.params.id;
    try{
        return await buildingsService.deleteAllBuildingsMapsData()
    }catch(error){
        next(error);
    }
    
}

export const deleteAllUsers = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const operation = await usersService.deleteAllUsers();
        return res.sendStatus(200);
    }catch(error){
        next(error);
    }
    
}


export const uploadMapFile = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const buildingId = req.params.id;
        const {mapFile} = req.body;
        const updatedBuildingMapData = await buildingsService.getBuildingMapData(buildingId);
        if ('imageKey' in updatedBuildingMapData){
            updatedBuildingMapData['imageKey'] = 'newKey';
        }
        buildingsService.updateBuildingMapData(buildingId,updatedBuildingMapData)
        await storageService.uploadMapFile(mapFile);
    }catch(error){
        next(error);
    }
}

















// /** Building Data */

// export function putBuildingData(req, res, next) {
//     //admin , building admin 
// }

// export function postBuildingData(req, res, next) {

// }

// function postBuildingStatus(req, res, next){

// }

// export function putBuildingStatus(req, res, next){

// }

// export function postBuildingPOI(req, res, next){

// }

// export function putBuildingPOI(req, res, next){

// }

// export function getDeviceSystemSettings(req, res, next){

// }

// export function getAppData(req, res, next){

// }

// export function getBuildingsData(req, res, next){

// }



// export function getBuildingMapData(req, res, next){

// }

// export function getRoute(req, res, next){

// }

// export function postLogin(req, res, next){
    
// }

// export function postSignUp(req, res, next){
    
// }

// export function postRegisterBuildingManager(req, res, next){
    
// }
// export function deleteRegisterBuildingManager(req, res, next){
    

// }


// export function postRegisterBuildingAdmin(req, res, next){
    
// }


// export function deleteRegisterBuildingAdmin(req, res, next){
    
// }

// export function putUpdateUserProfile(req, res, next){
    
// }

// export function postRoute(req, res, next){
    
// }







// /** Building Map */

// export function postBuildingMapViewBlueprint(req, res, next) {
//     //  /MapViewBlueprint
//     // upload image
//     // admin
// }
// export function deleteBuildingMapViewBlueprint(req, res, next) {

// }



// export function postBuildingGraphMap(req, res, next) {
//     //  /MapNavigationBlueprint
//     // upload graph map of building 
//     // admin
// }
// export function deleteBuildingGraphMap(req, res, next) {

// }





// /** Building Delegates */


// /** Navigation */


// /** Users */
