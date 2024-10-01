// import * as AWS from 'aws-sdk';
// import { AWS_CONFIG } from "../config/aws-config";
import logger from "../lib/logger/index.js";
import { AWS_CONFIG } from "../config/aws-config.js";
import {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand,
    ListBucketsCommand,
  } from "@aws-sdk/client-s3";



// const s3Client = null // new S3Client(AWS_CONFIG);
const s3 = new S3Client(AWS_CONFIG);

const S3Command = async (command:any) => {
    try {
        const data = await s3.send(command);
        return data;
    } catch (error) {
        logger.error(error)
    } finally {
        
    }
}

export const getBuckets = async () => {
    const params = {};
    const command = new ListBucketsCommand(params);
    const res = await S3Command(command)
    return res;
}

export const createBucket = async (bucketName:string) => {
    const params = {
        Bucket: bucketName,
    };
    const command = new CreateBucketCommand(params);
    const res = await S3Command(command)
    return res;
}

export const putObjectS3 = async (bucketName:string, key:string , body:any) => {
    // await s3Client.send(
    //     new PutObjectCommand({
    //       Bucket: bucketName,
    //       Key: key,
    //       Body: body,
    //     })
    // );
}

export const readObjectS3 = async (bucketName:string,key:string) => {
    // const { Body } = await s3Client.send(
    //     new GetObjectCommand({
    //       Bucket: bucketName,
    //       Key: key,
    //     })
    // );
    // const bodyAsString = await Body.transformToString();
    // return [Body,bodyAsString];
}


const cleanBucket = async (bucketName?:string) => {
    // const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    // const params = {
    //     Bucket: useBucketName
    // };
    // try {
    //     const data = await s3.listObjects(params).promise();
    //     if (!data.Contents){
    //         throw new Error('fail to acquire s3 data Content');
    //     }
    //     const objects = data.Contents.map(obj => ({ 
    //         Key: obj.Key || ''
    //     })).filter(obj => obj.Key !== '');

    //     const deleteParams = {
    //         Bucket: useBucketName,
    //         Delete: { 
    //             Objects: objects 
    //         }
    //     };
    //     const deleteData = await s3.deleteObjects(deleteParams).promise();
    //     return deleteData;
    // } catch (err) {
    //     throw err;
    // }
}
const deleteBucket = async (bucketName?:string) => {
    // const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    // const params = {
    //     Bucket: useBucketName
    // };    
    // try {
    //     const data = await s3.deleteBucket(params).promise();
    //     return data;
    // } catch (err) {
    //     throw err;
    // }


}


export const deleteObjectsFromBucketS3 = async (bucketName:string) => {
    // const paginator = paginateListObjectsV2(
    //     { client: s3Client },
    //     { Bucket: bucketName }
    //   );
    //   for await (const page of paginator) {
    //     const objects = page.Contents;
    //     if (objects) {
    //       // For every object in each page, delete it.
    //       for (const object of objects) {
    //         await s3Client.send(
    //           new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
    //         );
    //       }
    //     }
    //   }
      // Once all the objects are gone, the bucket can be deleted.
}

export const deleteBucketS3 = async (bucketName:string) => {
    // await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
}

const deleteAllBuckets = async () => {
    // try {
    //     const data = await s3.listBuckets().promise();
    //     if (!data.Buckets){
    //         console.error();
    //         return 
    //     }
    //     const promises = data.Buckets.map(bucket => deleteBucket(bucket.Name));
    //     await Promise.all(promises);
    //     return "All buckets deleted successfully";
    // } catch (err) {
    //     throw err;
    // }
};
const cleanAllBuckets = async () => {
    // try {
    //     const data = await s3.listBuckets().promise();
    //     if (!data.Buckets){
    //         console.error();
    //         return 
    //     }        
    //     const promises = data.Buckets.map(bucket => cleanBucket(bucket.Name));
    //     await Promise.all(promises);
    //     return "All buckets cleaned successfully";
    // } catch (err) {
    //     throw err;
    // }
};

// export const getBuckets = async () => {
//     // try {
//     //     const data = await s3.listBuckets().promise();
//     //     return data.Buckets;
//     // } catch (err) {
//     //     throw err;
//     // }
// };

export const getBucket = async (bucketName?:string) => {
    // const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    // const params = {
    //     Bucket: useBucketName
    // }; 

    // try {
    //     const data = await s3.headBucket(params).promise();
    //     return data;
    // } catch (err) {
    //     throw err;
    // // }
    // const buckets = await getBuckets()
    // if (!buckets){
    //     return false;
    // }else{
    //     // buckets.includes()
    // }

    // const params = {
    //     Bucket: bucketName
    // };
    // const command = 
    // S3Command(command)
};

export const isBucketExist = async (bucketName?:string) => {
    // const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    // const params = {
    //     Bucket: useBucketName
    // };     
    // try {
    //     await s3.headBucket(params).promise();
    //     return true; // Bucket exists
    // } catch (error:any) {
    //     if (error.statusCode === 404) {
    //         return false; // Bucket does not exist
    //     }
    //     throw error; // Other errors
    // }
    return false;
};

const getObjectsFromBucket = () => {
    
}



