import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../services/server/api-client';
import Status from '../status';
import { normalizePOIsPoints } from "../../utils/map-data";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils/scaling";



export const fetchBuildingGraphById = createAsyncThunk(
  'admin/fetchBuildingGraphById', 
  async (buildingId) => {
    const response = await client.getBuildingGraphMap(buildingId)
    return response
  },
)


const mapInitialState = {
  error:null,
  status:Status.IDLE,
  buildingId:null,
  nodes:null,
  edges:null,
  graphMaps:[],
  cardinalDirections:null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState:  mapInitialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBuildingGraphById.pending, (state, action) => {
          state.status = Status.PENDING;
          state.error = null;
        })
        .addCase(fetchBuildingGraphById.fulfilled, (state, action) => {
          let buildingGraphData = action.payload;
          state.buildingId = buildingGraphData.buildingId;
          state.cardinalDirections = buildingGraphData.cardinalDirections;
          state.graphMaps = buildingGraphData.graphMaps.sort((a,b) => a.floor - b.floor);
          state.nodes = buildingGraphData.nodes;
          state.edges = buildingGraphData.edges;

          state.status = Status.SUCCEEDED;       
          state.error = null;   
        })
        .addCase(fetchBuildingGraphById.rejected, (state, action) => {
          state.nodes = null;
          state.edges = null;
          state.status = Status.FAILED;
          state.error = action.payload.error;
        })   
                       
    }

  })


  export const selectGraphStatus = state => state.admin.status;
  export const selectEdges = state => state.admin.edges;
  export const selectNodes = state => state.admin.nodes;
  export const selectGraphMaps =  state => state.admin.graphMaps
  export const selectCardinalDirections =  state => state.admin.cardinalDirections


  export const {} = adminSlice.actions;
  export default adminSlice.reducer;
  