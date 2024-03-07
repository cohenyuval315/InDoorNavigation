import { FlatList, Text, View } from "react-native"
import { useAppData } from "../contexts/AppDataContext"
import BuildingCard from "../components/building/BuildingCard";
import { hideGlobalModal, showGlobalModal } from "../layouts/globalmodal/GlobalModal";
import { generateUUID } from "../../utils";
import BuildingRedirectPicker from "../components/building/BuildingRedirectPicker";
import { openMap } from "../services/map";

const onMapDirectionPress = async (building) => {
    await openMap(building.details.address,building.details.city,building.details.zipCode);
}

const onMapRedirectPress = async () => {
    
}

const handleOnBuildingPress = (building) => {
    const uuid = generateUUID();
    const modalKey = `${building.details.address}${uuid}`;
    const handleOnMapRedirectPress = async () => {
        hideGlobalModal(modalKey);
        await onMapRedirectPress()

    }
    showGlobalModal({
        skipQueue:false,
        hideClose:false,
        backgroundColor:'black',
        Component:()=>
            <BuildingRedirectPicker 
                building={building} 
                onMapRedirectPress={handleOnMapRedirectPress}
                onBuildingDirectionPress={()=>onMapDirectionPress(building)}
            />,
        modalKey:modalKey
    })
}

const BuildingsPickerScreen = () => {
    const {buildings} = useAppData();
    return (
        <View style={{
            flex:1,
        }}>
            <FlatList
                data={buildings}
                renderItem={({item}) => {
                    return (
                        <BuildingCard key={item.id} building={item} onPress={handleOnBuildingPress}/>
                    )
                }}
            />
        </View>
    )
}

export default BuildingsPickerScreen;