import MainDashboard from "@/types/admin/dashboards/mainDashboard";
import { createSlice } from "@reduxjs/toolkit";

export interface AdminPageState {
    mainDashboard?: MainDashboard
}

const initialState: AdminPageState = {
    mainDashboard: undefined
}

export const adminPageSlice = createSlice({
    name: "admin_page",
    initialState,
    reducers: {
        setAdminPageMainDashboard: (state, action) => {
            state.mainDashboard = action.payload
        }
    }
})

export const { 
    setAdminPageMainDashboard
} = adminPageSlice.actions

export default adminPageSlice.reducer