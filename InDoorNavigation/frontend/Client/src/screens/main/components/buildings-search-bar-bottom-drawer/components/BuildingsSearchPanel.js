import {  View } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import BuildingsSearchListBottomDrawer from "./BuildingsSearchListBottomDrawer";
import { selectAllBuildings } from "../../../../../app/building/buildings-slice";
import { SearchBarButton } from "../../../../../components/general/buttons";

const BuildingsSearchPanel  = () => {
    const navigation = useNavigation();
    const buildings = useSelector(selectAllBuildings);

    const onSearchBarBottomPress = () => {
        navigation.navigate("buildings-search");
    }
    
    return (
        <View style={{flex:1}}>
            <SearchBarButton onPress={onSearchBarBottomPress} />
            <BuildingsSearchListBottomDrawer buildings={buildings} />
        </View>
    )
}
export default BuildingsSearchPanel
