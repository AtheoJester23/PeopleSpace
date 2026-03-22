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
    },
    myProf: boolean
}

const initialState: initialType = {
    profile: null,
    myProf: false
}

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setMyProf: (state, action) => {
            state.myProf = action.payload;
        }
    }
})

export const { setProfile, setMyProf } = profileSlice.actions;
export default profileSlice.reducer;