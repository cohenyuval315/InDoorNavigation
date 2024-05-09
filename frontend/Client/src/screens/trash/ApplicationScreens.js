/* eslint-disable prettier/prettier */
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainScreen from '../screens/temp/MainScreen';
import GoogleMapsScreen from '../screens/global-map-screen/GlobalMapScreen';
import DataCollectorScreen from '../screens/temp/data/DataCollectorScreen';
import BuildingsPickerScreen from '../screens/temp/BuildingsPickerScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import GlobalMapScreen from '../screens/global-map-screen/GlobalMapScreen';

export const ApplicationScreens = {
    BUILDING:{
        id:"BUILDING",
        options:{
            title: 'buildings',
            tabBarLabelStyle: { 

            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={"star-outline"} size={size} color={color} />;
            }
        },
        component:BuildingsPickerScreen
    },
    settings:{
        id:"Settings",
        options:{
            title: 'settings',
            tabBarLabelStyle: { 

            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={"star-outline"} size={size} color={color} />;
            }
        },
        component:SettingsScreen
    },
    DataCollector:{
        id:"DataCollector",
        options:{
            title: 'admin',
            tabBarLabelStyle: { 

            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={"star-outline"} size={size} color={color} />;
            }
        },
        component:DataCollectorScreen
    }
}

