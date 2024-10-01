import {Request,Response,NextFunction} from 'express'

export const ping = async (req:Request,res:Response,next:NextFunction) => {
    try {
        res.sendStatus(200)
    }catch(error){
        next(error);
    }
}
