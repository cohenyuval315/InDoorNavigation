import { Schema } from 'mongoose';

const geoCoordinateSchema = new Schema({
    laptitude: {
        type: Number,
        require:true
    },   
    longitude: {
        type: Number, 
        require:true
    },
}, { 
    _id:false,
    timestamps: true,
    autoCreate: false,
});
export default geoCoordinateSchema;