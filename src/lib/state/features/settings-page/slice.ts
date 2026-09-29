import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
    security?: {
        password_auth_enabled: boolean, 
        yandex_oauth_enabled: boolean
    },
}

const initialState: SettingsState = {
    security: undefined,
}

export const securitySlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setSecuritySettings: (state, action) => {
            state.security = action.payload
        },
    }
})

export const { setSecuritySettings } = securitySlice.actions

export default securitySlice.reducer