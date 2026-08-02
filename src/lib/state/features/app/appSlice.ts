import MainDashboard from "@/types/admin/dashboards/mainDashboard";
import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
    deviceType?: "mobile" | "desktop"
}

const initialState: AppState = {
    deviceType: undefined
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        initAppSlice: (state, action) => {
            state.deviceType = action.payload.deviceType
        },
        setAppDeviceType: (state, action) => {
            state.deviceType = action.payload
        }
    }
})

export const { 
    initAppSlice,
    setAppDeviceType
} = appSlice.actions

export default appSlice.reducer