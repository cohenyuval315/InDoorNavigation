import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../services/server/api-client';
import Status from '../status';
import { normalizePOIsPoints } from "../../utils/map-data";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils/scaling";


export const fetchBuildingByMapId = createAsyncThunk(
  'map/fetchBuildingMapById', 
  async (buildingId,{rejectWithValue}) => {
    const response = await client.getBuildingMap(buildingId)
    if (response){
      return response.data;
    }
    return rejectWithValue("not found")
  },
)


const mapInitialState = {
  data:null,
  error:null,
  status:Status.IDLE,
  maps:null,
  POIs:null,
  POIsMaps:null,
  dims:null,
  globalCoordinatesBoundary:null,
  floorAltitudes:null,
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
          let buildingMapData = action.payload;
          const floorsFiles = action.payload.mapFloors.sort((a, b) => a.floor - b.floor);
          floorsFiles.forEach((mapFile,index) => {
            const normalPOIs = normalizePOIsPoints(buildingMapData.POIs, mapFile.width,mapFile.height,mapFile.floor,WINDOW_WIDTH,WINDOW_HEIGHT)
            buildingMapData = {
              ...buildingMapData,
              POIs: normalPOIs
            }
          });
          state.data = buildingMapData;
          state.maps = floorsFiles;    
          state.POIs =  buildingMapData.POIs 
          state.POIsMaps = buildingMapData.POIsMaps.sort((a,b) => a.floor - b.floor);
          state.dims = floorsFiles.map((f) => {
            return {
              width: f.width,
              height: f.height,
              floor: f.floor
            }
          })
          state.status = Status.SUCCEEDED;       
          state.error = null;   
          state.floorAltitudes = buildingMapData.floorAltitudes;
        })
        .addCase(fetchBuildingByMapId.rejected, (state, action) => {
          state.data = null;
          state.maps = null
          state.POIsMaps = null;
          state.floorAltitudes = null;
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
  export const selectPOIsMaps = state => state.map.POIsMaps;
  export const selectMapGlobalCoordinates = state => state.map.globalCoordinatesBoundary;
  export const selectFloorAltitudes = state => state.map.floorAltitudes;
  // export const selectPOIById = POIId => state => state.map.POIs.find(POI => POI.id === POIId);
  export const {} = mapSlice.actions;
  export default mapSlice.reducer;
  