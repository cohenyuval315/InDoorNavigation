import { Schema } from 'mongoose';

const smartphoneDeviceSchema = new Schema({
    title: {
        type: String, 
        require:true
    },
    accelerometerFrequency: {
        type: Number, 
        require:true
    },
    magentomerFrequency: {
        type: Number, 
        require:true
    },
    gyroscopeFrequency:{
        type: Number, 
        require:true
    },
    WIFISamplingRate:{
        type: Number, 
        require:true
    },
}, { 
    timestamps: true,
    autoCreate: false,
});

export default smartphoneDeviceSchema;