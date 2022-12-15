import { configureStore } from "@reduxjs/toolkit";
// import planeReducer from "./plane/planeSlice";
// import planesReducer from './planes/planesSlice'
import mainReducer from './mainSlice'
export const store = configureStore(({
    reducer: {
        main: mainReducer,
    }
}))