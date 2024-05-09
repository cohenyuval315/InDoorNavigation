import { View } from "react-native";
import SearchBar from "../../../components/general/search-bar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectAllBuildings } from "../../../app/building/buildings-slice";
import BuildingsSearchList from "./components/BuildingsSearchList";
import NoDataFound from "../../../components/general/no-data";

const BuildingsSearchScreen = () => {
    const navigation = useNavigation();
    const buildings = useSelector(selectAllBuildings)
    const [filteredBuildings,setFilteredBuildings] = useState(buildings);
    const [value,setValue] = useState('')
    const onChangeText = (text) => {
        setValue(text)
        const filtered = buildings.filter(building =>
            building.details.title.toLowerCase().includes(text.toLowerCase())
        );        
        setFilteredBuildings(filtered);
    }

    const onBuildingPress = () => {
        navigation.navigate('buildings-global-map');
    }
    return (
        <View style={{
            flex:1,
        }}>
            <SearchBar value={value} onChangeText={onChangeText} />
            {filteredBuildings.length === 0 ? (
                <NoDataFound />
            ) : (
                <BuildingsSearchList buildings={filteredBuildings} onPress={onBuildingPress} />
            )} 
        </View>
    )
}
export default BuildingsSearchScreen;