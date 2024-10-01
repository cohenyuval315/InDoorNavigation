import { IMUSensor } from "./IMUSensor";

export class IMU { 
    private sensors:IMUSensor[];
    constructor (sensors:IMUSensor[]){
        this.sensors = sensors;
    }
}