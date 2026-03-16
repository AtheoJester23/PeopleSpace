import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session: undefined
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload;
        }
    }
})

export const { setSession } = authSlice.actions;
export default authSlice.reducer;