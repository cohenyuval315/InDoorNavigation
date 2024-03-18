import { createDrawerNavigator } from '@react-navigation/drawer';
import EmptyScreen from './EmptyScreen';
import SettingsScreen from './settings/SettingsScreen';

const Drawer = createDrawerNavigator();

function DrawerScreen() {
    return (
      <Drawer.Navigator>
        <Drawer.Group screenOptions={{headerTitle:"op", headerTransparent:true}}>
            <Drawer.Screen name="Profile" component={EmptyScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Group>
      </Drawer.Navigator>
    );
  }


export default DrawerScreen;