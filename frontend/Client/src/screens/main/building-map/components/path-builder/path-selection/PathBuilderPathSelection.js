import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { useDispatch, useSelector } from "react-redux";
import { selectMapPOIs } from "../../../../../../app/map/map-slice";
import { resetActivePath, selectActivePath, setDestinationToActivePath } from "../../../../../../app/active/active-slice";
import { useState } from "react";

const PathBuilderPathSelection = ({POI,setPOI}) => {
    const POIs = useSelector(selectMapPOIs);
    const dropdownItems = POIs.map((POI) => {
        return {
            label:POI.details.title + " - F" + POI.floor,
            value:POI.id
        }
    })
    const dispatch = useDispatch();
    const activePath = useSelector(selectActivePath);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(POIs);   

    const onSetDestination = () => {
        try{
            if (POI){
                const POIData = POIs.filter((p) => p.id === POI)[0];
                dispatch(setDestinationToActivePath(POIData));
            }

        }catch(error){
            console.error("should never be here, POI");
        }
    }
    const onResetPath = () => {
        dispatch(resetActivePath());
    }

    return (
        <View>
            <DropDownPicker
                    listMode={"MODAL"}                    
                    open={open}
                    value={POI}
                    items={dropdownItems}
                    searchPlaceholder="search"
                    searchable
                    setOpen={setOpen}
                    setValue={setPOI}
                    setItems={setItems}
                    placeholder={activePath.length > 0 ? 'Choose a Stop.' : 'Choose A Destination'}
                />  
                {activePath && activePath.length === 0 ? (
                    <TouchableOpacity onPress={onSetDestination}  style={{
                        borderRadius:30,
                        backgroundColor:'pink',
                        padding:10,
                    }}>
                        <Text style={{
                            color:'black'
                        }}>
                            {"set as destination"}
                        </Text>
                    </TouchableOpacity>   
                ): (
                    <TouchableOpacity onPress={onResetPath}  style={{
                        borderRadius:30,
                        backgroundColor:'pink',
                        padding:10,
                    }}>
                        <Text style={{
                            color:'black'
                        }}>
                            {"Rest Path"}
                        </Text>
                    </TouchableOpacity>  
                )
                }
                
                        
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default PathBuilderPathSelection