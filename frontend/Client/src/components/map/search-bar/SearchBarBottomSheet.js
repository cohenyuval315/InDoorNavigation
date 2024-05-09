import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import SearchBarDisplay from "./SearchBarDisplay";
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBarBottomSheet = (props) => {
    const [isSearchFullyOpened,setIsSearchFullyOpened] = useState(false);

    const {
        items,
        snapPoints,
        bottomSheetRef,
        selectedItem,
        ItemComponent,
        isLock,
        SearchScreen
    } = props;
    

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

    const onSearchItemPress = () => {

    }

    useEffect(()=>{
        if(selectedItem !== null){
            handleSnapPress(1)
        }
    },[selectedItem])

    return (
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={snapPoints}
                style={styles.container}
                contentHeight={"100%"}
            >
                <BottomSheetView style={styles.contentContainer}>
                    {selectedItem !== null ? (
                        <ItemComponent {...props}/>
                    ): (
                        <SearchBarDisplay 
                            items={items}
                            isSearchFullyOpened={isSearchFullyOpened}
                            onCollapse={collapseBottomDrawer}
                            onIsSearchFullyOpenedChange={onIsSearchFullyOpenedChange}
                            onSearchItemPress={onSearchItemPress}
                            SearchScreen={SearchScreen}
                            

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