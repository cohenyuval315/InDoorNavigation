import { View } from "react-native";
import SearchBar from "../../../components/general/search-bar";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NoDataFound from "../../../components/general/no-data";
import BuildingPOIsSearchList from "./components/BuildingPOIsSearchList";
import { selectMapPOIs } from "../../../app/map/map-slice";

const BuildingPOIsSearchScreen = memo((props) => {
    const navigation = useNavigation();
    const POIs = useSelector(selectMapPOIs)
    const [filteredPOIs,setFilteredPOIs] = useState(POIs);
    const [value,setValue] = useState('')
    const onChangeText = (text) => {
        setValue(text)
        const filtered = POIs.filter(POI =>
            POI.details.title.toLowerCase().includes(text.toLowerCase())
        );        
        setFilteredPOIs(filtered);
    }

    const onPOIPress = () => {
        navigation.navigate('building-map');
    }
    return (
        <View style={{
            flex:1,
            marginTop:10,
        }}>
            <View style={{
                marginBottom:10,
            }}>
            <SearchBar value={value} onChangeText={onChangeText} placeholder={'Point Of Interest'} />
            </View>
            {filteredPOIs.length === 0 ? (
                <NoDataFound />
            ) : (
                <BuildingPOIsSearchList POIs={filteredPOIs} onPress={onPOIPress} />
            )} 
        </View>
    )
})
export default BuildingPOIsSearchScreen;