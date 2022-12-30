import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from './services/service';

export const getCategory = createAsyncThunk('GET_CATEGORY', async (category, thunkAPI) => {
  try {
    return await services.getCategory(category);
  } catch(error) {
     return thunkAPI.rejectWithValue(error.response.data)
  }
});
export const searchingGoods = createAsyncThunk('SEARCH_GOOD', async (searchValue, thunkAPI) => {
  try {
    const v= await services.searchGoods(searchValue);
    console.log(v);
    return v
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


    .addCase(searchingGoods.pending,(state, action)=>{
      state.isLoading = true
    })
    .addCase(searchingGoods.fulfilled,(state, action)=>{
      console.log(action.payload);
      state.isLoading = false
      state.goods = action.payload.goods
      // state.images = action.payload.images
      
    })
    .addCase(searchingGoods.rejected,(state, action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload;
      // state.images = null
      state.goods = null
    })
  }
}) 

export default categorySlice.reducer