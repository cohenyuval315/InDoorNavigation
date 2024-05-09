import {  View } from "react-native"
import { SearchBarButton } from "../../../../../../components/general/buttons"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import BuildingsSearchListBottomDrawer from "./POisSearchListBottomDrawer";
import { selectMapPOIs } from "../../../../../../app/map/map-slice";
const POIsSearchPanel  = ({onPOIPress}) => {
    const navigation = useNavigation();
    const POIs = useSelector(selectMapPOIs)
    
    const onSearchBarBottomPress = () => {
        navigation.navigate("building-POIs-search");
    }
    
    return (
        <View style={{flex:1}}>
            <SearchBarButton onPress={onSearchBarBottomPress} placeholder={'Point Of Interest'}/>
            <BuildingsSearchListBottomDrawer POIs={POIs} onPOIPress={onPOIPress} />
        </View>
    )
}
export default POIsSearchPanel
