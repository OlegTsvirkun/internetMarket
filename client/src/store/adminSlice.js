import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminServices from "./services/adminServices";

export const createNewCategory = createAsyncThunk('CREATE_CATEGORY', async (formData, thunkAPI) => {
    try {
      return await adminServices.createCategory(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  });

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        errors: {},
        fields: {},
        message:'',
        isLoading:false,
        isError:false,
        errMessage:''
    },
    reducers: {
        addFields: (state, action) => {
            console.log(action.payload);
            state.fields = action.payload
            // state.fields[Object.keys(action.payload)[0]]
        },
        openCartMenu: (state, action) => {
            state.isCartOpen = action.payload
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
        addOrderDeliveryData: (state, action) => {
            state.orderData.delivery = { ...state.orderData.delivery, ...action.payload }
        },
        addOrderUserData: (state, action) => {
            state.orderData.user = { ...state.orderData.user, ...action.payload }

        },
        clearFields: (state, action) => {
            state.fields = {}
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
            state.errMessage = action.payload.message
          })
    
    }
});

export const { addFields, addAdminError, removeAdminError ,clearFields} = adminSlice.actions;
export default adminSlice.reducer;
