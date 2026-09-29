import { Collection } from "@/types/collection";
import { Manga } from "@/types/manga";
import { Profile } from "@/types/profile";
import ProfilePermission from "@/types/profile/profilePermission";
import { Translation } from "@/types/translation";
import { createSlice } from "@reduxjs/toolkit";

export interface StudioPageProfileState {
    profile?: Profile,
    profilePermission?: ProfilePermission,
    translations?: Translation[],
    manga?: Manga[],
    collections?: Collection[]
}

const initialState: StudioPageProfileState = {
    profile: undefined,
    profilePermission: undefined,
    translations: undefined,
    manga: undefined,
    collections: undefined
}

export const studioPageProfileSlice = createSlice({
    name: "studio_page_profile",
    initialState,
    reducers: {
        setStudioPageProfile: (state, action) => {
            state.profile = action.payload
        },

        setStudioPageProfilePermissions: (state, action) => {
            state.profilePermission = action.payload
        },

        setStudioPageProfileManga: (state, action) => {
            state.manga = action.payload
        },

        setStudioPageProfileTranslations: (state, action) => {
            state.translations = action.payload
        },

        setStudioPageProfileCollections: (state, action) => {
            state.collections = action.payload
        }
    }
})

export const { 
    setStudioPageProfile, 
    setStudioPageProfilePermissions, 
    setStudioPageProfileManga, 
    setStudioPageProfileTranslations,
    setStudioPageProfileCollections
} = studioPageProfileSlice.actions

export default studioPageProfileSlice.reducer