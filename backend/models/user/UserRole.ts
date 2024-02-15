import { Schema } from 'mongoose';
import { RoleType } from '../../constants/constants';

const userRoleSchema = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId, 
        require:true
    },   
    roleType: {
        type: String, 
        enum: Object.values(RoleType),
        require:true
    },
}, { 
    timestamps: true,
    autoCreate: false,
});
export default userRoleSchema;