import { Schema } from 'mongoose';

const userDestinationSchema = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },
    waypointId: {
        type: Schema.Types.ObjectId, 
        require:true
    }
}, { 
    timestamps: true,
    autoCreate: false,
});

export default userDestinationSchema;