import { TouchableOpacity, View } from "react-native";

const BuildingNavigationScreen = () => {
    return (
        <View style={{
            flex:1,
        }}>
            <TouchableOpacity onPress={onPress}>
                <Text style={{
                    fontSize:30,
                }}>
                    Building Navigation
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BuildingNavigationScreen;