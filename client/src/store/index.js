import { configureStore } from "@reduxjs/toolkit";
// import planeReducer from "./plane/planeSlice";
// import planesReducer from './planes/planesSlice'
import mainReducer from './mainSlice'
import categoryReducer from './categorySlice'
import cartReducer from "./cartSlice";
import goodReducer from "./goodSlice";
import  orderSlice  from "./orderSlice";
import  mainContactSlice  from "./mainContactSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
export const store = configureStore(({
    reducer: {
        main: mainReducer,
        category: categoryReducer,
        cart: cartReducer,
        good: goodReducer,
        order: orderSlice,
        mainContact:mainContactSlice,
        user:userSlice,
        admin: adminSlice,
        
    }
}))