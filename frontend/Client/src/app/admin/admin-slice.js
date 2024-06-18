import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../services/server/api-client';
import Status from '../status';

export const fetchBuildingGraphById = createAsyncThunk(
  'admin/fetchBuildingGraphById', 
  async (buildingId,_) => {
    const response = await client.getBuildingGraphMap(buildingId)
    return response.data
  },
)
export const fetchAllProcessingRoutes = createAsyncThunk(
  'admin/fetchAllProcessingRoutes', 
  async (buildingId,_) => {
    const response = await client.getAllBuildingProcessingRoutes(buildingId)
    return response
  },
)

export const fetchProcessingMap = createAsyncThunk(
  'admin/fetchProcessingMap', 
  async (args,_) => {
    const {buildingId,version} = args;
    const response = await client.getBuildingProcessingMap(buildingId,version)
    return response
  },
)
export const fetchProcessingRoute = createAsyncThunk(
  'admin/fetchProcessingRoute', 
  async (args,_) => {
    const {buildingId,routeName} = args;
    const response = await client.getBuildingProcessingRoute(buildingId,routeName)
    return response
  },
)

export const uploadProcessingRoute = createAsyncThunk(
  'admin/uploadProcessingRoute', 
  async (args,_) => {
    const {buildingId,data} = args;
    const response = await client.postBuildingProcessingRoute(buildingId,data)
    return response
  },
)
export const uploadProcessingMap = createAsyncThunk(
  'admin/uploadProcessingMap', 
  async (args,{rejectWithValue}) => {
    const {buildingId,data} = args;
    const response = await client.postBuildingProcessingMap(buildingId,data)
    if (response.ok){
      const res = await client.getBuildingProcessingMap(buildingId,data['version'])
      if(res.ok){
        const results = await response.json();
        return results;
      }else{
        rejectWithValue("failed to save this")
      }
    }
    
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
  processingMap: null,
  processingRoutes:null,
  processingStatus : Status.IDLE,
  processingError:null
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
        .addCase(fetchProcessingMap.rejected,(state,action) => {
          state.processingStatus = Status.FAILED
          state.processingError = action.payload.error;
        })
        .addCase(fetchAllProcessingRoutes.rejected,(state,action) => {
          state.processingStatus = Status.FAILED
          state.processingError = action.payload.error;
        }) 
        .addCase(fetchProcessingRoute.rejected,(state,action) => {
          state.processingStatus = Status.FAILED
          state.processingError = action.payload.error;
        })  

        .addCase(fetchProcessingMap.pending,(state,action) => {
          state.processingStatus = Status.PENDING
        })
        .addCase(fetchAllProcessingRoutes.pending,(state,action) => {
          state.processingStatus = Status.PENDING
        }) 
        .addCase(fetchProcessingRoute.pending,(state,action) => {
          state.processingStatus = Status.PENDING
        })  
        .addCase(fetchProcessingMap.fulfilled,(state,action) => {
          state.processingMap = action.payload;
          state.processingStatus = Status.SUCCEEDED
        })
        .addCase(fetchAllProcessingRoutes.fulfilled,(state,action) => {
          state.processingRoutes = action.payload;
          state.processingStatus = Status.SUCCEEDED
        }) 
        .addCase(fetchProcessingRoute.fulfilled,(state,action) => {
          state.processingRoutes = action.payload;
          state.processingStatus = Status.SUCCEEDED
        })
        
        .addCase(uploadProcessingMap.rejected , (state,action) => {
          state.processingError = action.payload;
          state.processingStatus = Status.FAILED
        })


    }

  })


  export const selectGraphStatus = state => state.admin.status;
  export const selectEdges = state => state.admin.edges;
  export const selectNodes = state => state.admin.nodes;
  export const selectGraphMaps =  state => state.admin.graphMaps
  export const selectProcessingMap =  state => state.admin.processingMap
  export const selectProcessingRoutes =  state => state.admin.processingRoutes
  export const selectProcessingStatus =  state => state.admin.processingStatus
  export const selectProcessingError =  state => state.admin.processingError
  export const selectCardinalDirections =  state => state.admin.cardinalDirections



  export const {} = adminSlice.actions;
  export default adminSlice.reducer;
  