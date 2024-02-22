import multer from "multer";
import {Request} from 'express';

const storage = multer.memoryStorage();

export const upload = multer({ 
    storage: storage,
    limits:{
        fieldNameSize:100,
        fieldSize:1048576
    } 
});


export function getFileFromMemory(req:Request){
    if (req.file && req.file.buffer) {
        return req.file.buffer;
    }
    return null;
}
