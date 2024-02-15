/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {requestPermissions} from './permissions';

requestPermissions();
AppRegistry.registerComponent(appName, () => App);
