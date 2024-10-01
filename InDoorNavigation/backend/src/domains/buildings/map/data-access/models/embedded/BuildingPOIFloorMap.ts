import { Schema } from 'mongoose';


const buildingPOIFloorMapSchema = new Schema({
    floor:{
        type: Schema.Types.Number, 
        require:true
    },
    map: {
        type: Schema.Types.String, 
        require:true
    }


}, { 
    _id:false,
    timestamps: true,
    autoCreate: true,
});


export default buildingPOIFloorMapSchema;

