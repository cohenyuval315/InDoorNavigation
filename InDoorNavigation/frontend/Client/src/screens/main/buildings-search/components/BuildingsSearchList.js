import {  View,FlatList } from "react-native"
import BuildingSearchItem from "./BuildingSearchItem"
const BuildingsSearchList = ({buildings,onPress}) => {
    return (
        <FlatList
            style={{
                flex:1,
            }}
            data={buildings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <BuildingSearchItem
                    building={item} 
                    onPress={onPress}
                />
            )}
            scrollEnabled
        />
    )
}

export default BuildingsSearchList;