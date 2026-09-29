import { authClientApi, LoginWithYandex } from "@/features/auth/api/client.api";
import { clientFetch } from "@/lib/fetch/client-fetch.util";
import { AuthSection } from "@/features/auth/types";
import { AuthProfile, Profile } from "@/types/profile";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    profiles: AuthProfile[],
    ui: {
        isLoading: boolean,
        section: AuthSection
    }
}

const initialState: AuthState = {
    profiles: [],
    ui: {
        isLoading: false,
        section: AuthSection.LOGIN
    }
}

export const login = createAsyncThunk(
    "auth/loginStatus",
    async (data: {email: string, password: string}, thunkAPI) => {
        const response = await authClientApi.login(data.email, data.password)

        return {
            response: response
        }
    }
)

export const loginWithYandex = createAsyncThunk(
    "auth/loginWithYandexStatus",
    async (data: LoginWithYandex) => {

    }
)

export const register = createAsyncThunk(
    "auth/registerStatus",
    async (data: {email: string, password: string, login: string}) => {
        
    }
)

export const createProfile = createAsyncThunk(
    "auth/createProfileStatus",
    async (data: {name: string, slug: string}, thunkAPI) => {
        thunkAPI.dispatch(setIsLoading(true))

        try {

        } finally {
            thunkAPI.dispatch(setIsLoading(false))
        }
    }
)

export const chooseProfile = createAsyncThunk(
    "auth/selectProfileStatus",
    async (profileId: number) => {
        const response = await authClientApi.chooseProfile(profileId)

        return {
            response: response
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSection: (state: AuthState, action: PayloadAction<AuthSection>) => {
            state.ui.section = action.payload
        },
        setIsLoading: (state: AuthState, action: PayloadAction<boolean>) => {
            state.ui.isLoading = action.payload
        },
        setProfiles: (state: AuthState, action: PayloadAction<AuthProfile[]>) => {
            state.profiles = action.payload
        }
    },
    extraReducers: (builder) => (builder
        .addCase(login.fulfilled, (state, action) => {
            const {response} = action.payload 

            const profiles = response.data
            if (profiles.length == 0) {
                state.ui.section = AuthSection.CREATE_PROFILE
            } else {
                state.profiles = profiles
                state.ui.section = AuthSection.CHOOSE_PROFILE
            }
        })
    )
})

export const { 
    setSection,
    setIsLoading,
    setProfiles
} = authSlice.actions

export type RootState = {
    global: {auth: AuthState}
}

export const selectIsLoading = (state: RootState) => state.global.auth.ui.isLoading
export const selectProfiles = (state: RootState) => state.global.auth.profiles
export const selectSection = (state: RootState) => state.global.auth.ui.section

export default authSlice.reducer