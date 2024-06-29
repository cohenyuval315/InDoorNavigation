import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../server/api-client';
import Status from '../status';
import { prepareBuildingsData } from "../../utils/building-data";


export const fetchBuildings = createAsyncThunk(
  'buildings/fetchBuildings', 
  async (state, {rejectWithValue}) => {
    const response = await client.getBuildings();
    
    if(response.ok){
      const result = await response.json()
      const data = result.data
      return data
    }else{
      return rejectWithValue("internal error");
    }
    
    
  },
)


const buildingsAdapter = createEntityAdapter({
  selectId: building => building.id, // Assuming each building has an 'id' property
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

const buildingsSlice = createSlice({
    name: 'buildings',
    initialState:  buildingsAdapter.getInitialState({
      error:null,
      status:Status.IDLE
    }),
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBuildings.pending, (state, action) => {
          state.status = Status.PENDING;
          state.error = null;
        })
        .addCase(fetchBuildings.fulfilled, (state, action) => {
          // buildingsAdapter.setAll(state,action.payload); make it one item 
          state.entities = prepareBuildingsData(action.payload)
          state.status = Status.SUCCEEDED;
        })
        .addCase(fetchBuildings.rejected, (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload;
          state.entities = null;
        })       
    }

  })


  export const selectBuilding = state => state.buildings;
  export const selectBuildingsStatus = state => state.buildings.status;
  export const selectBuildingsError = state => state.buildings.error;
  
  
  // export const selectBuildingsStatus = buildingsAdapter.getSelectors((state) => state.buildings.status);

  // export const selectAllBuildings = buildingsAdapter.getSelectors((state) => state.buildings);
  export const selectAllBuildings = state => state.buildings.entities;
  // export const selectBuildingById = (state, buildingId) =>
  // buildingsAdapter.getSelectors().selectById(state.buildings, buildingId);

  
  export const {} = buildingsSlice.actions;
  export default buildingsSlice.reducer;