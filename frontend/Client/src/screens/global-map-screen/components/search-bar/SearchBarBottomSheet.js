import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import SearchBarDisplay from "./SearchBarDisplay";
import BuildingDisplay from "./BuildingDisplay";


const SearchBarBottomSheet = ({
    bottomSheetRef,
    selectedBuilding,
    onBuildingSearchItemPress,
    isLock,
    onBuildingDeSelect,
    directionsAvailable,
    onDirectionPress,
    noDirectionsMessage,
    onBuildingMapPress}) => {
    const [isSearchFullyOpened,setIsSearchFullyOpened] = useState(false);

    const snapPoints = ["15%","55%"];

    const handleSheetChanges = useCallback((index) => {
        if(index === 0){
            setIsSearchFullyOpened(false);
        }else if (index === 1) {
            setIsSearchFullyOpened(true);
        }
        if(isLock){
            handleSnapPress(1);
        }
    }, [isLock]);    

    const collapseBottomDrawer = () => {
        bottomSheetRef.current?.collapse();
    }
    const onIsSearchFullyOpenedChange = (value) => {
        if(value instanceof Boolean){
            setIsSearchFullyOpened(value)
        }
    }
    const handleSnapPress = useCallback(index => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);


    useEffect(()=>{
        if(selectedBuilding !== null){
            handleSnapPress(1)
        }
    },[selectedBuilding])


    return (
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={snapPoints}
                style={styles.container}
                contentHeight={"100%"}
            >
                <BottomSheetView style={styles.contentContainer}>
                    {selectedBuilding !== null ? (
                        <BuildingDisplay 
                            directionsAvailable={directionsAvailable}
                            onDirectionPress={onDirectionPress}
                            building={selectedBuilding}
                            noDirectionsMessage={noDirectionsMessage}
                            onBuildingDeSelect={onBuildingDeSelect}
                            onBuildingMapPress={onBuildingMapPress}
                        />
                    ): (
                        <SearchBarDisplay 
                            isSearchFullyOpened={isSearchFullyOpened}
                            onCollapse={collapseBottomDrawer}
                            onIsSearchFullyOpenedChange={onIsSearchFullyOpenedChange}
                            onBuildingSearchItemPress={onBuildingSearchItemPress}
                        />
                    )}

                </BottomSheetView>
            </BottomSheet>    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:0,
    },
    contentContainer: {
      flex: 1,
      height:"100%"
    },


  });
  
export default SearchBarBottomSheet;