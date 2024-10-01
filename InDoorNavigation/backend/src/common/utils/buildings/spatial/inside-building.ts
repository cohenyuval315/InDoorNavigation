
export const isSunlightDetected = (isGPSAvailable, lightIntensity, hourOfDay, isSunnyWeather) => {
    // Threshold value for outdoor light intensity (adjust as needed)
    const sunlightIntensityThreshold = 1000;
    // Threshold values for hour of the day (adjust as needed)
    const morningThreshold = 6;
    const eveningThreshold = 18;
  
    // Check if GPS is available and it's daytime
    if (isGPSAvailable && hourOfDay >= morningThreshold && hourOfDay < eveningThreshold) {
      // Determine whether the detected light is likely from sunlight
      if (lightIntensity > sunlightIntensityThreshold && isSunnyWeather) {
        return true;
      }
    }
    
    return false;
  };

const isInsideBuilding = (buildingBoundaries) => {
  
}
