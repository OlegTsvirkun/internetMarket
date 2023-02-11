import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { managerServices } from "./services/managerService";


export const getOrderStatuses = createAsyncThunk('GET_ORDERS_STATUSES', async (_, thunkAPI) => {
    try {
        return await managerServices.getOrderStatuses()
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const getOrders = createAsyncThunk('GET_ORDERS', async (status, thunkAPI) => {
    try {
        return await managerServices.getOrders(status)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const getOrder = createAsyncThunk('GET_ORDER', async (id, thunkAPI) => {
    try {
        return await managerServices.getOrder(id)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const setNewStatus = createAsyncThunk('SET_NEW_STATUS', async (status, thunkAPI) => {
    try {
        return await managerServices.setNewStatus(status)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const managerCabinetSlice = createSlice({
    name: "managerCabinet",
    initialState: {
        statuses: [],
        orderList:[],
        itemOrder:{},
        isError: false,
        isLoading: false,
        errMessage:'',
        message: '',
    },
    reducers: {
        clearOrderData: (state, action) => {
state.orderData={}
        },
       


    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderStatuses.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.statuses = []
                state.errMessage = ''
                state.message =''
            })
            .addCase(getOrderStatuses.fulfilled, (state, action) => {
                state.isLoading = false
                state.statuses = action.payload.statuses
                state.message = action.payload?.response
            })
            .addCase(getOrderStatuses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.errMessage = action.payload?.message
                state.statuses = []
            })
            //? ----------- GET_ORDERS
            .addCase(getOrders.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.orderList = []
                state.errMessage = ''
                state.message =''
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderList = action.payload.list
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload?.message
                state.orderList = []
            })
            //? ----------- GET_ORDER
            .addCase(getOrder.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.itemOrder = {}
                state.errMessage = ''
                state.message =''
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.itemOrder = {...action.payload.order}
               
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.errMessage = action.payload?.message
                state.itemOrder = {}
            })
            //? SET_NEW_STATUS
            .addCase(setNewStatus.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.errMessage = ''
                state.message =''
                state.itemOrder = {}
            })
            .addCase(setNewStatus.fulfilled, (state, action) => {
                console.log('action.payload',action.payload)
                state.isLoading = false
                state.itemOrder = {...action.payload.order}
                state.message = action.payload?.response

            })
            .addCase(setNewStatus.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.errMessage = action.payload?.message
                state.itemOrder = {}
            })

           
    }
});

export const {clearOrderData} = managerCabinetSlice.actions;
export default managerCabinetSlice.reducer;
