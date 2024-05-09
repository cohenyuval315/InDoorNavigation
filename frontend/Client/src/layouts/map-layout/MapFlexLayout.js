import { View } from "react-native";

const MapFlexLayout = ({children}) => {
    return (
        <View style={{
            flex:1
        }}>
            {children}
        </View>
    )

}
export default  MapFlexLayout;