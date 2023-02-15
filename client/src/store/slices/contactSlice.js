import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '../services/goodService';

export const getMainContact = createAsyncThunk('GET_MAIN_CONTACTS', async (_, thunkAPI) => {
  try {
    return await services.getMainContacts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});
export const getSecondaryContact = createAsyncThunk('GET_SECONDARY_CONTACTS', async (_, thunkAPI) => {
  try {
    return await services.getSeconadryContacts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    mainContacts: {},
    secondaryContacts: [],
    isError: false,
    isLoading: true,
    message: ''
  },
  extraReducers: (builder) => {
    //? GET MAIN CONTACTS
    builder
      .addCase(getMainContact.pending, (state, action) => {
        state.isLoading = true,
        state.mainContacts = {}

      })
      .addCase(getMainContact.fulfilled, (state, action) => {
        state.isLoading = false
        state.mainContacts = { ...action.payload[0] }
      })
      .addCase(getMainContact.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload;
        state.mainContacts = {}
      })
      //? SECONDARY_CONTACTS
      .addCase(getSecondaryContact.pending, (state, action) => {
        state.isLoading = true,
        state.secondaryContacts = []

      })
      .addCase(getSecondaryContact.fulfilled, (state, action) => {
        state.isLoading = false
        state.secondaryContacts = [ ...action.payload ]
      })
      .addCase(getSecondaryContact.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload;
        state.secondaryContacts = []
      })
  }
})

export default contactSlice.reducer