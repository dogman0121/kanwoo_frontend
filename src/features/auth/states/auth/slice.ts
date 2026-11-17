import { authClientApi, YandexOauthCredentials } from "@/features/auth/api/client.api";
import { AuthSection } from "@/features/auth/types";
import { AuthProfile } from "@/types/profile";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthProfile } from "../auth-profile/auth-profile.slice";
import { YandexOauthResponse } from "@/lib/yandex-oauth/YandexOauthScript";

export interface AuthState {
    profiles: AuthProfile[],
    ui: {
        section: AuthSection
    }
}

const initialState: AuthState = {
    profiles: [],
    ui: {
        section: AuthSection.LOGIN
    }
}

export const login = createAsyncThunk(
    "auth/loginStatus",
    async (data: {email: string, password: string}, thunkAPI) => {
        const response = await authClientApi.login(data.email, data.password)

        return {
            response
        }
    }
)

export const loginWithYandex = createAsyncThunk(
    "auth/loginWithYandexStatus",
    async (data: YandexOauthCredentials) => {
        authClientApi.loginWithYandex(data)
    }
)

export const register = createAsyncThunk(
    "auth/registerStatus",
    async (data: {code: number, email: string, password: string, login: string}, thunkAPI) => {
        const {code, email, password, login} = data
        
        const response = await authClientApi.register(code, login, email, password)

        thunkAPI.dispatch(setAuthProfile(response.data))
    }
)

export const createProfile = createAsyncThunk(
    "auth/createProfileStatus",
    async (data: {name: string, slug: string}, thunkAPI) => {

        try {

        } finally {
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
        initialize: (state: AuthState) => {
            state.ui.section = AuthSection.LOGIN
        },
        setSection: (state: AuthState, action: PayloadAction<AuthSection>) => {
            state.ui.section = action.payload
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
    initialize,
    setProfiles
} = authSlice.actions

export type RootState = {
    auth: {authProcess: AuthState}
}

export const selectProfiles = (state: RootState) => state.auth.authProcess.profiles
export const selectSection = (state: RootState) => state.auth.authProcess.ui.section

export default authSlice.reducer