import { configDotenv } from 'dotenv';

const DOTENV_CONFIG = {
    path:'./.env',
    encoding: 'utf-8', 
    debug: true, 
    override: false
}

export function initConfig(){
    try{
        const response = configDotenv(DOTENV_CONFIG); 
        return response;
    }catch(error){
        console.error('failed to set dotenv');
        throw error;
    }
}
   