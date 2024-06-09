import { useEffect } from "react";
import { useConfirmationModal } from "../contexts/ConfirmationModalContext";
import AppPreLoading from "./AppPreLoading";
import { BackHandler } from "react-native";

const Application = () => {
    const {openConfirm} = useConfirmationModal();

    useEffect(() => {

    },[])


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
        <>
            <AppPreLoading />
        </>
    )
}

export default Application;