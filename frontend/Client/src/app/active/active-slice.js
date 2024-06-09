import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createSlice } from '@reduxjs/toolkit'
import Status from '../status';
import { UserIndoorPositionService } from "../../position/user-indoor-position";

const initialState = {
    error:null,
    status:Status.IDLE,
    activeBuilding:null,
    activePath: [],
    activePOI:null,
    activePathConfig: {
        inOrder:false,
        stairs:true,
        elevators:true,
        inOrderCheckpoints:[]
    }
}

function mergeAdjacentStops(activePath) {
    for (let i = 0; i < activePath.length - 1; i++) {
        const currentStop = activePath[i];
        const nextStop = activePath[i + 1];
        if (currentStop.id === nextStop.id) {
            // Merge stops if they have the same ID
            activePath.splice(i + 1, 1);
            // Decrement i to re-check the merged stop with the previous one
            i--;
        }
    }
}

const activeSlice = createSlice({
    name: 'active',
    initialState: initialState,
    reducers: {
        setConfigInOrder: (state, action) => {
            state.activePathConfig.inOrder = action.payload;
        },
        setConfigStairs: (state, action) => {
            state.activePathConfig.stairs = action.payload;
        },
        setConfigElevators: (state, action) => {
            state.activePathConfig.elevators = action.payload;
        },
        setConfigCheckpoints: (state, action) => {
            state.activePathConfig.inOrderCheckpoints = action.payload;
        },
        setActiveBuilding: (state, action) => {
            state.activeBuilding = action.payload;
            state.status = Status.SUCCEEDED
            if (action.payload){
                UserIndoorPositionService.getInstance().setBuildingBoundary(action.payload.geoArea)
            }
            
        },
        setActivePOI: (state, action) => {
            state.activePOI = action.payload;
        },
        setDestinationToActivePath: (state, action) => {
            const POI = action.payload;
            const pathPOI = {
                ...POI,
                pathConfig:{
                    lock:true,
                }
            }
            const newActivePath = state.activePath.filter((item)=>item.id !== POI.id);
            newActivePath.push(pathPOI)
            state.activePath = newActivePath;
        }, 
        changeDestinationToActivePath: (state, action) => {
            const newDestination = action.payload;
            state.activePath[state.activePath.length - 1] = newDestination;
        },        
        addStopToActivePath: (state, action) => {
            const { stop, index } = action.payload;
            const dest = state.activePath[state.activePath.length - 1]
            if (dest.id !== stop.id){
                const pathStop = {
                    ...stop,
                    pathConfig:{
                        lock:false,
                    }
                }
                state.activePath.splice(index + 1, 0, pathStop);
            }
        },
        toggleStopLockToActivePath: (state, action) => {
            const stopIndex = action.payload;
            if (stopIndex !== -1) {
                state.activePath[stopIndex].pathConfig.lock = !state.activePath[stopIndex].pathConfig.lock;
            }
        },
        removeStopToActivePath: (state, action) => {
            const index = action.payload;
            state.activePath.splice(index, 1);
        },
        swapStopsUpToActivePath: (state, action) => {
            const index = action.payload;
            if (index > 0 && state.activePath.length > index) {
                [state.activePath[index], state.activePath[index - 1]] = [state.activePath[index - 1], state.activePath[index]];
                // Merge adjacent stops after swapping
                mergeAdjacentStops(state.activePath);
            }
        },
        swapStopsDownToActivePath: (state, action) => {
            const index = action.payload;
            if (index < state.activePath.length - 1) {
                [state.activePath[index], state.activePath[index + 1]] = [state.activePath[index + 1], state.activePath[index]];
                // Merge adjacent stops after swapping
                mergeAdjacentStops(state.activePath);
            }
        },     
        resetActivePath: (state, action) => {
            state.activePath = []
        },  
        
    }
  })

  export const selectActiveBuilding = state => state.active.activeBuilding;
  
  export const selectActivePath = state => state.active.activePath;
  export const selectActivePathConfig = state => state.active.activePathConfig;
  export const selectActivePOI = state => state.active.activePOI;
  export const selectDestination = state => state.active.activePath[state.active.activePath.length - 1];

  export const { setActiveBuilding,setActivePOI,
    setDestinationToActivePath,
    changeDestinationToActivePath,
    addStopToActivePath,
    removeStopToActivePath,
    swapStopsUpToActivePath,
    swapStopsDownToActivePath,
    resetActivePath,
    setConfigInOrder,
    setConfigStairs,
    setConfigElevators,
    setConfigCheckpoints,
    toggleStopLockToActivePath
 } = activeSlice.actions;
  export default activeSlice.reducer;