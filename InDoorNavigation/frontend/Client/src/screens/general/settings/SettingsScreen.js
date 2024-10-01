/** Icon, Accesability, Logout */
/** accessability -> switches*/
/** if admin: building admins -> crud building admin account*/
/** if building admin: building managers -> crud building manager account*/

import { Text, TouchableOpacity, View } from "react-native"
// import { createStackNavigator } from '@react-navigation/stack';
// import OpenDrawerButton from "../../layouts/app-drawer/DrawerToggleButton";
// import ScreenHeader from "../../layouts/app-drawer/ScreenHeader";

// general: language , font/labels , theme, distance units , 
// map display: icon, keep north up , 
// navigation : avoid etc , 
// audio: 
// notfication: errors, voice , 
// restart if close (run in background)(home button
// styles
// poi pop ups
// magnet ,
// speed
const SettingsScreen = (props) => {
    return (
        <View style={{
            backgroundColor:"red",
            
        }}>
            {/* <ScreenHeader title={"Settings"}>

            </ScreenHeader>
            <TouchableOpacity style={{
                height:200,
            }} onPress={() => props.navigation.navigate("General")}>
                <Text style={{
                    
                }}>
                    CLIC KME
                </Text>
            </TouchableOpacity>
            <OpenDrawerButton {...props}/> */}
        </View>
    )
}
export default SettingsScreen;
