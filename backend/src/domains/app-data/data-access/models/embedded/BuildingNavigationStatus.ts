import { BuildingStatus } from '@/common/enums/BuildingStatus';
import { Schema } from 'mongoose';

const buildingNavigationStatusSchema = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },
    buildingStatus: {
        type: String, 
        enum: Object.values(BuildingStatus),
        require:true,
        default:BuildingStatus.DEVELOPMENT
    }
}, { 
    timestamps: true,
    autoCreate: false,
});

export default buildingNavigationStatusSchema;