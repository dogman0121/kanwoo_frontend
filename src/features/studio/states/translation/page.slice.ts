import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudioTranslation } from "../../types/studio-translation.type";
import { Entity } from "@/lib/types/Entity.type";
import { TranslationContext } from "@/features/translations/types";
import { ChapterCreateFormSchema } from "../../forms/CreateChapterForm";
import { studioClientAPI } from "../../api/client.api";
import { openSnackbar } from "@/features/global/states/app/slice";
import { ApiError } from "@/lib/fetch/api-response.types";

export interface StudioTranslationState {
    translation?: Entity<StudioTranslation, TranslationContext>,
    ui: {
        isNotFound: boolean,
        createChapterDialogOpen: boolean
    }
}

const initialState: StudioTranslationState = {
    ui: {
        isNotFound: false,
        createChapterDialogOpen: false
    }
}

type RootState = {
    studio: {translation: {page: StudioTranslationState}}
}

function prepareFormData(data: ChapterCreateFormSchema) {
    const formData = new FormData()

    formData.set("chapter", data.chapter.toString())
    formData.set("privacy_id", data.privacy.toString())
    data.name && formData.set("name", data.name)
    data.isExtra && formData.set("extra_number", data.extraNumber.toString())

    const pagesOrder = [];
    for (let p of data.pages) {
        pagesOrder.push(p.name)
        formData.append("pages", p.file!)
    }
    formData.set("pages_order", JSON.stringify(pagesOrder))

    return formData
}

export const createChapter = createAsyncThunk(
    "studio_translation/createChapterStatus",
    async (data: {translationId: number, form: ChapterCreateFormSchema}, thunkAPI) => {
        const {translationId, form} = data

        const formData = prepareFormData(form)

        try {
            const response = await studioClientAPI.createChapter(translationId, formData)

            thunkAPI.dispatch(openSnackbar({type: 'success', message: "Глава добавлена успешно"}))

            return {
                tranlationId: translationId,
                form: form,
                response: response
            }
        } catch (e) {
            let errorMessage = "Неизвестная ошибка"
            if (e instanceof ApiError) {
                if (e.code == "already_exists") 
                    errorMessage = "Глава уже существует"
            }
            thunkAPI.dispatch(openSnackbar({type: "error", message: `Произошла ошибка: ${errorMessage}`}))
            throw e
        }
    }
)

export const fetchTranslation = createAsyncThunk(
    "studio_translation/fetchTranslationStatus",
    async (translationId: number, thunkAPI) => {
        const response = await studioClientAPI.getTranslation(translationId)

        return {
            translationId: translationId,
            response: response
        }
    }
)

export const studioProfileSlice = createSlice({
    name: "studio_translation",
    initialState,
    reducers: {
        setStudioTranslation: (state, action) => {
            state.translation = action.payload
        },
        setCreateChapterDialogOpen: (state, action) => {
            state.ui.createChapterDialogOpen = action.payload
        },
        setIsNotFound: (state, action) => {
            state.ui.isNotFound = action.payload
        }
    },
    extraReducers: (builder) => (builder
        .addCase(fetchTranslation.fulfilled, (state, action) => {
            const {response} = action.payload

            if (!response.data){
                state.translation = undefined
                state.ui.isNotFound = true
                return
            }

            state.ui.isNotFound = false
            state.translation = {
                data: response.data 
            }
        })
        .addCase(fetchTranslation.rejected, (state, action) => {
            state.ui.isNotFound = true
        })
        .addCase(createChapter.fulfilled, (state, action) => {
            state.ui.createChapterDialogOpen = false
        })
    )
})

export const selectTranslation = (state: RootState) => {
    return state.studio.translation.page.translation?.data
}

export const selectTranslationContext = (state: RootState) => {
    return state.studio.translation.page.translation?.context
}

export const selectCreateChapterDialogOpen = (state: RootState) => {
    return state.studio.translation.page.ui.createChapterDialogOpen
}

export const selectIsNotFound = (state: RootState) => {
    return state.studio.translation.page.ui.isNotFound
}

export const { 
    setStudioTranslation,
    setCreateChapterDialogOpen,
    setIsNotFound
} = studioProfileSlice.actions

export default studioProfileSlice.reducer