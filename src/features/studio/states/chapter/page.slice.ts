import { Chapter } from "@/types/chapter";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studioClientAPI } from "../../api/client.api";
import { Entity } from "@/lib/types/Entity.type";
import { StudioChapter } from "../../types/studio-chapter.type";
import { ChapterUpdateFormSchema } from "../../forms/UpdateChapterInfoForm";
import { openSnackbar } from "@/features/global/states/app/slice";
import { ApiError } from "@/lib/fetch/api-response.types";

export interface StudioChapterState {
    chapter?: Entity<StudioChapter>,
    ui: {
        isNotFound: boolean
    }
}

const initialState: StudioChapterState = {
    ui: {
        isNotFound: false
    }
}

type RootState = {
    studio: {chapter: {page: StudioChapterState}}
}

export const fetchChapter = createAsyncThunk(
    "studio_chapter/fetchChapterStatus",
    async (chapterId: number) => {
        const response = await studioClientAPI.getChapter(chapterId)

        return {
            chapterId,
            response
        }
    }
)

function prepareFormData(data: ChapterUpdateFormSchema) {
    const formData = new FormData()

    formData.set("chapter", data.chapter.toString())
    formData.set("privacy_id", data.privacy.toString())
    data.name && formData.set("name", data.name)
    data.isExtra && formData.set("extra_number", data.extraNumber.toString())

    const pagesOrder = [];
    for (let p of data.pages) {
        if (p.file) {
            pagesOrder.push(p.name)
            formData.append("pages", p.file)
        } else {
            pagesOrder.push(p.uuid)
        }
    }
    formData.set("pages_order", JSON.stringify(pagesOrder))

    return formData
}

export const updateChapter = createAsyncThunk(
    "studio_chapter/updateChapterStatus",
    async (data: {chapterId: number, form: ChapterUpdateFormSchema}, thunkAPI) => {
        const {chapterId, form} = data

        const formData = prepareFormData(form)

        try {
            const response = await studioClientAPI.updateChapter(chapterId, formData)

            thunkAPI.dispatch(openSnackbar({type: "success", message: "Глава обновлена успешно"}))
            return {
                chapterId,
                form,
                response
            }
        } catch (e) {
            let errorMessage = "Неизвестная ошибка"
            if (e instanceof ApiError) {
                if (e.code == "already_exists")
                    errorMessage = "Глава уже существует"
            }
            thunkAPI.dispatch(openSnackbar({type: "error", message: `Ошибка: ${errorMessage}`}))
            throw e
        }
    }
)

export const studioProfileSlice = createSlice({
    name: "studio_profile",
    initialState,
    reducers: {
        setStudioChapter: (state, action) => {
            state.chapter = action.payload
        },
    },
    extraReducers: (builder) => (builder
        .addCase(fetchChapter.fulfilled, (state, action) => {
            const {response} = action.payload

            if (!response.data){
                state.chapter = undefined
                state.ui.isNotFound = true
                return
            }

            state.ui.isNotFound = false
            state.chapter = {
                data: response.data 
            }
        })
        .addCase(fetchChapter.rejected, (state, action) => {
            state.ui.isNotFound = true
        })
        .addCase(updateChapter.fulfilled, (state, action) => {
            const {response} = action.payload

            state.chapter = {
                data: response.data
            }
        })
    )
})

export const selectChapter = (state: RootState) => {
    return state.studio.chapter.page.chapter?.data
}

export const { 
    setStudioChapter
} = studioProfileSlice.actions

export default studioProfileSlice.reducer