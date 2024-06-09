import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonBase from "./ButtonBase";

const ButtonTarget = ({onButtonPress}) => {
    return (
        <ButtonBase onButtonPress={onButtonPress}>
            <MaterialCommunityIcons name="target" color={"black"} size={30} />
        </ButtonBase>
    )
}

export default ButtonTarget;