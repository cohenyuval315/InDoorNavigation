import { TouchableOpacity } from "react-native";
import WarningButton from "../../../../../components/general/buttons/icons/warning";
import { useMessageModal } from "../../../../../contexts/MessageModalContext";
import { useSelector } from "react-redux";
import { selectMinFloor } from "../../../../../app/map/map-slice";

const BuildingMapWarningButton = ({
    userPosition,
    userFloor,
    selectedFloor
}) => {
    const {openMessage} = useMessageModal();
    const minFloor = useSelector(selectMinFloor);

    const getWarningText = () => {
        const warningText = !userPosition ? "no position yet..." : userFloor.current != null && userFloor.current !== selectedFloor + minFloor ? `You are on floor ${userFloor.current}` : "unknown"
        return warningText;
    }

    const getWarningColor = () => {
        const warningColor = !userPosition ? "red" : userFloor.current != null && userFloor.current !== selectedFloor + minFloor ? `yellow` : "blue"
        return warningColor;
    }

    const getIsDisplayWarning = () => {
        if (!userPosition){
            return true;
        }
        return false;
    }

    const getWarningTitle = () => {
        if (!userPosition){
            return "Error";
        }
        return "Warning"; 
    }

    const isDisplayWarning = getIsDisplayWarning();
    if(!isDisplayWarning){
        return null;
    }

    const warningText = getWarningText()
    const warningColor = getWarningColor();
    const warningTitle = getWarningTitle();


    return (

            <WarningButton
                text={warningText}
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

export default BuildingMapWarningButton