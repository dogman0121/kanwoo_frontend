import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { progressClientAPI } from "../../api/client.api";
import { stat } from "fs";

type Progress = {
    progress: ReadingProgress,
    progressContext: ReadingProgressContext,
}

interface HistoryPageStateWithoutAdapter {
    progresses: Record<string, number[]>,
    progressDates: string[],
    selectedProgresses: Record<number, string>,
    hasMore: boolean,
    cursor?: Record<string, unknown>,
    ui: {
        allSelected: boolean
    }
}

const progressesAdapter = createEntityAdapter({
    selectId: (progress: Progress) => progress.progress.id
})

const initialState = progressesAdapter.getInitialState({
    progresses: {},
    progressDates: [],
    selectedProgresses: {},
    hasMore: true,
    ui: {
        allSelected: false
    }
} as HistoryPageStateWithoutAdapter)

type HistoryPageState = typeof initialState

type RootState = {
    authProfileHistoryPage: HistoryPageState
}

function parseDate(dateString: string) {
    return dateString.split("T")[0]
}

export const loadHistory = createAsyncThunk(
    "history_page/loadHistoryStatus",
    async (cursor?: Record<string, unknown>) => {
        const response = await progressClientAPI.getHistory(cursor)

        return {
            response
        }
    }
)

const historyPageSlice = createSlice({
    name: "history_page",
    initialState,
    reducers: {
        setAllSelected: (state, action) => {
            state.ui.allSelected = action.payload
            if (!action.payload) {
                state.selectedProgresses = {}
            }
        },
        setProgressSelected: (state, action: PayloadAction<{progressID: number, selected: boolean}>) => {
            const {progressID, selected} = action.payload;
            const progressDate = parseDate(state.entities[progressID].progress.created_at)

            if (!selected)
                delete state.selectedProgresses[progressID];
            else
                state.selectedProgresses[progressID] = progressDate;
        },
    },
    extraReducers: (builder) => (builder
        .addCase(loadHistory.fulfilled, (state, action) => {
            const {response} = action.payload

            const progresses = response.data
            const progressesContexts = response.context

            for (let i=0; i < progresses.length; i++) {
                const progress = progresses[i]
                const progressContext = progressesContexts[i]
                const date = parseDate(progress.created_at)

                if (!(date in state.progresses)){
                    state.progressDates.push(date)
                    state.progresses[date] = []
                }

                progressesAdapter.setOne(state, {
                    progress: progress,
                    progressContext: progressContext
                })
                state.progresses[date].push(progress.id)
            }

            state.hasMore = response.pagination.has_more
            state.cursor = response.pagination.cursor
        })
    )
})

export const {
    selectById: selectProgressByID
} = progressesAdapter.getSelectors((state: RootState) => state.authProfileHistoryPage)

export const selectDates = (state: RootState) => state.authProfileHistoryPage.progressDates 
export const selectDateHistory = (state: RootState, date: string) => {
    const progressesIDs = state.authProfileHistoryPage.progresses[date]

    return progressesIDs.map(progressID => selectProgressByID(state, progressID))
}
export const selectIsAllSelected = (state: RootState) => state.authProfileHistoryPage.ui.allSelected
export const selectIsProgressSelected = (state: RootState, progressID: number) => (
    state.authProfileHistoryPage.selectedProgresses[progressID] != undefined
)
export const selectHasMore = (state: RootState) => state.authProfileHistoryPage.hasMore
export const selectCursor = (state: RootState) => state.authProfileHistoryPage.cursor
export const selectDeleteDisabled = (state: RootState) => !state.authProfileHistoryPage.ui.allSelected && Object.entries(state.authProfileHistoryPage.selectedProgresses).length == 0

export const {
    setAllSelected,
    setProgressSelected
} = historyPageSlice.actions

export default historyPageSlice.reducer;