/* eslint-disable prettier/prettier */
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainScreen from '../screens/MainScreen';
import GoogleMapsScreen from '../screens/GoogleMapsScreen';
import DataCollectorScreen from '../screens/DataCollectorScreen';

export const ApplicationScreens = {
    BUILDING:{
        id:"BUILDING",
        options:{
            title: 'build',
            tabBarLabelStyle: { 

            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={"star-outline"} size={size} color={color} />;
            }
        },
        component:MainScreen
    },
    GOOGLE_MAPS:{
        id:"GOOGLE_MAPS",
        options:{
            title: 'map',
            tabBarLabelStyle: { 

            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={"star-outline"} size={size} color={color} />;
            }
        },
        component:GoogleMapsScreen
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

