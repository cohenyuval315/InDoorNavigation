import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

if(!process.env.AWS_ASSETS_BUCKET_NAME){
    throw new Error('bucket name is not set in env file.')
}

const BUCKET_NAME = process.env.AWS_ASSETS_BUCKET_NAME;

const createBucket = async (bucketName?:string) => {
    const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    const params = {
        Bucket: useBucketName
    };     
    try {
        const data = await s3.createBucket(params).promise();
        return data;
    } catch (err) {
        throw err;
    }
}
const cleanBucket = async (bucketName?:string) => {
    const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    const params = {
        Bucket: useBucketName
    };
    try {
        const data = await s3.listObjects(params).promise();
        if (!data.Contents){
            throw new Error('fail to acquire s3 data Content');
        }
        const objects = data.Contents.map(obj => ({ 
            Key: obj.Key || ''
        })).filter(obj => obj.Key !== '');

        const deleteParams = {
            Bucket: useBucketName,
            Delete: { 
                Objects: objects 
            }
        };
        const deleteData = await s3.deleteObjects(deleteParams).promise();
        return deleteData;
    } catch (err) {
        throw err;
    }
}
const deleteBucket = async (bucketName?:string) => {
    const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    const params = {
        Bucket: useBucketName
    };    
    try {
        const data = await s3.deleteBucket(params).promise();
        return data;
    } catch (err) {
        throw err;
    }
}
const deleteAllBuckets = async () => {
    try {
        const data = await s3.listBuckets().promise();
        if (!data.Buckets){
            console.error();
            return 
        }
        const promises = data.Buckets.map(bucket => deleteBucket(bucket.Name));
        await Promise.all(promises);
        return "All buckets deleted successfully";
    } catch (err) {
        throw err;
    }
};
const cleanAllBuckets = async () => {
    try {
        const data = await s3.listBuckets().promise();
        if (!data.Buckets){
            console.error();
            return 
        }        
        const promises = data.Buckets.map(bucket => cleanBucket(bucket.Name));
        await Promise.all(promises);
        return "All buckets cleaned successfully";
    } catch (err) {
        throw err;
    }
};

const getBuckets = async () => {
    try {
        const data = await s3.listBuckets().promise();
        return data.Buckets;
    } catch (err) {
        throw err;
    }
};

const getBucket = async (bucketName?:string) => {
    const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    const params = {
        Bucket: useBucketName
    }; 

    try {
        const data = await s3.headBucket(params).promise();
        return data;
    } catch (err) {
        throw err;
    }
};

const doesBucketExist = async (bucketName?:string) => {
    const useBucketName = bucketName ? bucketName : BUCKET_NAME;
    const params = {
        Bucket: useBucketName
    };     
    try {
        await s3.headBucket(params).promise();
        return true; // Bucket exists
    } catch (error:any) {
        if (error.statusCode === 404) {
            return false; // Bucket does not exist
        }
        throw error; // Other errors
    }
};

const getObjectsFromBucket = () => {
    
}



