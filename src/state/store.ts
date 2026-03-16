import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './theme/themeSlice'
import authReducer from './auth/authSlice'
import profileReducer from './profile/profileSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        user: profileReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
