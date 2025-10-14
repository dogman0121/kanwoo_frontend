import Profile from "@/types/profile";
import { createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
    profile: Profile | null | undefined,
}

const initialState: ProfileState = {
    profile: undefined,
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        },
    }
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer