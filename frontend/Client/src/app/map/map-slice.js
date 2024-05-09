import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../services/server/api-client';
import Status from '../status';
import { normalizePOIsPoints } from "../../utils/map-data";


export const fetchBuildingByMapId = createAsyncThunk(
  'map/fetchBuildingMapById', 
  async (buildingId) => {
    const response = await client.getBuildingMap(buildingId)
    return response
  },
)


const mapInitialState = {
  data:null,
  error:null,
  status:Status.IDLE,
  maps:[],
  POIs:null,
  dims:null
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
          state.error = null;
        })
        .addCase(fetchBuildingByMapId.fulfilled, (state, action) => {
          let buildingMapData = action.payload.data;
          const floorsFiles = action.payload.floorsFiles.sort((a, b) => a.floor - b.floor);
          floorsFiles.forEach((mapFile,index) => {
            const normalPOIs = normalizePOIsPoints(buildingMapData.POIs, mapFile.width,mapFile.height,mapFile.floor)
            buildingMapData = {
              ...buildingMapData,
              POIs: normalPOIs
            }
          });
          state.data = buildingMapData;
          state.maps = floorsFiles;    
          state.POIs =  buildingMapData.POIs 
          state.dims = floorsFiles.map((f) => {
            return {
              width: f.width,
              height: f.height,
              floor: f.floor
            }
          })
          state.status = Status.SUCCEEDED;       
          state.error = null;   
        })
        .addCase(fetchBuildingByMapId.rejected, (state, action) => {
          state.data = null;
          state.maps = []
          state.status = Status.FAILED;
          state.error = action.payload.error;
        })       
    }

  })


  export const selectMap = state => state.map.maps;
  export const selectNumberOfFloors = state => state.map.maps.length;
  export const selectMinFloor = state => state.map.data.minFloor;
  export const selectMaxFloor = state => state.map.data.maxFloor;
  export const selectMapData = state => state.map.data;
  export const selectMapPOIs = state => state.map.POIs;
  export const selectMapStatus = state => state.map.status;
  export const selectMapError = state => state.map.error;
  export const selectMapsDims = state => state.map.dims;
  // export const selectPOIById = POIId => state => state.map.POIs.find(POI => POI.id === POIId);
  export const {} = mapSlice.actions;
  export default mapSlice.reducer;
  