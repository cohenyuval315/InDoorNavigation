import { Schema, model } from 'mongoose';
import settingSchema from './embedded/Setting.js';


const appDataSchema = new Schema({
    appDataVersion: { type: String, unique: true },
    systemVersion: { type: String, unique: true },
    settings:{
      type:[settingSchema],
      require:true,
      validate: {
        validator: function(v:any) {
            return v.length >= 1;
        },
        message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
    }    

    }

}, { 
  timestamps: true,
  autoCreate: true,
});

const AppData = model('AppData', appDataSchema);


export default AppData;
