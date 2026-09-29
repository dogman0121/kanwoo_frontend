import { createSlice } from "@reduxjs/toolkit";

export interface StudioPageState {
    ui: {
        drawerOpen: boolean
    }
}

const initialState: StudioPageState = {
    ui: {
        drawerOpen: false
    }
}

export const studioPageSlice = createSlice({
    name: "studio_page",
    initialState,
    reducers: {
        setDrawerOpen: (state, action) => {
            state.ui.drawerOpen = action.payload
        }
    }
})

export type RootState = {
    studioPage: {page: StudioPageState}
}

export const { setDrawerOpen } = studioPageSlice.actions

export default studioPageSlice.reducer

export const selectDrawerOpen = (state: RootState) => {
    return state.studioPage.page.ui.drawerOpen
}