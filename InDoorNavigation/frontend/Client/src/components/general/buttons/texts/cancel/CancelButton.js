import { Text, TouchableOpacity } from 'react-native';
import ButtonBase from '../../ButtonBase';

const CancelButton = ({onPress}) => {
    return (
        <ButtonBase onButtonPress={onPress} >
            <Text>
                cancel
            </Text>
        </ButtonBase>
    )
}

export default CancelButton