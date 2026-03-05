import ProfileReadingProgress from "@/types/profile/profileReadingProgress";
import { createSlice } from "@reduxjs/toolkit";

export interface HistoryPageState {
    reading_progresses?: ProfileReadingProgress[]
}

const initialState: HistoryPageState = {
    reading_progresses: undefined
}

export const historyPageSlice = createSlice({
    name: "history_page",
    initialState,
    reducers: {
        setHistoryPageReadingProgresses: (state, action) => {
            state.reading_progresses = action.payload
        }
    }
})

export const { 
    setHistoryPageReadingProgresses
} = historyPageSlice.actions

export default historyPageSlice.reducer