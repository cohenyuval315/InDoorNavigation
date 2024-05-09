import { Platform } from 'react-native';
import RNExitApp from 'react-native-exit-app';


export const getPlatform = () => {
if (Platform.OS === 'android') {
    
    console.log('Running on Android');
    } else if (Platform.OS === 'ios') {
    
    console.log('Running on iOS');
    } else {
    
    console.log('Running on some other platform');
    }
    
}

export const exitApplication = () => {
    RNExitApp()
}