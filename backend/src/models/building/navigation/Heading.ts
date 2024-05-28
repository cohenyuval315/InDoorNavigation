import { Schema } from 'mongoose';
import { CardinalDirection, Direction } from '../../../constants/constants';

const headingSchema = new Schema({
   direction:{
    type:String,
    enum:Object.values(Direction),
    require:true
   },
   cardinalDirection:{
    type:String,
    enum:Object.values(CardinalDirection),
    require:true,
   },
}, { 
    _id:false,
    timestamps: true,
    autoCreate: false,
});

export default headingSchema;