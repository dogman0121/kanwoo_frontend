import Home from "@/types/home";
import { createSlice } from "@reduxjs/toolkit";

export interface HomePageState {
    home: Home | null | undefined
}

const initialState: HomePageState = {
    home: undefined
}

export const homePageSlice = createSlice({
    name: "home_page",
    initialState,
    reducers: {
        setHome: (state, action) => {
            state.home = action.payload
        }
    }
})

export const { setHome } = homePageSlice.actions

export default homePageSlice.reducer