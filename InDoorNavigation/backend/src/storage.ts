import logger from './lib/logger/index.js';
import { createBucket, getBucket,getBuckets,isBucketExist } from './storages/aws-s3.js';

export async function setupStorage(rootBucket:string){    
    // const result = await createBucket(rootBucket);
    // // const buckets = await getBuckets()
    // // logger.info("buckets:",buckets, typeof buckets);
    
    // logger.info(result);
    
    
    // const isExists = await isBucketExist(rootBucket);
    // logger.info(`intializing s3 bucket "${rootBucket}"`)

    // if(!isExists){
    //     logger.info(`creating s3 bucket "${rootBucket}"...`)
    //     // const response = await createBucket(rootBucket);
    //     // logger.info(`s3 bucket response: ${response}`);
    //     // const isSuccess = await isBucketExist(rootBucket);
    //     // if(!isSuccess){
    //     //     logger.info(`failed to create s3 bucket "${rootBucket}"...`)
    //     // }
    // }else{
    // //     logger.info(`s3 bucket "${rootBucket}" already exists`);
    // // }
    // const bucket = getBucket(rootBucket)
}