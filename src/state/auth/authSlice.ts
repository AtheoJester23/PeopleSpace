import { createSlice } from "@reduxjs/toolkit";

type Session = {
    userId: string,
    accessToken: string
}

export type User = {
    bio: string | null,
    birthday: string,
    created_at: string,
    firstname: string,
    gender: string,
    id: string,
    lastname: string,
    profile_banner: string | null,
    profile_picture_url: string | null
    updated_at: string | null,
    username: string,
}

type initialType = {
    session: Session | undefined,
    users: {
        byId: Record<string, User>
    }
}

const initialState: initialType = {
    session: undefined,
    users: {
        byId: {}
    }
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload;
        },
        addUser: (state, action) => {
            const user = action.payload;
            console.log("this one")
            state.users.byId[user.id] = user;
        },
        addUsers: (state, action) => {
            const users = action.payload;

            users.forEach((user: User) => {
                state.users.byId[user.id] = user;
            })
        }
    }
})

export const { setSession, addUser, addUsers } = authSlice.actions;
export default authSlice.reducer;