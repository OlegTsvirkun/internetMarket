import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from './services/service';

export const getCategory = createAsyncThunk('GET_MAIN', async (category, thunkAPI) => {
  try {
    return await services.getCategory(category);
  } catch(error) {
     return thunkAPI.rejectWithValue(error.response.data)
  }
});

const categorySlice = createSlice({
  name: 'category',
  initialState:{
    catName:'',
    goods:{},
    
    isError: false,
    isLoading: false,
    message:''
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getCategory.pending,(state, action)=>{
      state.isLoading = true
    })
    .addCase(getCategory.fulfilled,(state, action)=>{
      state.isLoading = false
      state.catName = action.payload.category
      state.goods = action.payload.goods
      
    })
    .addCase(getCategory.rejected,(state, action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload;
      state.goods = null
      state.catName = null
    })
  }
}) 

export default categorySlice.reducer