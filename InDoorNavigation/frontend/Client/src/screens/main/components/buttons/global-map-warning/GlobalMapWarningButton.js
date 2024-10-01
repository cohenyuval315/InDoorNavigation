import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMessageModal } from "../../../../../contexts/MessageModalContext";
import Config from "../../../../../config/Config";
import WarningButton from "../../../../../components/general/buttons/icons/warning";

const GlobalMapWarningButton = ({userGeoPosition}) => {
    const {openMessage} = useMessageModal();

    // userGeoPosition
    const getIsDisplayWarning = () => {
        // console.log("reached0",userGeoPosition)
        if(!userGeoPosition){
            return true;
        }
        if(userGeoPosition.accuracy >= Config.LOW_ACCURACY_THRESHOLD_METERS){
            return true;
        }
        return false;
    }
    const showWarning = getIsDisplayWarning();
    if (!showWarning){
        return null;
    }

    const getWarningColor = () => {
        if(!userGeoPosition){
            return "red";
        }
        if(userGeoPosition.accuracy >= Config.LOW_ACCURACY_THRESHOLD_METERS){
            return "yellow";
        }
        return "red";
    }

    const getWarningText = () => {
        if(!userGeoPosition){
            return "No GPS reception";
        }
        if(userGeoPosition.accuracy >= Config.LOW_ACCURACY_THRESHOLD_METERS){
            return "Low Accuracy";
        }
        return "";   
    }

    const getWarningTitle = () => {
        if(!userGeoPosition){
            return "Error";
        }
        return "Warning"
    }

    
    const warningText = getWarningText();
    const warningColor = getWarningColor();
    const warningTitle = getWarningTitle();

    return (
        <WarningButton
            color={warningColor}
            onPress={() => openMessage(
                warningTitle,
                warningText,
                ()=>{},
                ()=>{},
                null,
                warningColor
            )}

        />
    )
}

export default GlobalMapWarningButton;