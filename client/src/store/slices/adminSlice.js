import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminServices from "../services/adminServices";

export const createNewCategory = createAsyncThunk('CREATE_CATEGORY', async (formData, thunkAPI) => {
  try {
    return await adminServices.createCategory(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});
export const createNewGood = createAsyncThunk('CREATE_GOOD', async (formData, thunkAPI) => {
  try {
    return await adminServices.createGood(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    message: '',
    isLoading: false,
    isError: false,
    errMessage: ''
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.message = ''
        state.errMessage = '';

      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.response
        state.errMessage = '';
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = ''
        state.errMessage = action.payload?.message.message || "EROR"
      })
      //? Create NEW GOOD
      .addCase(createNewGood.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.message = ''
        state.errMessage = '';

      })
      .addCase(createNewGood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.response
        state.errMessage = '';
      })
      .addCase(createNewGood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = ''
        state.errMessage = action.payload?.message.message || "EROR"
      })

  }
});


export default adminSlice.reducer;
