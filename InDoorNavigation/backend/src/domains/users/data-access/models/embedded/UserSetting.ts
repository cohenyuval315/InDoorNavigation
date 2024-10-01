import { Schema } from 'mongoose';

const userSettingSchema = new Schema({
    settingId: {
        type:Schema.Types.ObjectId,
        require:true,
    },
    settingValue: {
        type:String,
        require:true,
    }
}, { 
    timestamps: true,
    autoCreate: false,
});
export default userSettingSchema;