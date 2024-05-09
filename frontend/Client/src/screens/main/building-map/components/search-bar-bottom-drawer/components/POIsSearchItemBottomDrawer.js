import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from "react-redux";
import { setActivePOI } from "../../../../../../app/active/active-slice";


const POIsSearchItemBottomDrawer = ({POI,onPOIPress}) => {
    const dispatch = useDispatch();
    const handleOnPOISearchItemPress = () => {
        dispatch(setActivePOI(POI));
        console.log('ye')
        onPOIPress && onPOIPress(POI);
    }
    return (
        <TouchableOpacity 
        onPress={handleOnPOISearchItemPress}
        style={{
            flex:1,
            borderColor:"lightgray",
            borderWidth:1,
            alignItems:"center",
            flexDirection:"row",
            width:"100%",
            padding:5,
        }}>
            <View style={{
                paddingLeft:"3%",
            }}>
                <Icon name={POI.icon} size={30} color="gray" />
            </View>
            <View style={{
                paddingLeft:"10%",
                paddingRight:"10%"
            }}>
                <Text style={{
                    fontSize:22,
                    color:"black",
                    fontWeight:"bold"
                }}>
                    {POI.details.title}
                </Text>
                <Text style={{
                    fontSize:16,
                    color:"black"
                }}>
                    F{POI.floor}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default POIsSearchItemBottomDrawer;