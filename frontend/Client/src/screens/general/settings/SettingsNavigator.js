/** Icon, Accesability, Logout */
/** accessability -> switches*/
/** if admin: building admins -> crud building admin account*/
/** if building admin: building managers -> crud building manager account*/

import { Text, View } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SettingsScreen from "./SettingsScreen";
import GeneralSettingsNavigator from "./screens/general/GeneralSettingsNavigator";

const SettingsMainStack = createStackNavigator();


const SettingsNavigator = () => {
    return (
        <SettingsMainStack.Navigator>
             <SettingsMainStack.Screen name="Settings" options={{
                headerShown:false
             }} component={SettingsScreen} />
             <SettingsMainStack.Screen name="General" component={GeneralSettingsNavigator}  options={{
                headerShown:false
             }}/>
        </SettingsMainStack.Navigator>
    )
}
export default SettingsNavigator;
