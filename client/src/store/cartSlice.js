import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isCartOpen: false,
        itemsInCart: [],
    },
    reducers: {
        openCartMenu: (state, action) => {
            state.isCartOpen = action.payload
        },
        setInCart: (state, action) => {
            state.itemsInCart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.itemsInCart = state.itemsInCart.filter(
                (good) => good.articul !== action.payload
            );
        },
    },
});

export const { setInCart, removeFromCart, openCartMenu } = cartSlice.actions;
export default cartSlice.reducer;
