// // import RootStackScreen from './navigation/RootStackScreen';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
import EmptyScreen from './EmptyScreen';
import DrawerScreen from './DrawerScreen';

  import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppDrawer from '../layouts/app-drawer/AppDrawer';
import SearchScreen from './SearchScreen';
import LogInToUnlockScreen from './LogInToUnlockScreen';
  
const Stack = createStackNavigator();




function RootStackScreen() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Root" component={AppDrawer} options={{headerShown:false}} />
          <Stack.Group screenOptions={{ headerShown:false }}>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Share" component={EmptyScreen} />
            <Stack.Screen name="LogInToUnlock" component={LogInToUnlockScreen} />
        </Stack.Group>            
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


export default RootStackScreen;