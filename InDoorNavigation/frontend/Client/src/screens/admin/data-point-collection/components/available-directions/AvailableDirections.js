import DropDownPicker from "react-native-dropdown-picker";
import { Direction } from "../../../../../constants/enums";
import { useState } from "react";

const AvailableDirections = ({val,onChange}) => {
    const [open,setOpen] = useState(false);
    const directions = Object.values(Direction);
    const directionsDropdownItems = directions.map((d) => {
        return {
            label:d,
            value:d,
        }
    })
    const [value,setValue] = useState(val);
    const onSetValue = (value) => {
        onChange(value)
        setValue(value);
    }

    return (
        <DropDownPicker
            listMode="MODAL"
            open={open}
            setOpen={setOpen}
            items={directionsDropdownItems}
            value={value}
            setValue={onSetValue}
            multiple
            placeholder="available directions"
            
        />
    )
}

export default AvailableDirections;