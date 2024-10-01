import { useEffect } from "react";
import { useConfirmationModal } from "../contexts/ConfirmationModalContext";
import { BackHandler } from "react-native";

import RootStackNavigator from "../navigation/RootStackNavigator";

const Application = () => {
    const {openConfirm} = useConfirmationModal();

    useEffect(() => {
        
        const backAction = () => {
            openConfirm(
                "Exit Application",
                "Are you sure you want to exit?",
                () => {
                    BackHandler.exitApp();
                },
                () => {
                    // Do nothing on cancel
                }
            );
            return true;
        };
        
        
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
      
        return () => backHandler.remove();
    }, [])


    return (
        <RootStackNavigator/>
    )
}

export default Application;