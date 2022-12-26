import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../utils/getCartFromLS";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        isErrors: {},
        itemsInOrdert:[],
    },
    reducers: {
        addError:(state,action)=>{
state.isErrors={...state.isErrors, ...action.payload}
        },
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

export const { addError} = orderSlice.actions;
export default orderSlice.reducer;
