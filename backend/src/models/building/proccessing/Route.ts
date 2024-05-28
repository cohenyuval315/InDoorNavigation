import { Schema } from 'mongoose';
import { DeviceMovementStateType, MovementType } from '../../../constants/constants';
import checkpointSchema from './Checkpoint';
import headingSchema from '../navigation/Heading';
import orientationSchema from '../navigation/Orientation';

const routeSchema = new Schema({
    sourceWaypoint:{
        type: Schema.Types.ObjectId, 
        require:true 
    },
    targetWaypoint:{
        type: Schema.Types.ObjectId, 
        require:true
    },  
    deviceInitialOrientation:{
        type:orientationSchema,
        require:true,
    },
    deviceMovementStateType:{
        type:String,
        enum:Object.values(DeviceMovementStateType),
        require:true
    },
    startTimestamp:{
        type:Date,
        require:false
    },
    endTimestamp:{
        type:Date,
        require:false
    },
    checkpoints:{
        type:[checkpointSchema],
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }    

    }, 
    movementType:{
        type: String,
        enum: Object.values(MovementType),
        require:true
    },
    initialHeading:{
        type: headingSchema,
        require:true
    }
}, { 
    timestamps: true,
    autoCreate: false,
});

export default routeSchema;