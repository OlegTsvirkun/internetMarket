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
        orderData:{
            user: {},
			// orderedGoods: {},
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
        remooveError: (state, action) => {
            Object.keys(action.payload).map(err => {
                state.isErrors =
                    Object.keys(state.isErrors)
                        .reduce((acc, item) => {
                            // console.log((item));
                            // console.log(('err', err));
                            if (item != err) acc[item] = state.isErrors[item]
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
        // addCatDelivery:(state,action)=>{
        //     state.itemsInOrder={...action.payload }
        //     console.log(Object.values(action.payload));
        // }


    },
    extraReducers: (builder) => {
        builder
            .addCase(finishOrder.pending, (state, action) => {
                state.isLoading = true
                state.isLoading = true
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
                state.message = action.payload.message


            })
    }
});

export const { addError, remooveError, addOrderDeliveryData,addOrderUserData } = orderSlice.actions;
export default orderSlice.reducer;
