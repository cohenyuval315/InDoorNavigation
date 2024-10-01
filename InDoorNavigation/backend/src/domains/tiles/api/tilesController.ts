import {Request,Response,NextFunction} from 'express'
import * as tilesServices from '../domain/tilesServices.js'
import path from 'path';

let __dirname = path.dirname(new URL(import.meta.url).pathname);

const relativePath = "../../../../dist/data";

export const getGlobalTile = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const { area } = req.params;
        const format = "pbf"
        const name = `${area}.${format}`;
        const dataDir = path.join(__dirname,relativePath);
        const tilePath = path.join(dataDir,name);
        if (tilePath){
            res.status(200).sendFile(tilePath, {
                headers: {
                    'Content-Type': 'application/x-protobuf'
                }
            });
        }else{
            res.sendStatus(500);
        }

    }catch(error){
        next(error);
    }
}

export const getTile = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const { floor, z, x, y } = req.params;
        const tilePath = await tilesServices.getTile(floor, z, x, y)
        if (tilePath){
            res.status(200).sendFile(tilePath, {
                headers: {
                    'Content-Type': 'application/x-protobuf'
                }
            });
        }else{
            res.sendStatus(500);
        }

    }catch(error){
        next(error);
    }
}

export const getBuildingTile = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const { floor, z, x, y } = req.params;
        const tilePath = await tilesServices.getBuildingTile(floor, z, x, y)
        if (tilePath){
            res.status(200).sendFile(tilePath, {
                headers: {
                    'Content-Type': 'application/x-protobuf'
                }
            });
        }else{
            res.sendStatus(500);
        }

    }catch(error){
        next(error);
    }
}


