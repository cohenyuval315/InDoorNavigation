import {Request,Response,NextFunction} from 'express'
import * as appDataServices from '../domain/appDataServices.js'


export const getAppData = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const data = await appDataServices.getAppData()
        if (data){
            res.status(200).json({data:data});
        }else{
            res.sendStatus(500);
        }

    }catch(error){
        next(error);
    }
}
