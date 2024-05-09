import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const ContractComponent = ({onAccept,onDeny}) => {
    return (
        <View>
            <ScrollView>

            </ScrollView>
            <View>
                <TouchableOpacity 
                    onPress={onAccept}
                    >
                    <Text>
                        accept
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDeny}>
                    <Text>
                        deny
                    </Text>
                </TouchableOpacity>            
            </View>
        </View>
    )
}

export default ContractComponent;