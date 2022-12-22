import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isCartOpen: false,
        // itemsInCart: [], 
        itemsInCart: {},
    },
    reducers: {
        openCartMenu: (state, action) => {
            state.isCartOpen = action.payload
        },
        setInCart: (state, action) => {
            state.itemsInCart = {...state.itemsInCart, ...action.payload}

            // state.itemsInCart.push(action.payload);
        },
        incrementGood: (state, action) => {
            state.itemsInCart[action.payload].count ++

        //     state.itemsInCart = state.itemsInCart.filter((good) => {
        //         if (good.articul == action.payload) {
        //             good.itemsInCart = (good.count + 1) * good.price
        //             good.count++
        //             return good
        //         }
        //     }
        //     );
        },
        decrementGood: (state, action) => {
            
                state.itemsInCart[action.payload].count --

        //     state.itemsInCart = state.itemsInCart.filter((good) => {
        //         if (good.articul == action.payload) {
        //             if (good.count > 0) {
        //                 good.itemsInCart = (good.count - 1) * good.price
        //                 good.count--
        //                 return good
        //             }
        //         }
        //         else {
        //             good.itemsInCart = 0
        //             good.count = 0
        //         }
        //     }
        //     );

        },
        removeFromCart: (state, action) => {
        state.itemsInCart  = action.payload
    
           
        },
      

    },
});

export const { setInCart, removeFromCart, openCartMenu, decrementGood, incrementGood } = cartSlice.actions;
export default cartSlice.reducer;
