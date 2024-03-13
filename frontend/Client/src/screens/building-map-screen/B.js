import { View } from "react-native";
import UserMapOverlay from "../../components/general/map/user-map-overlay/UserMapOverlay";
import BuildingMap from "../../components/building-map/BuildingMap";
import POIMapOverlay from "../../components/general/map/poi-map-overlay/POIMapOverlay";
import MapSettings from "../../components/general/map/map-settings/MapSettings";
import UserLockMapButton from "../../components/general/map/user-lock-map-button/UserLockMapButton";

const BuildingMapScreen = () => {
    return (
        <View>
            
            <View>
                <POIMapOverlay/>
                <UserMapOverlay/>
                <BuildingMap/>
            </View>

            <MapSettings/>
            <UserLockMapButton/>


        </View>
    )
}

export default BuildingMapScreen;