import { AHRS } from "./INS/AHRS/AHRS";
import { IMU } from "./INS/IMU/IMU";
import { AccelerometerIMU, GravityIMU, GyroscopeIMU, LinearAccelerationIMU, MagnetometerIMU, RotationVectorIMU } from "./INS/IMU/IMUSensor";
import { InterialNavigationSystem } from "./INS/InterialNavigationSystem";
import { StepDetection } from "./INS/step-detection/StepDetection";
import { StepLengthEstimation } from "./INS/step-length-estimation/StepLengthEstimation";
import { MapEngine } from "./engine";
import { GeoLocationMatching } from "./geolocation/GeoLocationMatching";
import { InitialUserSpatialOrientation } from "./initial-user-spatial-orientation/InitialUserSpatialOrientation";
import { MapEngineIntegration } from "./integration/MapEngineIntegration";
import { MagneticMatching } from "./magnetic/MagneticMatching";
import { WifiFingerprinting } from "./wifi/WifiFingerprinting";

const mapEngine = new MapEngine(
    new InitialUserSpatialOrientation(),
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