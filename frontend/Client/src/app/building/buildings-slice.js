import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../services/api-client';
import Status from '../status';


export const fetchBuildings = createAsyncThunk(
  'map/fetchBuildings', 
  async (state, thunkAPI) => {
    const response = await client.getBuildings();
    console.log(response.data)
    return response.data
    
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
          buildingsAdapter.setAll(state,action.payload);
          state.status = Status.SUCCEEDED;
        })
        .addCase(fetchBuildings.rejected, (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload.error;
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