import multer, { StorageEngine } from "multer";
import {Request} from 'express';

// unused , wil be used when allowing api managment

class MemoryFileHandler  { 
    private storage: StorageEngine;
    constructor () {
        this.storage = multer.memoryStorage();

    }
    uploadFile(){
        const upload = multer({ 
            storage: this.storage,
            limits:{
                fieldNameSize:100,
                fieldSize:1048576
            } 
        });
    }
    getFileFromMemory(req:Request){
        if (req.file && req.file.buffer) {
            return req.file.buffer;
        }
        return null;
    }
    
}

export default MemoryFileHandler;