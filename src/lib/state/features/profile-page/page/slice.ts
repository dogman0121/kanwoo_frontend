import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, ProfilePageState } from "./state";
import { Profile } from "@/types/profile";

export const profilePageSlice = createSlice({
    name: "profile_page",
    initialState,
    reducers: {
        initProfile: (state: ProfilePageState, action: PayloadAction<{profile: Profile}>) => {
            state.profile = action.payload.profile
        },
        setSection: (state: ProfilePageState, action: PayloadAction<"posts" | "collections">) => {
            state.ui.section = action.payload
        },
        setInfoModalOpen: (state: ProfilePageState, action: PayloadAction<boolean>) => {
            state.ui.infoModalOpen = action.payload
        }
    }
})

export const { initProfile, setSection, setInfoModalOpen } = profilePageSlice.actions

export default profilePageSlice.reducer