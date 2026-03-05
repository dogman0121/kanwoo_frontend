import Manga from "@/types/manga/manga";
import Profile from "@/types/profile/profile";
import ProfilePermission from "@/types/profile/profilePermission";
import Translation from "@/types/translation/translation";
import { createSlice } from "@reduxjs/toolkit";

export interface StudioPageProfileState {
    profile?: Profile,
    profilePermission?: ProfilePermission,
    translations?: Translation[],
    manga?: Manga[]
}

const initialState: StudioPageProfileState = {
    profile: undefined,
    profilePermission: undefined,
    translations: undefined,
    manga: undefined
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
        }
    }
})

export const { setStudioPageProfile, setStudioPageProfilePermissions, setStudioPageProfileManga, setStudioPageProfileTranslations } = studioPageProfileSlice.actions

export default studioPageProfileSlice.reducer