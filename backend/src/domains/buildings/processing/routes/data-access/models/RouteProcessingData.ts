import { Schema, model } from 'mongoose';


const routeProcessingDataSchema = new Schema({
    buildingId:{
        type: Schema.Types.String, 
        require:true
    },
    routeName:{
        type: Schema.Types.String, 
        require:true,
    },
    route:{
        type: Schema.Types.Array, 
        require:true,
    },
    data:{
        
    },
    checkpoints:{
        type: Schema.Types.Array, 
        require:true,
        validate: {
            validator: function(v:any) {
                return v.length >= 1;
            },
            message: (props: { path: any; }) => `${props.path} must have at least 1 item!`
        }               
    },
}, { 
    timestamps: true,
    autoCreate: true,
});


const RouteProcessingData = model('RouteProcessingDataSchema', routeProcessingDataSchema);
export default RouteProcessingData;
