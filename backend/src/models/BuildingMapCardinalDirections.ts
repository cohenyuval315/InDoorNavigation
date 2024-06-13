import { Schema } from 'mongoose';
import { CardinalDirection, Direction } from '../constants/constants';

const buildingMapCardinalDirectionsSchema = new Schema({
    [Direction.DOWN]: {
        type: String,
        enum: Object.values(CardinalDirection),
        require:true,
    },
    [Direction.UP]: {
        type: String,
        enum: Object.values(CardinalDirection),
        require:true,
    },
    [Direction.LEFT]: {
        type: String,
        enum: Object.values(CardinalDirection),
        require:true,
    },
    [Direction.RIGHT]: {
        type: String,
        enum: Object.values(CardinalDirection),
        require:true,
    },
    [Direction.UP_LEFT]: {
        type: String,
        enum: Object.values(CardinalDirection),
        require:true,
    },
    [Direction.UP_RIGHT]: {
        type: String,
        enum: Object.values(CardinalDirection),
        require:true,
    },
    [Direction.DOWN_LEFT]: {
        type: String,
        enum: Object.values(CardinalDirection),
        require:true,
    },
    [Direction.DOWN_RIGHT]: {
        type: String,
        enum: Object.values(CardinalDirection),
        require:true,
    }
}, { 
    _id: false,
    timestamps: false,
    autoCreate: true,
});
export default buildingMapCardinalDirectionsSchema;

