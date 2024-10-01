import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonBase from '../../ButtonBase';

const BackButton = ({onBackPress}) => {

    return (
        <ButtonBase onButtonPress={onBackPress} >
            <Text>
                <Icon 
                    name={"arrow-back-circle"} 
                    color={"white"} 
                    size={40} 
                />
            </Text>
        </ButtonBase>
    )
}

export default BackButton