import { configureStore } from "@reduxjs/toolkit";
// import planeReducer from "./plane/planeSlice";
// import planesReducer from './planes/planesSlice'
import mainReducer from './mainSlice'
import categoryReducer from './categorySlice'
import cartReducer from "./cartSlice";
import goodReducer from "./goodSlice";
import  orderSlice  from "./orderSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import contactSlice from "./contactSlice";
export const store = configureStore(({
    reducer: {
        main: mainReducer,
        category: categoryReducer,
        cart: cartReducer,
        good: goodReducer,
        order: orderSlice,
        contacts:contactSlice,
        user:userSlice,
        admin: adminSlice,
        
    }
}))