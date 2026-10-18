import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudioManga } from "../../types/studio-manga.type";
import { Translation, TranslationContext } from "@/types/translation";

interface ProfileTranslationBlock {
    translation: Translation,
    translationContext: TranslationContext
}

const translationAdapter = createEntityAdapter({
    selectId: (translation: ProfileTranslationBlock) => translation.translation.id
})

const initialState = translationAdapter.getInitialState()

type RootState = {
    studio: {profile: {translations: typeof initialState}}
}

export const profileTranslationSlice = createSlice({
    name: "studio_manga_translations",
    initialState,
    reducers: {
        setTranslationsList: (state, action: PayloadAction<{translations: Translation[], translationsContext: TranslationContext[]}>) => {
            const {translations, translationsContext} = action.payload

            translationAdapter.setMany(state, translations.map((t, idx) => ({
                translation: translations[idx],
                translationContext: translationsContext[idx]
            })))
        },
    }
})

export const {
    selectAll: selectTranslations
} = translationAdapter.getSelectors((state: RootState) => state.studio.profile.translations)

export const { 
    setTranslationsList
} = profileTranslationSlice.actions

export default profileTranslationSlice.reducer