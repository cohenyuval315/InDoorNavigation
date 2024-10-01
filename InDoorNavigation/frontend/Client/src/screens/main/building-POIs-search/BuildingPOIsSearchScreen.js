import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "../../../components/general/search-bar";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NoDataFound from "../../../components/general/no-data";
import BuildingPOIsSearchList from "./components/BuildingPOIsSearchList";
import { selectMapPOIs } from "../../../app/map/map-slice";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

    const goBack = () => {
        navigation.navigate('building-map');
    }
    const onPOIPress = () => {
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
            <View style={{
                marginLeft:50,
                padding:5,
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