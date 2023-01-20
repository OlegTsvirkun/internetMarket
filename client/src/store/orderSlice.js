import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../utils/getCartFromLS";
import services from "./services/service";


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
        orderNumber: {},
        isError: false,
        isLoading: false,
    },
    reducers: {
        addError: (state, action) => {
            state.isErrors = { ...state.isErrors, ...action.payload }
        },
        remooveError: (state, action) => {
            // console.log(Object.keys(state.isErrors)[0]);
            state.isErrors =
                Object.keys(state.isErrors)
                    .reduce((acc, item) => {
                        if (item != Object.keys(action.payload)[0]) acc[item] = state.isErrors[item]
                        return acc
                    }, {})
        },
        // addField: (state, action) => {
        //     state.itemsInOrder = { ...state.itemsInOrder, ...action.payload }
        // },
        // addCatDelivery:(state,action)=>{
        //     state.itemsInOrder={...action.payload }
        //     console.log(Object.values(action.payload));
        // }


    },
    extraReducers: (builder) => {
        builder
            .addCase(finishOrder.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(finishOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderNumber = action.payload

            })
            .addCase(finishOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.orderNumber = {}


            })
    }
});

export const { addError, remooveError, addField, addCatDelivery } = orderSlice.actions;
export default orderSlice.reducer;
