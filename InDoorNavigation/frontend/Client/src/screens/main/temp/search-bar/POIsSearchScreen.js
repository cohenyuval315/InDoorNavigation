import { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import { selectAllBuildings } from "../../../../app/building/buildings-slice";
import BuildingSearchItem from "./BuildingSearchItem";
import NoBuildings from "./NoBuildings";

const POIsSearchScreen = ({filteredBuildings,onBuildingSearchItemPress}) => {
    if (filteredBuildings.length === 0) {
        return <NoBuildings />
    }
    return (
        <SafeAreaView style={{
            flex:1,
            width:"100%",
            // backgroundColor:"pink"
        }}>
            <FlatList
                style={{
                    flex:1,
                    width:"100%",
                    height:"100%"
                }}
                data={filteredBuildings}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <BuildingSearchItem 
                        building={item} 
                        onBuildingSearchItemPress={onBuildingSearchItemPress}
                    />
                )}
                scrollEnabled={true}
            />
        </SafeAreaView>
    )
}

export default POIsSearchScreen;