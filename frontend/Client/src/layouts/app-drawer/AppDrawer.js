import { createDrawerNavigator } from '@react-navigation/drawer';
import EmptyScreen from '../../screens/EmptyScreen';
import AppDrawerContentScrollView from './AppDrawerContentScrollView';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import SettingsNavigator from '../../screens/settings/SettingsNavigator';
import RecentScreen from '../../screens/RecentScreen';
import GlobalMapScreen from '../../screens/global-map-screen/GlobalMapScreen';
import BuildingMapScreen from '../../screens/building-map-screen/BuildingMapScreen';
import BuildingNavigationScreen from '../../screens/navigation-screen/BuildingNavigationScreen';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
    return (
      <Drawer.Navigator drawerContent={props => <AppDrawerContentScrollView {...props}/>}>
        <Drawer.Group 
            // screenOptions={{}}
            screenOptions={({ route }) => ({
                // headerShown: route.name !== 'Settings',
                // headerTitle:"",
                // headerTransparent:true
                headerShown:false
            })}
            >
            <Drawer.Screen name="Map" component={GlobalMapScreen} />
            <Drawer.Screen name="BuildingMap" component={BuildingMapScreen} />
            <Drawer.Screen name="Navigation" component={BuildingNavigationScreen} />
            <Drawer.Screen name="Profile" component={EmptyScreen} />
            <Drawer.Screen name="Recent" options={{headerShown:true, headerTitle:"Recent Destinations"}} component={RecentScreen} />
            <Drawer.Screen name="Settings" component={SettingsNavigator} />
        </Drawer.Group>
      </Drawer.Navigator>
    );
  }




export default AppDrawer;