/** Icon, Accesability, Logout */
/** accessability -> switches*/
/** if admin: building admins -> crud building admin account*/
/** if building admin: building managers -> crud building manager account*/

import { View,ActivityIndicator, Text } from "react-native"
import BuildingMap from "./building-map-screen/BuildingMapScreen";

const SettingsScreen = () => {
    return (
        <View style={{flex:1}}>
            <BuildingMap building={{id:'324324324343'}}/>

            <View style={{
 
                flexDirection:"row",
                zIndex:1,
                justifyContent:"center"
            }}>
                <ActivityIndicator/>
                <Text>loading...</Text>
            </View>

        </View>
    )
}
export default SettingsScreen;
