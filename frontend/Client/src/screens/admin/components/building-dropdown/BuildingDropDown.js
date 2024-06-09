import { useSelector } from "react-redux";
import { selectAllBuildings } from "../../../../app/building/buildings-slice";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";

const BuildingDropDown = ({val,onChange}) => {
    const buildings = useSelector(selectAllBuildings);
    const [open,setOpen] = useState(false);
    const buildingsDropdownItems = buildings.map((item) => {
        return {
            label:item.details.title,
            value:item.id
        }
    })
    const [value,setValue] = useState(!val ? val : buildingsDropdownItems[0].id);

    const handleSetValue = (value) => {
        onChange(value);
        setValue(value)
    }

    useEffect(() => {
        handleSetValue(buildingsDropdownItems[0].value)
    },[])

    return (
        <DropDownPicker
            listMode="MODAL"
            items={buildingsDropdownItems}
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={handleSetValue}

        />
    )
}
export default BuildingDropDown;