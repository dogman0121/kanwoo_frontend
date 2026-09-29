import { AuthProfile } from "@/types/profile";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthProfileState {
    profile?: AuthProfile | null,
}

const initialState: AuthProfileState = {
    profile: undefined,
}

export const authProfileSlice = createSlice({
    name: "auth_profile",
    initialState,
    reducers: {
        setAuthProfile: (state, action) => {
            state.profile = action.payload
        },
    }
})

export const { 
    setAuthProfile,
} = authProfileSlice.actions

export type RootState = {
    global: {authProfile: {profile: AuthProfileState}}
}

export const selectAuthProfile = (state: RootState) => state.global.authProfile.profile.profile
export const selectUnredNotificationsCount = (state: RootState) => state.global.authProfile.profile.profile?.unread_notifications_count

export default authProfileSlice.reducer