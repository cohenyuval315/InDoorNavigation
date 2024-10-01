import { RoleType } from '../../../../../common/enums/RoleType.js';
import { Schema } from 'mongoose';

const roleSchema = new Schema({  
    roleType: {
        type: String, 
        enum: Object.values(RoleType),
        require:true
    },
    subRoles: {
        type: [Schema.Types.ObjectId], 
    },    
}, { 
    timestamps: true,
    autoCreate: false,
});

export default roleSchema;