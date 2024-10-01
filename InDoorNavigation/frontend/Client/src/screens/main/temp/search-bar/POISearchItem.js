import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BuildingType } from "../../../../constants/constants";

const BuildingSearchItem = ({building, onBuildingSearchItemPress}) => {
    const buildingDetails = building.details;
    const buildingIcon = () => {
        let iconName = "";
        switch(building.buildingType){
            case BuildingType.COLLEGE:{
                return "university";
            }
            default:{
                return "building";
            }
        }
    }

    const handleOnBuildingSearchItemPress = () => {
        onBuildingSearchItemPress(building)
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
                <Icon name={buildingIcon()} size={30} color="gray" />
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
                    {buildingDetails.title}
                </Text>
                <Text style={{
                    fontSize:16,
                    color:"black"
                }}>
                    {buildingDetails.city}, {buildingDetails.address}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default BuildingSearchItem;