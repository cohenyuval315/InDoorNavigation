package com.client.geolocation;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.List;

public class GeoLocationPackage implements ReactPackage {

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    // modules.add(new MapModule(reactContext));
    return modules;
  }

}
