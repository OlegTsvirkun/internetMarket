import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../utils/getCartFromLS";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        isErrors: {},
        itemsInOrder: {},
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
        addField: (state, action) => {
            state.itemsInOrder = { ...state.itemsInOrder, ...action.payload }
        },
        addCatDelivery:(state,action)=>{
            state.itemsInOrder={...action.payload }
            console.log(Object.values(action.payload));
        }
        // openCartMenu: (state, action) => {
        //     state.isCartOpen = action.payload
        // },
        // setInCart: (state, action) => {
        //     state.itemsInCart = {...state.itemsInCart, ...action.payload}
        // },
        // incrementGood: (state, action) => {
        //     state.itemsInCart[action.payload].count ++
        // },
        // decrementGood: (state, action) => {
        //         state.itemsInCart[action.payload].count --
        // },
        // removeFromCart: (state, action) => {
        // state.itemsInCart  = action.payload


        // },


    },
});

export const { addError, remooveError,addField,addCatDelivery } = orderSlice.actions;
export default orderSlice.reducer;
