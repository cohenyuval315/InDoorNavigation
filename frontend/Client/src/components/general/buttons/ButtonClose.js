import { Text, TouchableOpacity } from "react-native"
import { useTheme } from "../../../../contexts/ThemeContext"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ButtonBase from "./ButtonBase"


const ButtonClose = ({onButtonPress}) => {
    return (
        <ButtonBase onButtonPress={onButtonPress}> 
            <MaterialCommunityIcons name="close" size={24} color="white" />
        </ButtonBase>
    )
}

export default ButtonClose;