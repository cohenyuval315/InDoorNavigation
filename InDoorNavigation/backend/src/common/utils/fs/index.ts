import fs from "fs-extra";
import path from 'path';

export async function removeFolder(folderPath:string){
    try{
        const result = await fs.remove(folderPath);
        return result;
    }catch(error){

    }
}

export async function createFolder(folderPath:string){
    try{
        const result = await fs.ensureDir(folderPath);
        return result;
    }catch(error){

    }
}

export function getDirname(metaUrl:any){
    const dirname = normalizePath(path.dirname(new URL(metaUrl).pathname));
    return dirname
}

export function normalizePath(path:string){
    const isWindows = process.platform === 'win32';
    const normalPath = (isWindows && path.startsWith('/')) ? path.slice(1) : path;
    return normalPath;
}



export function createPath(segments:string[]){
    const p = path.join(...segments);
    return p;
}



