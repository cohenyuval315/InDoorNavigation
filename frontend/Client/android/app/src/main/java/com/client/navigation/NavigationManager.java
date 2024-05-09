package com.client.navigation;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.TriggerEvent;
import android.hardware.TriggerEventListener;
import android.hardware.SensorDirectChannel;
import android.hardware.SensorManager;

import android.os.SystemClock;
import androidx.annotation.Nullable;
import android.util.Log;
import android.os.SystemClock;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.List;

import android.os.PowerManager.WakeLockStateListener;

import android.os.PowerManager;

public class NavigationManager extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  private final PowerManager powerManager;

  public NavigationManager(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    this.powerManager = (PowerManager)reactContext.getSystemService(reactContext.POWER_SERVICE);
  }
  @Override
  public String getName() {
    return "NavigationManager";
  }

  

}