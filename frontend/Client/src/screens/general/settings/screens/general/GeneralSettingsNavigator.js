import GeneralSettingsScreen from "./GeneralSettingsScreen";
import GeneralLanguageSettingsScreen from "./language/GeneralLanguageSettingsScreen";
import { createStackNavigator } from '@react-navigation/stack';
const GeneralSettingsMainStack = createStackNavigator();

const GeneralSettingsNavigator = () => {
    return (
        <GeneralSettingsMainStack.Navigator>
        <GeneralSettingsMainStack.Screen options={{
            title:"General"
        }} name="GeneralSettings" component={GeneralSettingsScreen} />
        <GeneralSettingsMainStack.Screen name="GeneralLanguageSettings" component={GeneralLanguageSettingsScreen} />
      </GeneralSettingsMainStack.Navigator>
    );
  };

export default GeneralSettingsNavigator