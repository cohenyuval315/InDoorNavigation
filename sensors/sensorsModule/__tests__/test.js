import { getSensorData } from '../index';
const { NativeModules } = require('react-native');

jest.mock('react-native', () => ({
  NativeModules: {
    RNSensorsModule: {
      getSensorData: jest.fn(),
    },
  },
}));

describe('RNSensorsModule', () => {
  it('should call getSensorData', () => {
    NativeModules.RNSensorsModule.getSensorData.mockReturnValueOnce('Mocked sensor data');

    const result = getSensorData();

    expect(NativeModules.RNSensorsModule.getSensorData).toHaveBeenCalled();
    expect(result).toEqual('Mocked sensor data');
  });
});


  