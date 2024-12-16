import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userAuthSlice"


const Store = configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
