import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from './services/service';

export const getGood = createAsyncThunk('GET_GOOD', async (id, thunkAPI) => {
  try {
    return await services.getGood(id);
  } catch(error) {
     return thunkAPI.rejectWithValue(error.response.data)
  }
});


const goodSlice = createSlice({
  name: 'good',
  initialState:{
    good:{},
    images:[],
    
    isError: false,
    isLoading: false,
    message:''
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getGood.pending,(state, action)=>{
      state.isLoading = true
    })
    .addCase(getGood.fulfilled,(state, action)=>{
      state.isLoading = false
      state.good = action.payload.good
      state.images = action.payload.images
      
    })
    .addCase(getGood.rejected,(state, action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload;
      state.good = null
    })


   
  }
}) 

export default goodSlice.reducer