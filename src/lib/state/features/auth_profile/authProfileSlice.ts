import AuthProfile from "@/types/authProfile";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthProfileState {
    profile: AuthProfile | null | undefined
}

const initialState: AuthProfileState = {
    profile: undefined
}

export const authProfileSlice = createSlice({
    name: "auth_profile",
    initialState,
    reducers: {
        setAuthProfile: (state, action) => {
            state.profile = action.payload
        }
    }
})

export const { setAuthProfile } = authProfileSlice.actions

export default authProfileSlice.reducer