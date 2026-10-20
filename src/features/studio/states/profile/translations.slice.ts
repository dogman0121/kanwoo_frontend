import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudioTranslation } from "../../types/studio-translation.type";
import { Entity } from "@/lib/types/Entity.type";
import { TranslationContext } from "@/types/translation";

type Translation = Entity<StudioTranslation, TranslationContext>

const translationAdapter = createEntityAdapter({
    selectId: (translation: Translation) => translation.data.id
})

const initialState = translationAdapter.getInitialState()

type RootState = {
    studio: {profile: {translations: typeof initialState}}
}

export const profileTranslationSlice = createSlice({
    name: "studio_profile_manga",
    initialState,
    reducers: {
        setTranslationsList: (state, action: PayloadAction<Translation[]>) => {

            translationAdapter.setMany(state, action.payload)
        },
        addTranslation: (state, action: PayloadAction<Translation>) => {
            translationAdapter.addOne(state, action.payload)
        }
    }
})

export const {
    selectAll: selectTranslations
} = translationAdapter.getSelectors((state: RootState) => state.studio.profile.translations)

export const { 
    setTranslationsList,
    addTranslation
} = profileTranslationSlice.actions

export default profileTranslationSlice.reducer