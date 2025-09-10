import User from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthUserState {
    user: User | null | undefined
}

const initialState: AuthUserState = {
    user: undefined
}

export const authUserSlice = createSlice({
    name: "auth_user",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setAuthUser } = authUserSlice.actions

export default authUserSlice.reducer