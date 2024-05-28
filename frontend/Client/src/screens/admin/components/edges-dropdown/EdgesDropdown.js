import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { selectEdges, selectNodes } from "../../../../app/admin/admin-slice";

const EdgesDropdown = ({val,onChange}) => {
    const edges = useSelector(selectEdges);
    const [open,setOpen] = useState(false);
    const edgesItems = edges.map((item,index) => {
        return {
            label:`edge_${index}`,
            value:`${item.nodeA}${item.nodeB}`
        }
    })
    const edgesDropdownItems = [{
        label: "None",
        value: null,
    },...edgesItems]
    const [value,setValue] = useState(val);

    const handleSetValue = (value) => {
        onChange(value);
        setValue(value)
    }

    return (
        <DropDownPicker
            listMode="MODAL"
            items={edgesDropdownItems}
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={handleSetValue}
            placeholder="None"

        />
    )
}
export default EdgesDropdown;