import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  DataPointCollectionScreen,
  DataRouteCollectionScreen,
  // GraphMapCollectionScreen,
  // POICollectionScreen
} from '../screens/admin';

import {
  ProfileScreen,
  RecentDestinationsScreen
} from '../screens/user'

import {
  LoginScreen,
  RequireLoginScreen,
  SignUpScreen
} from '../screens/auth';

import {
  UnknownErrorScreen,
  DenyContractScreen,
  NoInternetScreen,
  ServersAreDownScreen
} from '../screens/errors';

import {
  EmptyScreen,
  LoadingScreen,
  SettingsScreen,
  SplashScreen,
  HelpCenterScreen,
  AboutScreen,
  FeedbackScreen
} from '../screens/general';

import {
  BuildingMapDisplayScreen,
  BuildingNavigationScreen,
  BuildingPreNavigationScreen,
  BuildingsGlobalMapScreen,
  BuildingsSearchScreen,
  BuildingPOIsSearchScreen
} from '../screens/main';

import {
  ContractModal,
  EnableLocationServicesModal,
  ErrorMessageModal,
  PermissionsModal
} from '../screens/modals';

import { useTheme } from '../contexts/ThemeContext';
import NavigationWrapper from './NavigationWrapper';
import FallBackComponent from './FallBackComponent';

const Stack = createStackNavigator();

const rootScreenOptions = {
  headerMode: 'screen',
  headerTintColor: 'white',
  // headerStyle: { backgroundColor: 'tomato' },
  cardShadowEnabled:true,
  cardOverlayEnabled:true,
  presentation:'card',
  gestureEnabled:false,
  animationEnabled:true,
  cardStyle:{
    flex:1,
    // backgroundColor: 'tomato'
  }
}  

const navigationTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};


function RootStackNavigator() {
    const {theme} = useTheme();
    const navigationRef = React.useRef();
    const isSignedIn = true;
    const isAdmin = true;

    const onReady = () => {
      console.log("ready")
    }

    const initialRouteName = "splash" // empty
    
    return (
        <NavigationContainer
          fallback={<FallBackComponent/>}
          // theme={theme }
          theme={navigationTheme}
          ref={navigationRef}
          initialState={null}
          onReady={onReady}
        >
          <NavigationWrapper>
        
            <Stack.Navigator initialRouteName={initialRouteName}  screenOptions={rootScreenOptions}>
              {/* Main Screens */}
              <Stack.Group screenOptions={{ headerShown:false }}>
                <Stack.Screen name="empty" component={EmptyScreen} />
                <Stack.Screen name="buildings-global-map" component={BuildingsGlobalMapScreen} />
                <Stack.Screen name='buildings-search' component={BuildingsSearchScreen}/>


                <Stack.Screen name="building-map" component={BuildingMapDisplayScreen} />
                <Stack.Screen name="building-POIs-search" component={BuildingPOIsSearchScreen} />
                

                <Stack.Screen name="building-pre-navigation" component={BuildingPreNavigationScreen} />
                <Stack.Screen name="building-navigation" component={BuildingNavigationScreen} />
              </Stack.Group>    


              {/* Auth Screens */}
              {isSignedIn ? (
                <>
                  <Stack.Group screenOptions={{ headerShown:false }}>
                    <Stack.Screen name="profile" component={ProfileScreen} />
                    <Stack.Screen name="recent-destinations" component={RecentDestinationsScreen} />
                  </Stack.Group>
                </>
              ) : (
                <Stack.Group screenOptions={{ headerShown:false }}>
                  <Stack.Screen name="login" component={LoginScreen} />
                  <Stack.Screen name="sign-up" component={SignUpScreen} />
                </Stack.Group>
              )}

              {/* Admin Screens */}
              {isSignedIn && isAdmin && (

                <Stack.Group screenOptions={{ headerShown:false }}>
                  <Stack.Screen name="data-points-collection" component={DataPointCollectionScreen} />
                  <Stack.Screen name="data-routes-collection" component={DataRouteCollectionScreen} />
                  {/* <Stack.Screen name="graph-map-collection" component={GraphMapCollectionScreen} />
                  <Stack.Screen name="pois-collection" component={POICollectionScreen} /> */}
                </Stack.Group> 
              )}

              {/* Errors Screens */} 
              <Stack.Group screenOptions={{ headerShown:false }}>
                <Stack.Screen name="no-internet" component={NoInternetScreen} />
                <Stack.Screen name="servers-down" component={ServersAreDownScreen} />
                <Stack.Screen name="unknown-error"  component={UnknownErrorScreen} />
                <Stack.Screen name="deny-contract"  component={DenyContractScreen} />
              </Stack.Group>    
              

              {/* General Modals Screens */}   
              <Stack.Group screenOptions={{ headerShown:false ,presentation:"transparentModal"}}>
                <Stack.Screen name="permissions" component={PermissionsModal} />
                <Stack.Screen name="contract" component={ContractModal} />
                <Stack.Screen name="location-services" component={EnableLocationServicesModal} />
                <Stack.Screen name="error-message" component={ErrorMessageModal}/> 
              </Stack.Group>   

              {/* General Screens */}
              <Stack.Group screenOptions={{ headerShown:false }}>
                <Stack.Screen name="loading" component={LoadingScreen} />
                <Stack.Screen name="splash" component={SplashScreen} />
                <Stack.Screen name="about" component={AboutScreen} />
                <Stack.Screen name="feedback" component={FeedbackScreen} />
                <Stack.Screen name="help-center" component={HelpCenterScreen} />
                <Stack.Screen name="settings" component={SettingsScreen} />
                <Stack.Screen name="require-login" component={RequireLoginScreen} />

              </Stack.Group>              
              


            </Stack.Navigator>
          
          </NavigationWrapper>
        </NavigationContainer>
    );
  }


export default RootStackNavigator;