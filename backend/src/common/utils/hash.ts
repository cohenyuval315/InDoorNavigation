import crypto from 'crypto';
import { ObjectId } from 'mongodb';


export function convertStringToObjectId(stringIdentifier:string){
    const hashedObjectId = crypto.createHash('md5').update(stringIdentifier).digest('hex');
    console.log("hashObJ",hashedObjectId);
    const objectId = new ObjectId(hashedObjectId);
    return objectId;
}