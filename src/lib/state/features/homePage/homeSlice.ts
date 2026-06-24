import Home from "@/types/home";
import { createSlice } from "@reduxjs/toolkit";

export interface HomePageState {
    home?: Home | null
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
        },

        setProgresses: (state, action) => {
            if (state.home)
                state.home.progress = action.payload
        }
    }
})

export const { setHome, setProgresses } = homePageSlice.actions

export default homePageSlice.reducer