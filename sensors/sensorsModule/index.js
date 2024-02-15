
import { NativeModules } from 'react-native';

const { RNSensorsModule } = NativeModules;

export const getSensorData = () => {
    return RNSensorsModule.getSensorData();
};

export default RNSensorsModule;
