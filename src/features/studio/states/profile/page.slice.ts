import { Entity } from "@/lib/types/Entity.type";
import { Profile } from "@/types/profile";
import ProfilePermission from "@/types/profile/profilePermission";
import { createSlice } from "@reduxjs/toolkit";

export interface StudioPageProfileState {
    profile?: Entity<Profile, null, ProfilePermission>,
    ui: {
        createMangaDialogOpen: boolean,
        createTranslationDialogOpen: boolean
    }
}

const initialState: StudioPageProfileState = {
    ui: {
        createMangaDialogOpen: false,
        createTranslationDialogOpen: false
    }
}

type RootState = {
    studio: {profile: {page: StudioPageProfileState}}
}

export const studioProfileSlice = createSlice({
    name: "studio_profile",
    initialState,
    reducers: {
        setStudioProfile: (state, action) => {
            state.profile = action.payload
        },

        setStudioProfilePermissions: (state, action) => {
            if (state.profile)
                state.profile.permission = action.payload
        },
        setCreateMangaDialogOpen: (state, action) => {
            state.ui.createMangaDialogOpen = action.payload
        },
        setCreateTranslationDialogOpen: (state, action) => {
            state.ui.createTranslationDialogOpen = action.payload
        }
    }
})

export const selectProfile = (state: RootState) => {
    return state.studio.profile.page.profile?.data
}

export const selectCreateMangaDialogOpen = (state: RootState) => {
    return state.studio.profile.page.ui.createMangaDialogOpen
}

export const selectCreateTranslationDialogOpen = (state: RootState) => {
    return state.studio.profile.page.ui.createTranslationDialogOpen
}

export const { 
    setStudioProfile, 
    setStudioProfilePermissions, 
    setCreateMangaDialogOpen,
    setCreateTranslationDialogOpen
} = studioProfileSlice.actions

export default studioProfileSlice.reducer