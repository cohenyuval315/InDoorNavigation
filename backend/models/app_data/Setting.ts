import { Schema } from 'mongoose';

const settingSchema = new Schema({
    title: {
        type: String, 
        require:true
    },
    description: {
        type: String, 
        require:true
    },
    defaultValue: {
        type: String, 
        require:true
    },    
}, { 
    timestamps: true,
    autoCreate: false,
});

export default settingSchema;