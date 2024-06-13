import { Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { setActiveBuilding } from "../../../../app/active/active-slice";


const BuildingSearchItem = ({building,onPress}) => {
    const dispatch = useDispatch();
    const handleOnBuildingSearchItemPress = () => {
        dispatch(setActiveBuilding(building));
        onPress && onPress()
    }

    const address = building.details.address;
    const {
        country,
        state,
        city,
        street,
        streetNumber,
        postalCode,        
    } = address;

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
                    {country}, {state}, {city}, {street} {streetNumber}, {postalCode}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default BuildingSearchItem;