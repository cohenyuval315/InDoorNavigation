/** Icon, Accesability, Logout */
/** accessability -> switches*/
/** if admin: building admins -> crud building admin account*/
/** if building admin: building managers -> crud building manager account*/

import { View } from "react-native"
import BuildingMap from "./BuildingMapScreen";

const SettingsScreen = () => {
    return (
        <View style={{flex:1}}>
            <BuildingMap building={{id:'324324324343'}}/>
        </View>
    )
}
export default SettingsScreen;
