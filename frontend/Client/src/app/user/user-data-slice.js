import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import client from '../../services/server/api-client';
import Status from '../status';

const getUserData = createAsyncThunk(
  'user/data',
  async (state, thunkAPI) => {

  }
)


const userInitialState = {
    device:null,
    accessToken:null,
    email:null,
    avatar:null,
    recentDestinations:null,
    status:Status.IDLE,
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducer:{
        
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUserData.pending, (state, action) => {
          state.status = Status.PENDING;
          state.error = null;
          
        })
        .addCase(getUserData.fulfilled, (state, action) => {
          const data = action.payload;
          state.data = data;
          state.status = Status.SUCCEEDED;
        })
        .addCase(getUserData.rejected, (state, action) => {
          state.data = null;
          state.status = Status.FAILED;
          state.error = action.payload.error;
        }) 
        
    }
  })




export default userSlice.reducer;