/* eslint-disable prettier/prettier */
import {
  // Permission,
  Alert,
  Linking,
  PermissionStatus,
  PermissionsAndroid,
  Platform
} from 'react-native';

// const requestPermission = async (permission:Permission,title:string) => {
//   try {
//     const granted = await PermissionsAndroid.request(permission,
//     {
//       title: `InDoor Navigation ${title} Permission`,
//       message:
//         `Our Application cannot work without access to your ${title.toLowerCase()}`,
//       // buttonNeutral: 'Ask Me Later',
//       buttonNegative: 'Cancel',
//       buttonPositive: 'OK',
//     }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const openSettings = () => {
  Linking.openSettings();
};

const requestIOSPermissions = async () => {
  return false;
}

const requestAndroidPermissions = async () => {
  try {
      const granted: Record<string, PermissionStatus>  = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BODY_SENSORS_BACKGROUND,
          PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
          PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
      ]);
      for (const permission in granted) {
          if (granted[permission] !== PermissionsAndroid.RESULTS.GRANTED) {
              console.warn(`Permission ${permission} was not granted.`);
          }
      }
      for (const permission of Object.values(granted)) {
          if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
              `${permission} Permission Required`,
              `Please grant ${permission} permission to use the application.`,
              [
                  { text: 'OK', onPress: () => openSettings() }
              ]
          );            
              return false;
          }
      }
      return true;
  } catch (err) {
      console.warn(err);
      return false;
  }
}


export const requestPermissions = async () => {
  if (Platform.OS === 'ios') {
    return await requestIOSPermissions();
  } else if (Platform.OS === 'android') {
    return await requestAndroidPermissions();
  } else {
    console.error('unsupported device');
    return false;
  }

}

