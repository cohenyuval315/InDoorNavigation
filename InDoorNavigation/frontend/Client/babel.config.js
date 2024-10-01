module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    }],
    // "@babel/plugin-transform-private-methods",
    "react-native-reanimated/plugin",// THIS MUST BE LISTED LAST
    
  ],  
};
