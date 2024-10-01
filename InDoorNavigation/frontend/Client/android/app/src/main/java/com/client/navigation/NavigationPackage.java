package com.client.navigation;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;




public class NavigationPackage implements ReactPackage {


   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = Arrays.asList(
            new NavigationManager(reactContext)
       );
       return modules;
   }
   public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}