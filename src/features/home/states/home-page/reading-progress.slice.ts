import { ReadingProgress, ReadingProgressContext } from "@/types/reading-progress";
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReadingProgressState {
    data: ReadingProgress,
    context: ReadingProgressContext 
}

const progressesAdapter = createEntityAdapter({
    selectId: (state: ReadingProgressState) => state.data.id
})

const initialState = progressesAdapter.getInitialState()

type RootState = {
    homePage: {progresses: typeof initialState}
};

export const deleteProgress = createAsyncThunk(
    "home_page_progresses/deleteProgressStatus",
    async (progressID: number) => {
        
    }
)

const readingRrogressSlice = createSlice({
    name: "home_page_progresses",
    initialState,
    reducers: {
        setProgresses: (
            state, 
            action: PayloadAction<{
                progresses: ReadingProgress[], 
                progressesContexts: ReadingProgressContext[]
            }>
        ) => {
            const {progresses, progressesContexts} = action.payload;

            for (let i = 0; i < progresses.length; i++) {
                progressesAdapter.setOne(state, {
                    data: progresses[i],
                    context: progressesContexts[i]
                })
            }    
        }
    }
})

export const {
    selectAll: selectProgresses
} = progressesAdapter.getSelectors((state: RootState) => state.homePage.progresses)


export const {
    setProgresses
} = readingRrogressSlice.actions

export default readingRrogressSlice.reducer