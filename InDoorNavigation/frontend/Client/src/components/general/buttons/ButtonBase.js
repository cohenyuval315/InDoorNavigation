import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";


const ButtonBase = ({
    children,   
    onButtonPress,
    disabled=false,
    activeOpacity=0.2, 
    styles={}
}) => {
    const {theme} = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onButtonPress || null}
            disabled={disabled}
            style={{
                ...styles
            }}>
            {children}
        </TouchableOpacity>  
    )
}

export default ButtonBase;