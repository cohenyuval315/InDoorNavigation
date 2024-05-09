import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import POIsSearchItemBottomDrawer from "./POIsSearchItemBottomDrawer";
const POisSearchListBottomDrawer = ({POIs,onPOIPress}) => { 
    return (
        <BottomSheetFlatList
            style={{
                flex:1,
            }}
            data={POIs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <POIsSearchItemBottomDrawer
                    POI={item} 
                    onPOIPress={onPOIPress}
                />
            )}
            contentContainerStyle={{
                flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled
        />

    )
}

export default POisSearchListBottomDrawer;