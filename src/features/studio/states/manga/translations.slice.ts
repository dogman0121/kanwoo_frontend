import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudioManga } from "../../types/studio-manga.type";
import { Translation, TranslationContext } from "@/types/translation";
import { Entity } from "@/lib/types/Entity.type";
import { StudioTranslation } from "../../types/studio-translation.type";

const translationAdapter = createEntityAdapter({
    selectId: (translation: Entity<StudioTranslation, TranslationContext>) => translation.data.id
})

const initialState = translationAdapter.getInitialState()

type RootState = {
    studio: {manga: {translations: typeof initialState}}
}

export const profileTranslationSlice = createSlice({
    name: "studio_manga_translations",
    initialState,
    reducers: {
        setTranslationsList: (state, action: PayloadAction<Entity<StudioTranslation, TranslationContext>[]>) => {
            translationAdapter.setMany(state, action.payload)
        },
        addTranslation: (state, action: PayloadAction<Entity<StudioTranslation, TranslationContext>>) => {
            translationAdapter.addOne(state, action.payload)
        }
    }
})

export const {
    selectAll: selectTranslations
} = translationAdapter.getSelectors((state: RootState) => state.studio.manga.translations)

export const { 
    setTranslationsList,
    addTranslation
} = profileTranslationSlice.actions

export default profileTranslationSlice.reducer