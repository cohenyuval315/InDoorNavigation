import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DropdownSelector from '../../../general/dropdown-selector';
import { selectMinFloor } from '../../../../app/map/map-slice';



const FloorLevelSelector = ({
    floors,
    selectedFloor,
    onFloorChange,
}) => {

    const minFloor= useSelector(selectMinFloor)
    const label = `F ${selectedFloor + minFloor}`


    return (
        <DropdownSelector
            options={floors}
            onChange={onFloorChange}
            selectedText={label}
        />
    );
};


export default FloorLevelSelector;
