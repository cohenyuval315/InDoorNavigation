import { ValidationError } from "express-validator";

export function formatValidationErrors(errorList:ValidationError[]){
    return [...new Set(errorList.map((error)=>{
        if (error.type === 'field') {
            let msg = error.msg;
            let value = error.value;
            if (value === undefined){
                msg = "is missing";
            }
            return `${error.type} ${error.path} ${msg}`;
        }else{
            return `${error.type} ${error.msg}`;
        }
       
    }))].join(', ')
}
