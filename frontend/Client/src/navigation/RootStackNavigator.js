import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  DataPointCollectionScreen,
  DataRouteCollectionScreen,
  GraphMapCollectionScreen,
  POICollectionScreen
} from '../screens/admin';

import {
  LoginScreen,
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
  ProfileScreen,
  SettingsScreen,
  SplashScreen
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


const Stack = createStackNavigator();




import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuildingByMapId, selectMapStatus } from '../app/map/map-slice';
import { fetchBuildingGraphById,selectGraphStatus } from '../app/admin/admin-slice';
import { useTheme } from '../contexts/ThemeContext';
import BuildingMapPathBuilder from '../screens/main/building-map/components/path-builder/BuildingMapPathBuilder';
import Status from '../app/status';

const TestScreen = (props) => {
  const [loading,setLoading] = React.useState(true);
  const dispatch = useDispatch()
  const buildingId = "324324324343";
  React.useEffect(()=>{
    dispatch(fetchBuildingByMapId(buildingId));
    dispatch(fetchBuildingGraphById(buildingId));
  },[])

  const mapStatus = useSelector(selectMapStatus)
  const graphStatus = useSelector(selectGraphStatus);
  React.useEffect(() => {
    if(mapStatus === Status.SUCCEEDED && graphStatus == Status.SUCCEEDED){
      setLoading(false)
    }

  },[dispatch,mapStatus,graphStatus])
  
  const onPress = () => {
    // props.navigation.navigate("data-points-collection")
    props.navigation.navigate("data-routes-collection")
    // props.navigation.navigate("buildings-global-map")
    
    //props.navigation.navigate("buildings-global-map")
  }
  if(loading){
    return null;
  }
  return (
    <View>
        <Button title="press" onPress={onPress}/>
    </View>
  )
}

function RootStackNavigator() {
    const {theme} = useTheme();
    const navigationRef = React.useRef();
    const isSignedIn = true;
    const isAdmin = true;
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
    return (
        <NavigationContainer
          fallback={<Text>Fallback Loading...</Text>}
          theme={theme}
          ref={navigationRef}
          initialState={null}
          onReady={() => console.log("ready")}
        >
          <Stack.Navigator initialRouteName='Root'  screenOptions={rootScreenOptions}>
            <Stack.Screen  name="Root" component={TestScreen} options={{headerShown:true}} />
            
            {/* Main Screens */}
            <Stack.Group screenOptions={{ headerShown:false }}>
              <Stack.Screen  name="empty" component={EmptyScreen} />
              <Stack.Screen name="buildings-global-map" component={BuildingsGlobalMapScreen} />
              <Stack.Screen name='buildings-search' component={BuildingsSearchScreen}/>
              

              

              <Stack.Screen name="building-map" component={BuildingMapDisplayScreen} />
              <Stack.Screen name="building-POIs-search" component={BuildingPOIsSearchScreen} />
              

              <Stack.Screen name="building-pre-navigation" component={BuildingPreNavigationScreen} />
              <Stack.Screen name="building-navigation" component={BuildingNavigationScreen} />
            </Stack.Group>    

            {/* Main Modals Screens */}   
            <Stack.Group screenOptions={{ headerShown:false ,presentation:"transparentModal"}}>
                <Stack.Screen name='building-map-path-builder-modal' component={BuildingMapPathBuilder}/>
            </Stack.Group>  
            {/* Auth Screens */}

            {isSignedIn ? (
              <>
                <Stack.Group screenOptions={{ headerShown:false }}>
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Settings" component={SettingsScreen} />
                </Stack.Group>
              </>
            ) : (
              <Stack.Group screenOptions={{ headerShown:false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </Stack.Group>
            )}

            {/* Admin Screens */}
            {isSignedIn && isAdmin && (

              <Stack.Group screenOptions={{ headerShown:false }}>
                <Stack.Screen name="data-points-collection" component={DataPointCollectionScreen} />
                <Stack.Screen name="data-routes-collection" component={DataRouteCollectionScreen} />
                <Stack.Screen name="graph-map-collection" component={GraphMapCollectionScreen} />
                <Stack.Screen name="pois-collection" component={POICollectionScreen} />
              </Stack.Group> 
            )}

            {/* Errors Screens */} 
            <Stack.Group screenOptions={{ headerShown:false }}>
              <Stack.Screen name="no-internet" component={NoInternetScreen} />
              <Stack.Screen name="servers-down" component={ServersAreDownScreen} />
              <Stack.Screen name="unknown-error"  component={UnknownErrorScreen} />
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
            </Stack.Group>              

          </Stack.Navigator>
        </NavigationContainer>
    );
  }


export default RootStackNavigator;