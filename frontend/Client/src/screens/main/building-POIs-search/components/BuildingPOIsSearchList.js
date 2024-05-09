import { FlatList } from "react-native";
import BuildingPOISearchItem from "./BuildingPOISearchItem";

const BuildingPOIsSearchList = ({POIs,onPress}) => {
    return (
        <FlatList
            style={{
                flex:1,
            }}
            data={POIs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <BuildingPOISearchItem
                    POI={item} 
                    onPress={onPress}
                />
            )}
            scrollEnabled
        />
    )
}

export default BuildingPOIsSearchList;