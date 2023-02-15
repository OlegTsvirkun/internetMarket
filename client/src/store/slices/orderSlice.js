import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../services/goodService";


export const finishOrder = createAsyncThunk('FINISH_ORDER', async (orderData, thunkAPI) => {
    try {
        return await services.finishOrder(orderData)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const orderSlice = createSlice({
    name: "order",
    initialState: {
        isErrors: {},
        orderData: {
            user: {},
            delivery: {},
        },
        orderNumber: {},
        isError: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        addError: (state, action) => {
            state.isErrors = { ...state.isErrors, ...action.payload }
        },
        removeError: (state, action) => {
            state.isErrors =
                Object.keys(state.isErrors)
                    .reduce((acc, item) => {
                        if (item != action.payload) acc[item] = state.isErrors[item]
                        return acc
                    }, {})
        },
        addOrderDeliveryData: (state, action) => {
            state.orderData.delivery = { ...state.orderData.delivery, ...action.payload }
        },
        deleteOrderDeliveryData: (state, action) => {
            state.orderData.delivery = {}
        },

        addOrderUserData: (state, action) => {
            state.orderData.user = { ...state.orderData.user, ...action.payload }

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(finishOrder.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(finishOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderNumber = action.payload
                state.orderData = {}
                state.isErrors = {}
            })
            .addCase(finishOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.orderNumber = {}
                state.message = action.payload.message


            })
    }
});

export const { addError, removeError, addOrderDeliveryData, addOrderUserData, deleteOrderDeliveryData } = orderSlice.actions;
export default orderSlice.reducer;
