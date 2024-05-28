import * as AWS from 'aws-sdk';

const AWS_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3:{
        logger: {
            log: (message: string) => {
                console.log(`S3 Logger: ${message}`);
            }
        }
    }
}
export function initAWSConfigurations(){
    AWS.config.update(AWS_CONFIG);
}

