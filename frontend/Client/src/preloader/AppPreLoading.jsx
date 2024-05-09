import React, { useEffect, useState } from 'react';
import RootStackNavigator from '../navigation/RootStackNavigator';
import DataInitializer from '../initialization/DataInitializer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '../contexts/ThemeContext';
import { LoadingScreen } from '../screens/general';

// import { requestPermissions } from '../utils/permissions';


function AppPreLoading() {
  const [loadingPreLoading, setLoadingPreLoading] = useState(true);
  const {loadingTheme, setInitialTheme} = useTheme();
  const props = {
    loading:loadingPreLoading
  }
  async function preload(){
    setLoadingPreLoading(true);
    await setInitialTheme();
    setLoadingPreLoading(false);
  }
  useEffect(()=>{
    // requestPermissions();
    preload()
  },[])

  return (
    <>
      {loadingPreLoading ? (
        <>
            <LoadingScreen/>
        </>
      ) : (
        <DataInitializer>
            <RootStackNavigator {...props} />
        </DataInitializer>
      )}
    </>
  );
}
export default AppPreLoading;
