import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { selectMapPOIs } from "../../../../app/map/map-slice";

const POIsDropDown = ({val,onChange}) => {
    const POIs = useSelector(selectMapPOIs);
    const [open,setOpen] = useState(false);
    const POIsItems = POIs.map((item) => {
        return {
            label:`${item.details.title} (floor ${item.floor})`,
            value:item.id
        }
    })
    const POIsDropdownItems = [{
        label: "None",
        value: null,
    },...POIsItems]
    const [value,setValue] = useState(val);

    const handleSetValue = (value) => {
        console.log(value)
        onChange(value);
        setValue(value)
    }

    return (
        <DropDownPicker
            listMode="MODAL"
            items={POIsDropdownItems}
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={handleSetValue}
            placeholder="None"

        />
    )
}
export default POIsDropDown;