import { configureStore } from "@reduxjs/toolkit";
// import planeReducer from "./plane/planeSlice";
// import planesReducer from './planes/planesSlice'
import mainReducer from './mainSlice'
import categoryReducer from './categorySlice'
import cartReducer from "./cartSlice";
import goodReducer from "./goodSlice";
export const store = configureStore(({
    reducer: {
        main: mainReducer,
        category: categoryReducer,
        cart: cartReducer,
        good: goodReducer
    }
}))