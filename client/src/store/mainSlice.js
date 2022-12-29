import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from './services/service';

export const getMain = createAsyncThunk('GET_MAIN', async (_, thunkAPI) => {
  try { 
    return await services.getMain();
  } catch(error) {
     return thunkAPI.rejectWithValue(error.response.data)
  }
});

const mainSlice = createSlice({
  name: 'main',
  initialState:{
    categories:{},
    goods:{},
    images:{},
    isError: false,
    isLoading: false,
    message:''
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getMain.pending,(state, action)=>{
      state.isLoading = true
    })
    .addCase(getMain.fulfilled,(state, action)=>{
      state.isLoading = false
      state.categories = action.payload.category
      state.goods = action.payload.goods
      state.images = action.payload.image
    })
    .addCase(getMain.rejected,(state, action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload;
      state.goods = null
      state.categories = null
      state.images = null
    })
  }
}) 

export default mainSlice.reducer