/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ApplicationScreens} from './ApplicationScreens';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '../../contexts/ThemeContext';

const screenOptions = {
  tabBarScrollEnabled: true, 
  scrollEnabled: true,
  swipeEnabled: true,
  lazy: true,  
  // unmountOnBlur: true,
  // freezeOnBlur:true,
  tabBarLabelPosition:"below-icon", //beside-icon
  tabBarActiveTintColor:'white',

  headerStyle: {
    backgroundColor:"papayawhip",
  },
  tabBarStyle:{
    flex: 1,
    backgroundColor:Colors.darker,
    maxHeight:70,
    minHeight:30,
    flexDirection:"row",
    minWidth:"100%",
    // maxWidth:2000,
  },
  
  tabBarItemStyle:{
    backgroundColor:Colors.dark,
    // maxWidth:50,
    // minWidth:50,
  },

 
  tabBarIndicatorStyle: {
    backgroundColor: Colors.light,
  },

  tabBarLabelStyle: {
    // fontSize: 10
  }, 
  
  tabBarItemContainerStyle: {
    
  },
  tabBarOptions: {
    scrollEnabled: true,
    
  },
  showIcon: false,
};

const AppBottomTabs = createBottomTabNavigator();

const renderBottomScreens = () => {
  return Object.entries(ApplicationScreens).map(([key,value])=>{
    return (
      <AppBottomTabs.Screen  
      key={value.id}
      name={value.id} 
      component={value.component}
      options={value.options}  />
    )
  })
}

const AppContainer = () => {
    const {theme} = useTheme();

    const backgroundStyle = {
      backgroundColor:theme.colors.backgroundColor,
    };  

    return (

        <NavigationContainer independent={true} >
          <AppBottomTabs.Navigator  
            sceneContainerStyle={backgroundStyle} 
            screenOptions={screenOptions} 
            initialRouteName={ApplicationScreens.BUILDING.id} 
          >
            {renderBottomScreens()}
          </AppBottomTabs.Navigator>
        </NavigationContainer>
      
    );
}

export {
  AppContainer
};