import { Chapter } from "@/types/chapter";
import ChapterPermission from "@/types/chapter/permission";
import { createSlice } from "@reduxjs/toolkit";

export interface StudioPageChapterState {
    chapter?: Chapter,
    chapterPermission?: ChapterPermission,
}

const initialState: StudioPageChapterState = {
    chapter: undefined,
    chapterPermission: undefined,
}

export const studioPageMangaSlice = createSlice({
    name: "studio_page_chapter",
    initialState,
    reducers: {
        setStudioPageChapter: (state, action) => {
            state.chapter = action.payload
        },

        setStudioPageChapterPermissions: (state, action) => {
            state.chapterPermission = action.payload
        },
    }
})

export const { setStudioPageChapter, setStudioPageChapterPermissions } = studioPageMangaSlice.actions

export default studioPageMangaSlice.reducer