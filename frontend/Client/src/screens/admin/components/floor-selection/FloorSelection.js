import { useSelector } from "react-redux";
import { selectMinFloor, selectNumberOfFloors } from "../../../../app/map/map-slice";
import {  useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const FloorSelection = ({initialFloor,onChange}) => {
    const numFloors = useSelector(selectNumberOfFloors);
    const minFloor = useSelector(selectMinFloor);
    const floorsDropdownItems = Array.from({length:numFloors}).map((_,index)=>{
        return {
            label: `floor ${index + minFloor}`,
            value: index
        }
    })
    const [floor, setFloor] = useState(initialFloor);
    const [open, setOpen] = useState(false);

    const onFloorChange = (val) => {
        onChange(val)
        setFloor(val);
    }
    useEffect(() => {

        onFloorChange(floorsDropdownItems[0].value)
    },[])
    
    return (
        <DropDownPicker
            listMode="MODAL"
            items={floorsDropdownItems}
            open={open}
            setOpen={setOpen}
            value={floor}
            setValue={onFloorChange}
        />
    )
}

export default FloorSelection;