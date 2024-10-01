// import { SERVER_HOST, SERVER_PORT } from '@env';

// const SERVER_HOST = '10.0.0.9'
const SERVER_HOST = '10.0.0.15'
// const SERVER_HOST = '172.20.24.36';
// const SERVER_HOST = '172.20.24.36'
// const SERVER_HOST = '172.20.24.36'

//const SERVER_HOST = '192.168.134.225'
// const SERVER_HOST = '192.168.21.225'
//const SERVER_HOST = '127.0.0.1'
// const SERVER_HOST = 'localhost'
// const SERVER_HOST = '0.0.0.0'


const SERVER_PORT = 3000
const SERVER_TLD = ""; // top level domain

class Config {
  static SERVER_HOST = SERVER_HOST;
  static SERVER_PORT = SERVER_PORT;
  static BASE_SERVER_URL = `${SERVER_HOST}:${SERVER_PORT}`;
  static SERVER_URL = `http://${Config.BASE_SERVER_URL}${SERVER_TLD}`;
  static SERVER_WSS_URL = `ws://${Config.BASE_SERVER_URL}`;
  static SERVER_TILE_FORMAT = "pbf";
  // static SERVER_TILES = `${Config.SERVER_URL}/tiles/{floor}/{x}/{y}/{z}.${Config.SERVER_TILE_FORMAT}`
  static SERVER_TILES = `${Config.SERVER_URL}/tiles/area`
  static NODE_ENV = process.env.NODE_ENV
  static IS_DEV: boolean = __DEV__;
  static SPLASH_TIME_LENGTH = 3000;
  static APP_SPLASH_SCREEN_TITLE = "Indoor Navigation"
  static LOW_ACCURACY_THRESHOLD_METERS = 3;

  static WEBSOCKET_INTERVAL_MS = 100

  static ACCELEROMETER_INTERVAL_MS = 100
  static ACCELEROMETER_BUFFER_SIZE = 100
  static ACCELEROMETER_TTL_MS = 100

  static MANGNETOMETER_INTERVAL_MS = 100
  static MANGNETOMETER_BUFFER_SIZE = 100
  static MANGNETOMETER_TTL_MS = 100

  static GYROSCOPE_INTERVAL_MS = 100
  static GYROSCOPE_BUFFER_SIZE = 100
  static GYROSCOPE_TTL_MS = 100

  static WIFI_INTERVAL_MS = 300
  static WIFI_BUFFER_SIZE = 100
  static WIFI_TTL_MS = 100

  static LAST_POSITIONS_BUFFER_SIZE = 100
  static LAST_POSITIONS_TTL_MS = 100

}


export default Config;

//'10.0.0.9'
//10.0.0.15 
//192.168.181.225
// 192.168.86.255
// const SERVER_HOST = '10.0.0.9'
// const SERVER_HOST = '192.168.86.225'
// const SERVER_PORT = 3000
// export const BASE_SERVER_URL = `${SERVER_HOST}:${SERVER_PORT}`;
// export const SERVER_URL = `http://${BASE_SERVER_URL}`
// export const SERVER_WSS_URL = `ws://${BASE_SERVER_URL}`
// }