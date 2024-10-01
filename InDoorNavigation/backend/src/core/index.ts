import { AHRS } from "./INS/AHRS/AHRS.js";
import { IMU } from "./INS/IMU/IMU.js";
import { AccelerometerIMU, GravityIMU, GyroscopeIMU, LinearAccelerationIMU, MagnetometerIMU, RotationVectorIMU } from "./INS/IMU/IMUSensor.js";
import { InterialNavigationSystem } from "./INS/InterialNavigationSystem.js";
import { StepDetection } from "./INS/step-detection/StepDetection.js";
import { StepLengthEstimation } from "./INS/step-length-estimation/StepLengthEstimation.js";
import { MapEngine } from "./MapEngine.js";
import { GeoLocationMatching } from "./geolocation/GeoLocationMatching.js";
import { MapEngineIntegration } from "./integration/MapEngineIntegration.js";
import { MagneticMatching } from "./magnetic/MagneticMatching.js";
import { WifiFingerprinting } from "./wifi/WifiFingerprinting.js";

const mapEngine = new MapEngine(
    new InterialNavigationSystem(
        new IMU([
            new AccelerometerIMU(

            ),
            new GyroscopeIMU(
                
            ),
            new RotationVectorIMU(),
            new GravityIMU(),
            new LinearAccelerationIMU(),
            new MagnetometerIMU()
        ]),
        new AHRS(),
        new StepDetection(),
        new StepLengthEstimation()
    ),
    new WifiFingerprinting(

    ),
    new MagneticMatching(

    ),
    new GeoLocationMatching(),
    new MapEngineIntegration(
    ),
)

export default mapEngine;