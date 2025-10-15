import Home from "@/types/home";
import { createSlice } from "@reduxjs/toolkit";

export interface HomeState {
    home: Home | null | undefined
}

const initialState: HomeState = {
    home: undefined
}

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setHome: (state, action) => {
            state.home = action.payload
        }
    }
})

export const { setHome } = homeSlice.actions

export default homeSlice.reducer