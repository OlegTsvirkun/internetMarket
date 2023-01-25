import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../utils/getCartFromLS";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isCartOpen: false,
        itemsInCart: getCartFromLS() ,
    },
    reducers: {
        openCartMenu: (state, action) => {
            state.isCartOpen = action.payload
        },
        setInCart: (state, action) => {
            state.itemsInCart = {...state.itemsInCart, ...action.payload}
        },
        incrementGood: (state, action) => {
            state.itemsInCart[action.payload].count ++
        },
        decrementGood: (state, action) => {
                state.itemsInCart[action.payload].count --
        },
        removeFromCart: (state, action) => {
        state.itemsInCart  = action.payload
        },
        clearCart: (state, action) => {
        state.itemsInCart  = {}
        },
        
      

    },
});

export const { setInCart, removeFromCart, openCartMenu, decrementGood, incrementGood,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
