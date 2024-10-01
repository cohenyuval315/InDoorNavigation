import { Text, View } from "react-native"

const FallBackComponent = () => {
    return (
        <View>
            <Text style={{
                color:"black"
            }}>
                loading...
            </Text>
        </View>
    )
}

export default FallBackComponent