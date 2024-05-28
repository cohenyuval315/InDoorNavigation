import { Schema } from 'mongoose';

const addressSchema = new Schema({
    country:{
        type:String,
        require:true
    },    
    state:{
        type:String,
        require:true
    }, 
    city:{
        type:String,
        require:true
    }, 
    street:{
        type:String,
        require:true
    },  
    postalCode:{
        type:String,
        require:false
    },     
}, { 
    // _id:false,
    timestamps: true,
    autoCreate: false,
});

export default addressSchema;