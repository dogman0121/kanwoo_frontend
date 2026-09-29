import { selectDeviceType } from "@/features/global/states/app/slice";
import { createSlice } from "@reduxjs/toolkit";
import { RootState as StoreState } from "@/lib/state/store";

interface ReaderSliceState {
    ui: {
        navOpen: boolean,
        endOfChapterReached: boolean,
        readingSettingsOpen: boolean,
        commentsPanelOpen: boolean
    }
}

const initialState: ReaderSliceState = {
    ui: {
        navOpen: true,
        endOfChapterReached: false,
        readingSettingsOpen: false,
        commentsPanelOpen: false
    }
}

type RootState = {
    reader: {main: ReaderSliceState}
}

const readerSlice = createSlice({
    name: "reader",
    initialState,
    reducers: {
        setNavOpen: (state, action) => {
            state.ui.navOpen = action.payload
        },
        setEndOfChapterReached: (state, action) => {
            state.ui.endOfChapterReached = action.payload
        },
        setReadingSettingsOpen: (state, action) => {
            state.ui.readingSettingsOpen = action.payload
        },
        setCommentsPanelOpen: (state, action) => {
            state.ui.commentsPanelOpen = action.payload
        },
        toggleNavOpen: (state) => {
            state.ui.navOpen = !state.ui.navOpen
        }
    }
})

export const {
    setNavOpen,
    setEndOfChapterReached,
    setReadingSettingsOpen,
    setCommentsPanelOpen,
    toggleNavOpen
} = readerSlice.actions

export const selectNavOpen = (state: RootState) => state.reader.main.ui.navOpen
export const selectEndOfChapterReached = (state: RootState) => state.reader.main.ui.endOfChapterReached
export const selectReadingSettingsOpen = (state: RootState) => state.reader.main.ui.readingSettingsOpen
export const selectCommentsPanelOpen = (state: RootState) => state.reader.main.ui.commentsPanelOpen
export const selectOffsetEnabled = (state: StoreState) => state.reader.main.ui.commentsPanelOpen && selectDeviceType(state) == "desktop"

export default readerSlice.reducer