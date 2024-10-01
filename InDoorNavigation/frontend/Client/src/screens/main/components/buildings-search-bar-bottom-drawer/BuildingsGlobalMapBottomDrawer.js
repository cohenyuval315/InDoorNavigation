import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuildingsSearchPanel from "./components/BuildingsSearchPanel";
import { selectActiveBuilding, setActiveBuilding } from "../../../../app/active/active-slice";
import BuildingCard from "../../../../components/features/building/card/BuildingCard";
import BottomDrawer from "../../../../layouts/bottom-drawer";
import { SearchBarButton } from "../../../../components/general/buttons";

const snapPoints = ["15%","50%"]
const BuildingsGlobalMapBottomDrawer = () => {

    const dispatch = useDispatch();
    const selectedBuilding = useSelector(selectActiveBuilding);
    const bottomSheetRef =  useRef()
    const [isSearchVisible,setIsSearchVisible] = useState(false);


    const collapseBottomDrawer = () => {
        bottomSheetRef.current?.collapse();
    }    

    useEffect(()=>{
        if(selectedBuilding !== null){
            bottomSheetRef.current?.snapToIndex(1);
        }
    },[selectedBuilding])

    const handleSheetChanges = useCallback((index) => {
        if(index === 1){
            setIsSearchVisible(true)
        }else{
            setIsSearchVisible(false)
            dispatch(setActiveBuilding(null));
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
          }
          return false;
          
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
    
      }, [isSearchVisible]);  
      
  
    
    return (
            <BottomDrawer
                onSheetChange={handleSheetChanges}
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef}
            >
                    {selectedBuilding !== null ? (
                        <BuildingCard building={selectedBuilding} /> 
                    ): (
                        isSearchVisible ? (
                            <BuildingsSearchPanel />
                        ) : (
                            <SearchBarButton onPress={onSearchBarButtonPress} />
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
  
export default BuildingsGlobalMapBottomDrawer;