import {Request,Response,NextFunction} from 'express'
import * as usersService from '../domain/userService.js';

export const getUserSystemConfiguration = async (req:Request,res:Response,next:NextFunction) => {
  return await usersService.getUserSystemConfiguration()
}

export const updateUserProfile = async (req:Request,res:Response,next:NextFunction) => {
  // const buildingId = req.params.id;
  // const { 
  //   srcWaypoint,
  //   checkpointsWaypoints, 
  //   destWaypoint, 
  //   isInOrder } = req.body; 
  try{
    const userAccount =  await usersService.updateUserProfile();
    return res.status(200).json({data:userAccount});
  }catch(error){
    next(error);
  }
}
export const getUserAccount = async (req:Request,res:Response,next:NextFunction) => {
  try{
    const userAccount = await usersService.getUserAccount();
    return res.status(200).json({data:userAccount});
  }catch(error){
    next(error);
  }
  
  
}


export const deleteAllUsers  = async (req:Request,res:Response,next:NextFunction) => {
    try {   
        const response = await usersService.deleteAllUsers();
        res.sendStatus(200);
    }catch(error){
        next(error)
    }
}




