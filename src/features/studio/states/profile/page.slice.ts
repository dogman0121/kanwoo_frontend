import { Entity } from "@/lib/types/Entity.type";
import { Profile } from "@/types/profile";
import ProfilePermission from "@/types/profile/profilePermission";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileUpdateInfoFormSchema } from "../../forms/UpdateProfileInfoForm";
import { studioClientAPI } from "../../api/client.api";
import { openSnackbar } from "@/features/global/states/app/slice";
import { ApiError } from "@/lib/fetch/api-response.types";
import prepareFileAction from "../../lib/prepare-file-action";

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

function prepareUpdateProfileInfoFormData(data: ProfileUpdateInfoFormSchema) {
    const formData = new FormData()

    formData.set("name", data.name)
    formData.set("slug", data.slug)
    formData.set("avatar_action", prepareFileAction(data.avatar))
    formData.set("about", data.about)
    formData.set("links", JSON.stringify(data.links))
    
    if (data.avatar)
        formData.set("avatar", data.avatar)

    return formData
}

export const updateProfileInfo = createAsyncThunk(
    "studioProfile/updateProfileInfoStatus",
    async (data: {profileSlug: string, form: ProfileUpdateInfoFormSchema}, thunkAPI) => {
        const {profileSlug, form} = data
        
        const formData = prepareUpdateProfileInfoFormData(form)

        try {
            const response = await studioClientAPI.updateProfileInfo(profileSlug, formData)

            thunkAPI.dispatch(openSnackbar({type: 'success', message: "Глава добавлена успешно"}))

            return {
                response: response
            }
        } catch (e) {
            let errorMessage = "Неизвестная ошибка"

            thunkAPI.dispatch(openSnackbar({type: "error", message: `Произошла ошибка: ${errorMessage}`}))
            throw e
        }
    }
)

export const studioProfileSlice = createSlice({
    name: "studioProfile",
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
    },
    extraReducers: (builder) => (builder
        .addCase(updateProfileInfo.fulfilled, (state, action) => {
            const {response} = action.payload

            state.profile = {
                data: response.data,
                context: response.context
            }
        })
    )
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