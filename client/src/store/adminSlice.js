import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminServices from "./services/adminServices";

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
        errors: {},
        fields: {
            createCategory:{},
        },
        message:'',
        isLoading:false,
        isError:false,
        errMessage:''
    },
    reducers: {
        addFields: (state, action) => {
            state.fields[Object.keys(action.payload)[0]] ={...action.payload[Object.keys(action.payload)[0]]}
        },
        addNewGoodFields: (state, action) => {
            state.fields.createGood[Object.keys(action.payload)[0]] =Object.values(action.payload)[0]
        },
        addNewCategoryFields: (state, action) => {
            state.fields.createCategory[Object.keys(action.payload)[0]] =Object.values(action.payload)[0]
        },
       
        addAdminError: (state, action) => {
            state.errors = { ...state.errors, ...action.payload }
        },
        removeAdminError: (state, action) => {
            Object.keys(action.payload).map(err => {
                state.errors =
                    Object.keys(state.errors)
                        .reduce((acc, item) => {

                            if (item != err) acc[item] = state.errors[item]
                            return acc
                        }, {})
            })
        },
     
        clearFields: (state, action) => {
            state.fields = {...state.fields, ...action.payload}
        },



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

export const { addFields, addAdminError, removeAdminError ,clearFields,addNewGoodFields,addNewCategoryFields,} = adminSlice.actions;
export default adminSlice.reducer;
