
# react-native-wifi-module

## Getting started

`$ npm install react-native-wifi-module --save`

### Mostly automatic installation

`$ react-native link react-native-wifi-module`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-wifi-module` and add `RNWifiModule.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNWifiModule.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNWifiModulePackage;` to the imports at the top of the file
  - Add `new RNWifiModulePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-wifi-module'
  	project(':react-native-wifi-module').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-wifi-module/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-wifi-module')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNWifiModule.sln` in `node_modules/react-native-wifi-module/windows/RNWifiModule.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Wifi.Module.RNWifiModule;` to the usings at the top of the file
  - Add `new RNWifiModulePackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNWifiModule from 'react-native-wifi-module';

// TODO: What to do with the module?
RNWifiModule;
```
  