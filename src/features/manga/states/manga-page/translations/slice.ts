import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { translationsAdapter } from "./adapters"
import { initialState } from "./state"
import { mangaClientApi } from "@/lib/fetch/features/manga/client.api"
import { translationClientApi } from "@/lib/fetch/features/translation/client.api"


export const fetchTranslations = createAsyncThunk(
    "manga_page_translation/fetchTranslationsState",
    async (mangaSlug: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setTranslationsLoading(true))
            const response = await mangaClientApi.getTranslations(mangaSlug)

            return {
                mangaId: mangaSlug,
                response: response
            }
        } finally {
            thunkAPI.dispatch(setTranslationsLoading(false))
        }
    }
)

export const fetchChapters = createAsyncThunk(
    "manga_page_translation/fetchChaptersState",
    async (translationId: number, thunkAPI) => {
        try {
            thunkAPI.dispatch(setChaptersIsLoading({translationId: translationId, isLoading: true}))

            const response = await translationClientApi.getChapters(translationId)

            return {
                translationId: translationId,
                reponse: response
            }
        } finally {
            thunkAPI.dispatch(setChaptersIsLoading({translationId: translationId, isLoading: true}))
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
        setTranslationsLoading: (state, action) => {
            state.loading = action.payload
        },
        setChaptersIsLoading: (state, action: PayloadAction<{translationId: number, isLoading: boolean}>) => {
            state.entities[action.payload.translationId].chaptersIsLoading = action.payload.isLoading
        },
        reverseChapters: (state, action: PayloadAction<number>) => {
            const chapters = state.entities[action.payload].chapters
            if (chapters != undefined)
                chapters.reverse()
        }
    },
    extraReducers: (builder) => (builder.
        addCase(fetchTranslations.fulfilled, (state, action) => {
            const translations = action.payload.response.data
            const translationsContexts = action.payload.response.context

            const translationsBlocks = translations.map((t, ind) => ({
                translation: t,
                context: translationsContexts[ind],
                chaptersIsLoading: false
            }))
            translationsAdapter.setAll(state, translationsBlocks)

            if (translations.length > 0)
                state.currTranslationId = translations[0].id

            state.loaded = true
        })
        .addCase(fetchChapters.fulfilled, (state, action) => {
            const chapters = action.payload.reponse.data

            const chaptersBlocks = chapters.map((c, ind) => ({
                chapter: c,
            }))
            state.entities[action.payload.translationId].chapters = chaptersBlocks
        })
    )
})

export const {
    setTranslations,
    setCurrTranslation,
    setTranslationsLoading,
    setChaptersIsLoading,
    reverseChapters
} = translationSlice.actions

export default translationSlice.reducer