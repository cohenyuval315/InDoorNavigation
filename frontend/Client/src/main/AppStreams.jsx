import { useEffect, useRef } from "react";
import GPSStream from "./GPSStream";
import { sensors } from "../services/sensors";
import { setUpdateInterval, start,startTrigger } from "../services/sensors/rnsensors";
import { SensorKey } from "../services/sensors/SensorKey";
import { Observable, buffer, bufferCount, interval, map, mergeAll, share, take, window } from "rxjs";
import SensorsService from "../sensors/sensors-service";
async function check(){
    // const service = await SensorsService.getInstance().sensor(SensorKey.ACCELEROMETER);
    // service.stopSensor()
    // if (service){
    //     service.startSensor()
    //     service.configSensorInterval(3000);
    //     service.getObservable().pipe(share({ resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }),).pipe(bufferCount(3),).subscribe((x) => {
    //         console.log("YEAH X")
    //     });
    // }
}
check()


// sensor(SensorKey.LIGHT)
// sensor(SensorKey.ACCELEROMETER)
// sensor(SensorKey.GRAVITY)
// sensor(SensorKey.GYROSCOPE)
// sensor(SensorKey.GYROSCOPEUNCALIBRATED)
// sensor(SensorKey.LINEARACCELERATION)
// sensor(SensorKey.MAGNETOMETER)
// sensor(SensorKey.MAGNETOMETERUNCALIBRATED)
// sensor(SensorKey.MOTIONDETECT)
// sensor(SensorKey.ORIENTATIONDEPRECATED)
// sensor(SensorKey.ROTATIONVECTOR)
//sensor(SensorKey.STEPCOUNTER)
//sensor(SensorKey.STEPDETECTOR)


// available but doenst work
// sensor(SensorKey.PROXIMITY)
// sensor(SensorKey.SIGNIFICANTMOTION)


// Not avialble but should be:
// ambientTemperature doesnt work - ON-CHANGE SENSOR
// significant motion N= doesnt work - one-shot



// setUpdateInterval("accelerometer",5000)
// start("accelerometer");
// start("stepCounter")
// start("rotationVector")

// setUpdateInterval("accelerometer",5000)
// setUpdateInterval("stepCounter",1000)
// setUpdateInterval("rotationVector",3000)

// sensors.stepCounter.subscribe((data) => {
//     console.log("STEP:",data)
// })

// sensors.accelerometer.subscribe((data) => {
//     console.log("ACCELER",data)
// })

// sensors.rotationVector.subscribe((data) => {
//     console.log("ROTATION:",data)
// })

const AppStreams = ({children}) => {


    useEffect(() => {

    }, []);
    return (
        <GPSStream>
            {children}
        </GPSStream>
    )
}

export default AppStreams;