import BottomSheet, { BottomSheetView,BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from "react-native";

const BottomDrawer = ({bottomSheetRef,snapPoints,onSheetChange,children}) => {
    return (
        <BottomSheet
            ref={bottomSheetRef}
            onChange={onSheetChange}
            snapPoints={snapPoints}
            style={styles.container}
            contentHeight={"100%"}
            containerStyle={styles.containerStyles}
        >
            <BottomSheetView style={styles.contentContainer}>
                {children}
            </BottomSheetView>
        </BottomSheet>  
    )
}

const styles = StyleSheet.create({
    container: {
      zIndex:999999,
    },
    contentContainer: {
      zIndex:999999,
    },
    containerStyles:{
        backgroundColor:"transparent",
        height:"100%",
        zIndex:999999,
        pointerEvents:"box-none"
    }

});


export default BottomDrawer