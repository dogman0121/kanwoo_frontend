import { openSnackbar } from "@/features/global/states/app/slice";
import { mangaClientApi } from "@/features/manga/api/client.api";
import { ReadingSave } from "@/features/progress/types/reading-save.type";
import { ApiError } from "@/lib/fetch/api-response.types";
import { Entity } from "@/lib/types/Entity.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReadingProgressEntity = Entity<ReadingSave>

export interface ReadingProgressState {
    progress?: ReadingProgressEntity,
}

const initialState: ReadingProgressState = {
}

export const loadProgress = createAsyncThunk(
    "mangaPageProgress/loadProgressStatus",
    async (mangaSlug: string, thunkAPI) => {
        try {
            const response = await mangaClientApi.getMangaProgress(mangaSlug)

            return {
                response
            }
        } catch (e) {
            if (e instanceof ApiError) {
                if (e.code == "internal_error") {

                } else if (e.code == "progress_not_found") {

                } else {
                    thunkAPI.dispatch(openSnackbar({
                        type: "error",
                        message: "При получении данных произошла ошибка. Попробуйте позже."
                    }))
                }
                return thunkAPI.rejectWithValue({
                    message: e.message,
                    code: e.code,
                    detail: e.detail,
                    name: e.name
                })
            }

            return thunkAPI.rejectWithValue({ message: "Неизвестная ошибка" })
        }
    }
)

export const progressSlice = createSlice({
    name: "mangaPageProgress",
    initialState,
    reducers: {
        setProgress: (state: ReadingProgressState, action: PayloadAction<ReadingProgressEntity>) => {
            state.progress = action.payload
        }
    },
    extraReducers: (builder) => (builder
        .addCase(loadProgress.fulfilled, (state, action) => {
            const {response} = action.payload

            state.progress = {
                data: response.data
            }
        })
        .addCase(loadProgress.rejected, (state, action) => {

        })
    )
})

export type RootState = {
  mangaPage: {progress: ReadingProgressState};
};

export const { 
    setProgress
} = progressSlice.actions

export const selectReadingProgress = (state: RootState) => state.mangaPage.progress.progress?.data

export const selectReadingProgressContext = (state: RootState) => state.mangaPage.progress.progress?.context

export default progressSlice.reducer