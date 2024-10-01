import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { selectEdges, selectNodes } from "../../../../app/admin/admin-slice";

const NodesDropdown = ({val,onChange}) => {
    const nodes = useSelector(selectNodes);
    const edges = useSelector(selectEdges);
    const [open,setOpen] = useState(false);
    const nodesItems = nodes.map((item,index) => {
        return {
            label:`(floor: ${item.mapCoordinates.floor}, x:${item.mapCoordinates.x} , y: ${item.mapCoordinates.y}) - ${item.title}`,
            value:item.id
        }
    })
    const [nodesDropdownItems,setNodesDropdownItems] = useState([{
        label: "None",
        value: null,
    },...nodesItems])
    
    const [value,setValue] = useState(val);

    // useEffect(() => {
    //     if(val){
    //         setNodesDropdownItems([{
    //             label: "None",
    //             value: null,
    //         },...nodesItems])
    //         // here filter
    //     }else{
    //         setNodesDropdownItems([{
    //             label: "None",
    //             value: null,
    //         },...nodesItems])
    //     }

    // },[val])

    const handleSetValue = (value) => {
        console.log(value)
        onChange(value);
        setValue(value)
    }

    return (
        <DropDownPicker
            listMode="MODAL"
            items={nodesDropdownItems}
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={handleSetValue}
            placeholder="None"

        />
    )
}
export default NodesDropdown;