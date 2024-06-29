import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../server/api-client';
import Status from '../status';


export const fetchNavigationPath = createAsyncThunk(
  'navigation/fetchNavigationPath', 
  async (arg,{rejectWithValue}) => {
    const {buildingId,
          destinationPOI,
          currentLocation,
          accessability} = arg;
          const destinationPOIId = destinationPOI.id
    const response = await client.getNavigationRoute(buildingId ,destinationPOIId,
        currentLocation,
        accessability)
    if (response.ok){
        const results = await response.json();
        return results.data;
    }else{
      return rejectWithValue("error")
    }
  },
)


const navigationInitialState = {
  error:null,
  pathsFloors:null,
  distance:null,
  timeLength:null,
  status:Status.IDLE,
  destinationPOI:null,
  userPosition:null,
  accessibility:{
    stairs:true
  },
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState:  navigationInitialState,
    reducers: { 
      setAccessibility: (state, action) => {
        state.accessibility = action.payload;
      },
      setUserPosition: (state, action) => {
          state.userPosition = action.payload;
        },
        setDestinationPOI: (state, action) => {
            state.destinationPOI = action.payload;
        },
        resetPaths: (state,action) => {
          state.timeLength = null;
          state.distance = null;
          state.pathsFloors = null;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchNavigationPath.pending, (state, action) => {
          state.status = Status.PENDING;
          state.error = null;
        })
        .addCase(fetchNavigationPath.rejected, (state, action) => {
            state.status = Status.FAILED;
            state.error = action.payload;
          })

        .addCase(fetchNavigationPath.fulfilled, (state, action) => {
          state.pathsFloors = action.payload.pathsFloors
          state.distance = action.payload.distance
          state.timeLength = action.payload.timeLength
          state.status = Status.SUCCEEDED;       
          state.error = null;   
        })       
    }

  })

export const selectNavigationPathsSVGs = state => state.navigation.pathsFloors;
export const selectNavigationPathDistance = state => state.navigation.distance;
export const selectNavigationPathTimeLength = state => state.navigation.timeLength;
export const selectNavigationError = state => state.navigation.error;
export const selectNavigationStatus = state => state.navigation.status;
export const selectNavigationDestinationPOI = state => state.navigation.destinationPOI
export const selectUserPosition = state => state.navigation.userPosition
export const selectUserAccessibility = state => state.navigation.accessibility;

  // export const selectPOIById = POIId => state => state.map.POIs.find(POI => POI.id === POIId);
  export const {setDestinationPOI,resetPaths,setUserPosition} = navigationSlice.actions;
  export default navigationSlice.reducer;
  