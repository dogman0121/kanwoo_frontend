import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { translationsAdapter } from "./adapters"
import { ChapterEntity, initialState, TranslationBlock } from "./state"
import { mangaClientApi } from "@/lib/fetch/features/manga/client.api"
import { translationClientApi } from "@/lib/fetch/features/translation/client.api"
import { ApiError } from "@/lib/fetch/api-response.types"


export const fetchTranslations = createAsyncThunk(
    "manga_page_translation/fetchTranslationsState",
    async (mangaSlug: string, thunkAPI) => {
        try {
            const response = await mangaClientApi.getTranslations(mangaSlug)

            return {
                mangaId: mangaSlug,
                response: response
            }
        } catch (e) {
            if (e instanceof ApiError) {
                thunkAPI.rejectWithValue(e)
            }

            throw e
        }
    }
)

export const fetchChapters = createAsyncThunk(
    "manga_page_translation/fetchChaptersState",
    async (translationId: number, thunkAPI) => {
        try {
            const response = await translationClientApi.getChapters(translationId)

            return {
                translationId,
                response
            }
        } catch (e) {
            if (e instanceof ApiError) {
                thunkAPI.rejectWithValue(e)
            } 

            throw e
        }
    }
)

export const subscribeTranslation = createAsyncThunk(
    "manga_page_translation/subscribeTranslationState",
    async (translationId: number) => {

    }
)

export const translationSlice = createSlice({
    name: "manga_page_translation",
    initialState,
    reducers: {
        setTranslations: translationsAdapter.setAll,
        setCurrTranslation: (state, action: PayloadAction<number>) => {
            state.currTranslationId = action.payload
        },
        reverseChapters: (state, action: PayloadAction<number>) => {
            const chapters = state.entities[action.payload].chapters
            if (chapters != undefined)
                chapters.reverse()
        },
        setTranslationsLoadingError: (state, action: PayloadAction<"no_internet" | "api_error" | null>) => {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => (builder.
        addCase(fetchTranslations.fulfilled, (state, action) => {
            const {response} = action.payload

            const translationsBlocks: TranslationBlock[] = response.data.map((t, idx) => ({
                translation: {
                    data: t,
                    context: response.context[idx]
                },
                loaded: false,
                error: null
            }))
            state.loaded = true
            state.error = null

            translationsAdapter.setAll(state, translationsBlocks)

            if (translationsBlocks.length > 0)
                state.currTranslationId = translationsBlocks[0].translation.data.id
        })
        .addCase(fetchTranslations.rejected, (state, action) => {
            state.loaded = true

            if (action.meta.rejectedWithValue) {
                state.error = "api_error"
            } else {
                state.error = "no_internet"
            }
        })
        .addCase(fetchChapters.fulfilled, (state, action) => {
            const {translationId, response} = action.payload

            const chaptersBlocks: ChapterEntity[] = response.data.map((c, idx) => ({
                data: c,
                context: response.context[idx]
            }))

            state.entities[translationId].loaded = true
            state.entities[translationId].error = null

            state.entities[translationId].chapters = chaptersBlocks
        })
        .addCase(fetchChapters.rejected, (state, action) => {
            const translationId = action.meta.arg

            if (action.meta.rejectedWithValue) {
                state.entities[translationId].error = "api_error"
            } else {
                state.entities[translationId].error = "no_internet"
            }
        })
    )
})

export const {
    setTranslations,
    setCurrTranslation,
    reverseChapters,
    setTranslationsLoadingError
} = translationSlice.actions

export default translationSlice.reducer