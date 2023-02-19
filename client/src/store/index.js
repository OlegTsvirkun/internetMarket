import { configureStore } from "@reduxjs/toolkit";
import mainReducer from './slices/mainSlice'
import categoryReducer from './slices/categorySlice'
import cartReducer from "./slices/cartSlice";
import goodReducer from "./slices/goodSlice";
import orderSlice from "./slices/orderSlice";
import userSlice from "./slices/userSlice";
import adminSlice from "./slices/adminSlice";
import contactSlice from "./slices/contactSlice";
import userCabinetSlice from "./slices/userCabinetSlice";
import managerCabinetSlice from "./slices/managerCabinetSlice";
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
        managerCabinet: managerCabinetSlice,
    }
}))