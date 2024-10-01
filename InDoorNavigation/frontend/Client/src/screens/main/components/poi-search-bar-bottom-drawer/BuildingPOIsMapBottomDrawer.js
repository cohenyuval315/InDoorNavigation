import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BottomDrawer from "../../../../layouts/bottom-drawer";
import POIsSearchPanel from "./components/POIsSearchPanel";
import BuildingPOICard from "../../../../components/features/poi/card/BuildingPOICard";
import { SearchBarButton } from "../../../../components/general/buttons";
import { selectActivePOI, setActivePOI } from "../../../../app/active/active-slice";

const snapPoints = ["15%","50%"];

const BuildingPOIsMapBottomDrawer = () => {
    const dispatch = useDispatch();
    const selectedPOI = useSelector(selectActivePOI);
    const bottomSheetRef =  useRef()
    const [isSearchVisible,setIsSearchVisible] = useState(false);

    const onPOIPress = (POI) => {

    }
    const onPOIClose = () => {
        bottomSheetRef.current?.snapToIndex(0);
    }

    const collapseBottomDrawer = () => {
        bottomSheetRef.current?.collapse();
    }    

    useEffect(()=>{
        if( selectedPOI !== null){
            bottomSheetRef.current?.snapToIndex(1);
        }
    },[selectedPOI])

    const handleSheetChanges = useCallback((index) => {
        if(index === 1){
            setIsSearchVisible(true)
        }else{
            setIsSearchVisible(false)
            // dispatch(setActivePOI(null));
        }
    }, []);
    
    const onSearchBarButtonPress = () => {
        bottomSheetRef.current?.snapToIndex(1);
    }

    useEffect(() => {
        const backAction = () => {
          if (isSearchVisible){
            collapseBottomDrawer();
            return true;
          }else{
            if(selectedPOI != null){
                dispatch(setActivePOI(null));
                return true;
            }
          }
          return false;
          
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
    
      }, [isSearchVisible,selectedPOI]);  
      
      

  
    return (
            <BottomDrawer
                onSheetChange={handleSheetChanges}
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef}
            >
                    {selectedPOI !== null ? (
                        <BuildingPOICard POI={selectedPOI} onClose={onPOIClose}  /> 
                    ): (
                        isSearchVisible ? (
                            <POIsSearchPanel onPOIPress={onPOIPress} />
                        ) : (
                            <SearchBarButton onPress={onSearchBarButtonPress} placeholder={'Point Of Interest'} />
                        )
                        
                    )}
            </BottomDrawer>

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
  
export default BuildingPOIsMapBottomDrawer;