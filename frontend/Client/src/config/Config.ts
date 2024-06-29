import { SERVER_HOST, SERVER_PORT } from '@env';

class Config {
  static SERVER_HOST = SERVER_HOST;
  static SERVER_PORT = SERVER_PORT;
  static BASE_SERVER_URL = `${SERVER_HOST}:${SERVER_PORT}`;
  static SERVER_URL = `http://${Config.BASE_SERVER_URL}`;
  static SERVER_WSS_URL = `ws://${Config.BASE_SERVER_URL}`;
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