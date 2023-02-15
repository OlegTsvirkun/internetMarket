import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "../services/userService";


export const getUserOrder = createAsyncThunk('GET_ORDERS', async (_, thunkAPI) => {
    try {
        return await userServices.getOrders()
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const getUserContacts = createAsyncThunk('GET_USER_CONTACTS', async (_, thunkAPI) => {
    try {
        return await userServices.getContacts()
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const userCabinetSlice = createSlice({
    name: "userCabinet",
    initialState: {
        orderData: {},
        userContacts: {},
        isError: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        clearOrderData: (state, action) => {
            state.orderData = {}
        },



    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserOrder.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.orderData = {}
            })
            .addCase(getUserOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderData = action.payload
            })
            .addCase(getUserOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload?.message
                state.orderData = {}
            })
            //? ----------- GET_USER_CONTACTS
            .addCase(getUserContacts.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.orderData = {}
            })
            .addCase(getUserContacts.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderData = action.payload
            })
            .addCase(getUserContacts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.message
                state.orderData = {}
            })


    }
});

export const { clearOrderData } = userCabinetSlice.actions;
export default userCabinetSlice.reducer;
