import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const BackButton = ({onBackPress}) => {
    return (
        <TouchableOpacity 
            style={{
                justifyContent:'center',
                alignItems:'center',
                padding:10,
            }}
            onPress={onBackPress}
        >
            <Text>
                <Ionicons 
                    name={"arrow-back-circle"} 
                    color={"white"} 
                    size={40} 
                />
            </Text>
        </TouchableOpacity>
    )
}

export default BackButton