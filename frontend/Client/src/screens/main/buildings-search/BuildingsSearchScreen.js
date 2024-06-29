import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "../../../components/general/search-bar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectAllBuildings } from "../../../app/building/buildings-slice";
import BuildingsSearchList from "./components/BuildingsSearchList";
import NoDataFound from "../../../components/general/no-data";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    const goBack = () => {
        navigation.navigate('buildings-global-map');
    }

    const onBuildingPress = () => {
        goBack();
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            goBack
        );
      
        return () => backHandler.remove();
    }, [])

    return (
        <View style={{
            flex:1,
        }}>
            <TouchableOpacity onPress={goBack} style={{
                position:"absolute",
                bottom:"5%",
                right:"5%",
                zIndex:999,
                borderRadius:30,
                backgroundColor:'rgba(0, 0, 0, 0.6)',
            }}>
                <Text>
                    <MaterialCommunityIcons name="arrow-left-thick" color={"lightgray"} size={50} />
                </Text>
            </TouchableOpacity>
            <View>
                <SearchBar value={value} onChangeText={onChangeText} />
                
            </View>
            
            {filteredBuildings.length === 0 ? (
                <NoDataFound />
            ) : (
                <BuildingsSearchList buildings={filteredBuildings} onPress={onBuildingPress} />
            )} 
        </View>
    )
}
export default BuildingsSearchScreen;