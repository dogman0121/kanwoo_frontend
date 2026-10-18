import { Chapter } from "@/types/chapter";
import { Profile } from "@/types/profile";
import ProfilePermission from "@/types/profile/profilePermission";
import { createSlice } from "@reduxjs/toolkit";

export interface StudioChapterState {
    chapter?: Chapter,
}

const initialState: StudioChapterState = {
}

type RootState = {
    studio: {chapter: {page: StudioChapterState}}
}

export const studioProfileSlice = createSlice({
    name: "studio_profile",
    initialState,
    reducers: {
        setStudioChapter: (state, action) => {
            state.chapter = action.payload
        },
    }
})

export const selectChapter = (state: RootState) => {
    return state.studio.chapter.page.chapter
}

export const { 
    setStudioChapter
} = studioProfileSlice.actions

export default studioProfileSlice.reducer