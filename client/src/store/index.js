import { configureStore } from "@reduxjs/toolkit";
import mainReducer from './mainSlice'
import categoryReducer from './categorySlice'
import cartReducer from "./cartSlice";
import goodReducer from "./goodSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import contactSlice from "./contactSlice";
import userCabinetSlice from "./userCabinetSlice";
export const store = configureStore(({
    reducer: {
        main: mainReducer,
        category: categoryReducer,
        cart: cartReducer,
        good: goodReducer,
        order: orderSlice,
        contacts: contactSlice,
        user: userSlice,
        admin: adminSlice,
        userCabinet: userCabinetSlice,

    }
}))