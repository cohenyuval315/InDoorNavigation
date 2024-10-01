import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import BuildingSearchItemBottomDrawer from "./BuildingSearchItemBottomDrawer";
const BuildingsSearchListBottomDrawer = ({buildings}) => { 
    return (
        <BottomSheetFlatList
            style={{
                flex:1,
            }}
            data={buildings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <BuildingSearchItemBottomDrawer
                    building={item} 
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

export default BuildingsSearchListBottomDrawer;