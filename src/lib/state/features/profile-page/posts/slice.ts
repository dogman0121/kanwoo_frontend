import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const postsSlice = createSlice({
    name: "profile_page_posts",
    initialState,
    reducers: {
    }
})

export const {  } = postsSlice.actions

export default postsSlice.reducer