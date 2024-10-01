module.exports = {
  preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node',"svg","png"],
    setupFiles: ["dotenv/config"],
  };
  