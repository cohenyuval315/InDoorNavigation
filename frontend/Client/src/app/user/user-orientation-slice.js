import { createAsyncThunk } from "@reduxjs/toolkit"
import client from './../../services/api-client';
import Status from './../status';
import { useSelector } from "react-redux";

const getUserOrientationREST = createAsyncThunk(
  'userOrientation/rest',
  async (state, thunkAPI) => {
    const sensorData = useSelector(state => state.sensorData);
    const requestData = {
      state,
      sensorData
    };
    try {
      const response = await client.fetchUserOrientation(requestData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)



const getUserOrientationWS = createAsyncThunk(
  'userOrientation/ws',
  async (state) => {

  }
)


const getUserSystemConfigurations = createAsyncThunk(
  'userOrientation/system',
  async (state) => {
    useSelector()

  }
)

const getInitialUserPosition = createAsyncThunk(
  'userOrientation/ws',
  async (state) => {

  }
)


const userStateInitialState = {
    systemConfiguration:{

    },
    deviceState:{
      heading:{
        direction:null,
        cardinalDirection:null
      }
    },
    userState: {
      heading:{
        direction:null,
        cardinalDirection:null
      },
      position:{
        x:null,
        y:null,
        z:null,
        floor:null,
      }
    },
    gps:{
      isAvailable:null,
      data:{
        langtitude:null,
        longtitude:null
      }
    },
    wifi:{
      data:[]
    },
    magnetometerData:{
      data: []
    },
    gyroscopeData:{
      data: []

    },
    accelerometerData:{
      data: []
    },
    status: Status.IDLE,
    error:null,


    userHeading: {
      direction:null,
      cardinalDirection:null
    },


    
    
    
}

const userOrientationSlice = createSlice({
    name: 'userOrientation',
    initialState: userStateInitialState,
    reducer:{
      addSensorData(state,action){
        state.sensorsData
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUserOrientationREST.pending, (state, action) => {
          state.status = Status.PENDING;
          state.error = null;
          
        })
        .addCase(getUserOrientationREST.fulfilled, (state, action) => {
          const data = action.payload;
          state.data = data;
          state.status = Status.SUCCEEDED;
        })
        .addCase(getUserOrientationREST.rejected, (state, action) => {
          state.data = null;
          state.status = Status.FAILED;
          state.error = action.payload.error;
        }) 
        .addCase(getUserOrientationWS.pending, (state, action) => {
          state.status = Status.PENDING;
        })
        .addCase(getUserOrientationWS.fulfilled, (state, action) => {
          const data = action.payload;
          state.data = data;
          state.status = Status.SUCCEEDED;
        })
        .addCase(getUserOrientationWS.rejected, (state, action) => {
          state.data = null;
          state.status = Status.FAILED;
          state.error = action.payload.error;
        })          
    }
  })




export default userOrientationSlice.reducer;