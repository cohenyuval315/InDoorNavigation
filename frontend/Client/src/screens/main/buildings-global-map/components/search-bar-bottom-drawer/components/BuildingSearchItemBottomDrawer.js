import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { setActiveBuilding } from "../../../../../../app/active/active-slice";


const BuildingSearchItemBottomDrawer = ({building}) => {
    const dispatch = useDispatch();
    const handleOnBuildingSearchItemPress = () => {
        dispatch(setActiveBuilding(building));
    }
    return (
        <TouchableOpacity 
        onPress={handleOnBuildingSearchItemPress}
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
                <Icon name={building.icon} size={30} color="gray" />
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
                    {building.details.title}
                </Text>
                <Text style={{
                    fontSize:16,
                    color:"black"
                }}>
                    {building.details.city}, {building.details.address}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default BuildingSearchItemBottomDrawer;