import { createSlice } from "@reduxjs/toolkit";

type initialType = {
    profile: null | {
        bio: String,
        birthday: String,
        created_at: String,
        firstname: String,
        gender: String,
        id: String,
        lastname: String,
        profile_banner: String,
        updated_at: String,
        username: String
    }
}

const initialState: initialType = {
    profile: null
}

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        }
    }
})

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;