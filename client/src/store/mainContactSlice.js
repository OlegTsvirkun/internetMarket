import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from './services/service';

export const getMainContact = createAsyncThunk('GET_MAIN_CONTACTS', async (_, thunkAPI) => {
  try { 
    return await services.getMainContacts();
  } catch(error) {
     return thunkAPI.rejectWithValue(error.response.data)
  }
});

const mainContactSlice = createSlice({
  name: 'mainContacts',
  initialState:{
    contacts:{},
       isError: false,
    isLoading: false,
    message:''
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getMainContact.pending,(state, action)=>{
      state.isLoading = true
    })
    .addCase(getMainContact.fulfilled,(state, action)=>{
      state.isLoading = false
      state.contacts = {...action.payload[0]}
    })
    .addCase(getMainContact.rejected,(state, action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload;
      state.contacts = null
    })
  }
}) 

export default mainContactSlice.reducer