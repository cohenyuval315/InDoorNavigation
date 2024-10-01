import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../server/api-client';
import Status from '../status';


export const fetchMockRoutes = createAsyncThunk(
  'appData/fetchMockRoutes', 
  async (arg,{rejectWithValue}) => {
        const {buildingId} = arg
        const response = await client.getMockRoutes(buildingId)
        if(response.ok){
            const result = await response.json();
            const data = result.data;
            return data;
        }else{
            return rejectWithValue("not found")
        }
    
  },
)
export const fetchMockRoute = createAsyncThunk(
    'appData/fetchMockRoute', 
    async (arg,{rejectWithValue}) => {
        const {buildingId,routeId} = arg;
        const response = await client.getMockRoute(buildingId,routeId)
        if(response.ok){
            const result = await response.json();
            const data = result.data;
            return data;
        }else{
            return rejectWithValue("not found")
        }
        
    },
  )


const appDataInitialState = {
    mockRoutes:{
        mockRoutes:null,
        status:Status.IDLE,
        error:null,
    },
    mockRoute:{
        mockRoute:null,
        status:Status.IDLE,
        error:null,

    }

}

const appDataSlice = createSlice({
    name: 'appData',
    initialState:  appDataInitialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMockRoutes.pending, (state, action) => {
          state.mockRoutes.status = Status.PENDING;
          state.mockRoutes.error = null;
        })
        .addCase(fetchMockRoutes.fulfilled, (state, action) => {
            state.mockRoutes = action.payload;
        })
        .addCase(fetchMockRoutes.rejected, (state, action) => {
          state.mockRoutes.status = Status.FAILED;
          state.mockRoutes.error = action.payload; 
        })   

        .addCase(fetchMockRoute.pending, (state, action) => {
            state.mockRoute.status = Status.PENDING;
            state.mockRoute.error = null;
        })
        .addCase(fetchMockRoute.fulfilled, (state, action) => {
            state.mockRoute = action.payload;
        })
        .addCase(fetchMockRoute.rejected, (state, action) => {
            state.mockRoute.status = Status.FAILED;
            state.mockRoute.error = action.payload; 
        })                   
    }

  })


export const selectMockRoutes = state => state.appData.mockRoutes.mockRoutes;
export const selectMockRoutesError = state => state.appData.mockRoutes.error;
export const selectMockRoutesStatus = state => state.appData.mockRoutes.status;

export const selectMockRoute = state => state.appData.mockRoute.mockRoute;
export const selectMockRouteError = state => state.appData.mockRoute.mockRoute.error;
export const selectMockRouteStatus = state => state.appData.mockRoute.mockRoute.status;

export const {} = appDataSlice.actions;
export default appDataSlice.reducer;
