import { configureStore } from "@reduxjs/toolkit";
import userIDReducer from './features/UserSlice/UserSlice'

export const createStore = () => {
    return configureStore({
        reducer: {
            userID: userIDReducer
        },
    })
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']