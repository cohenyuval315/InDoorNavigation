import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../server/api-client';
import Status from '../status';
import { normalizePOIsPoints } from "../../utils/map-data";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils/scaling/scaling";


export const fetchBuildingByMapId = createAsyncThunk(
  'map/fetchBuildingMapById', 
  async (buildingId,{rejectWithValue}) => {
    const response = await client.getBuildingMapData(buildingId)
    if(response.ok){
      const result = await response.json();
      const data = result.data;
      return data;
    }else{
      return rejectWithValue("not found")
    }
    
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
  geoArea:null,
  minFloor:null,
  maxFloor:null,
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
          // console.log(Object.keys(buildingMapData))
          state.POIsMaps = buildingMapData.POIsMaps.sort((a,b) => a.floor - b.floor);
          const mapFloors = action.payload.mapFloors.sort((a, b) => a.floor - b.floor);
          const width = buildingMapData.mapWidth 
          const height = buildingMapData.mapHeight
          state.dims = {
            width:width,
            height:height,
            scale:buildingMapData.scale,
            zScale:buildingMapData.zScale,
            mapHeading:buildingMapData.mapHeading          
          } 
  
          let minFloor = Infinity
          let maxFloor = -Infinity;
          mapFloors.forEach((mapFloor,index) => {
            const normalPOIs = normalizePOIsPoints(buildingMapData.POIs, width,height,mapFloor.floor,WINDOW_WIDTH,WINDOW_HEIGHT)
            buildingMapData = {
              ...buildingMapData,
              POIs: normalPOIs
            }
            if (mapFloor.floor > maxFloor){
              maxFloor = mapFloor.floor
            }
            if (mapFloor.floor < minFloor){
              minFloor = mapFloor.floor;
            }
          });
          state.minFloor = minFloor;
          state.maxFloor = maxFloor;
          state.data = buildingMapData;
          state.maps = mapFloors;    
          state.POIs =  buildingMapData.POIs 
          
          state.status = Status.SUCCEEDED;       
          state.error = null;

        })
        .addCase(fetchBuildingByMapId.rejected, (state, action) => {
          state.status = Status.FAILED;
          state.error = action.payload; 
        })   
                       
    }

  })


  export const selectMap = state => state.map.maps;
  export const selectNumberOfFloors = state => state.map.maps.length;
  export const selectMinFloor = state => state.map.minFloor;
  export const selectMaxFloor = state => state.map.maxFloor;
  export const selectMapData = state => state.map.data;
  export const selectMapPOIs = state => state.map.POIs;
  export const selectMapStatus = state => state.map.status;
  export const selectMapError = state => state.map.error;
  export const selectMapsDims = state => state.map.dims;
  export const selectPOIsMaps = state => state.map.POIsMaps;
  export const selectMapGlobalCoordinates = state => state.map.globalCoordinatesBoundary;
  // export const selectPOIById = POIId => state => state.map.POIs.find(POI => POI.id === POIId);
  export const {} = mapSlice.actions;
  export default mapSlice.reducer;
  