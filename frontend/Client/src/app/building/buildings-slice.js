import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../services/api-client';
import Status from '../status';


const fetchBuildings = createAsyncThunk(
  'map/fetchBuildings', 
  async (state, thunkAPI) => {
    const response = await client.getBuildings();
    return response.data
  },
)

const buildingsAdapter = createEntityAdapter({
    error:null,
    status:Status.IDLE
})

const buildingsSlice = createSlice({
    name: 'buildings',
    initialState:  buildingsAdapter.getInitialState(),
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBuildings.pending, (state, action) => {
          state.status = Status.PENDING;
          state.messasge = null;
          state.error = null;
        })
        .addCase(fetchBuildings.fulfilled, (state, action) => {
          const data = action.payload;
          state.data = data;
          state.status = Status.SUCCEEDED;
        })
        .addCase(fetchBuildings.rejected, (state, action) => {
          state.data = null;
          state.status = Status.FAILED;
          state.error = action.payload.error;
        })       
    }

  })


  export const selectBuildings = state => state.data;
  export const selectBuildingsStatus = state => state.status;
  export const selectBuildingsError = state => state.error;

  export const {} = buildingsSlice.actions;
  export default buildingsSlice.reducer;