import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../services/api-client';
import Status from '../status';


const fetchBuildingByMapId = createAsyncThunk(
  'map/fetchBuildingMapById', 
  async (buildingId, thunkAPI) => {
    const response = await client.getBuildingMap(buildingId)
    return response.data
  },
)


const mapInitialState = {
  data:null,
  error:null,
  status:Status.IDLE
}

const mapSlice = createSlice({
    name: 'map',
    initialState:  mapInitialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBuildingByMapId.pending, (state, action) => {
          state.status = Status.PENDING;
          state.messasge = null;
          state.error = null;
        })
        .addCase(fetchBuildingByMapId.fulfilled, (state, action) => {
          const data = action.payload;
          state.data = data;
          state.status = Status.SUCCEEDED;
        })
        .addCase(fetchBuildingByMapId.rejected, (state, action) => {
          state.data = null;
          state.status = Status.FAILED;
          state.error = action.payload.error;
        })       
    }

  })


  export const selectMap = state => state.data;
  export const selectMapStatus = state => state.status;
  export const selectMapError = state => state.error;

  export const {} = mapSlice.actions;
  export default mapSlice.reducer;