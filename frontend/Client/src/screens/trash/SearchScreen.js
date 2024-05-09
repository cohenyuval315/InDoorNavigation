import { Text, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { SharedTransition,withTiming } from 'react-native-reanimated';

const SearchScreen = () => {
    return (
        <View style={{
            flex:1,
        }}>
            <Animated.View>
                <TextInput placeholder="hello" placeholderTextColor={"black"}/>
            </Animated.View>
        </View>
    )

}

export default SearchScreen;