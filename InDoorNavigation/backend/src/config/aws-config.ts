export const AWS_CONFIG = {
    endpoint: process.env.AWS_ENDPOINT_URL,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3ForcePathStyle: true,
    s3:{
        logger: {
            log: (message: string) => {
                console.log(`S3 Logger: ${message}`);
            }
        }
    }
}

