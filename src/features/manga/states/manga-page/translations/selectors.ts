import { createSelector } from "@reduxjs/toolkit"
import { translationsAdapter } from "./adapters"
import { RootState, TranslationBlock } from "./state"
import { Translation } from "@/types/translation"
import { useAppSelector } from "@/lib/state/hooks"

export const {
    selectAll: selectTranslationsBlocks,
    selectById: selectTranslationBlockById
} = translationsAdapter.getSelectors((state: RootState) => state.mangaPage.translations)

export const selectTranslationsError = (state: RootState) => {
    return state.mangaPage.translations.error
}

export const selectTranslationsLoaded = (state: RootState) => {
    return state.mangaPage.translations.loaded
}

export const selectTranslationIsSubscribed = (state: RootState, translationId: number) => {
    return state.mangaPage.translations.entities[translationId].translation.context?.viewer.is_subscribed
}

export const selectCurrTranslationId = (state: RootState) => {
    return state.mangaPage.translations.currTranslationId
}

export const selectTranslationById = (state: RootState, translationId: number) => {
    const translationBlock = selectTranslationBlockById(state, translationId)
    if (!translationBlock) throw new Error("No transtaltion with id")
        
    return translationBlock.translation
}

export const selectCurrTranslationBlock = (state: RootState) => {
    const currTranslationId = state.mangaPage.translations.currTranslationId
    if (!currTranslationId)
        return null

    return selectTranslationBlockById(state, currTranslationId)
}

export const selectTranslations = createSelector(
    [selectTranslationsBlocks],
    (translationsBlocks: TranslationBlock[]) => {
        return translationsBlocks.map(t => t.translation)
    }
)

export const selectCurrTranslation = createSelector(
    [selectCurrTranslationBlock],
    (translationBlock: TranslationBlock | null) => {
        if (!translationBlock) return null

        return translationBlock.translation
    }
)

export const selectTranslationChaptersLoaded = (state: RootState, translationId?: number) => {
    if (!translationId)
        return false

    return state.mangaPage.translations.entities[translationId].loaded
}

export const selectTranslationChaptersError = (state: RootState, translationId?: number) => {
    if (!translationId)
        return false
    
    return state.mangaPage.translations.entities[translationId].error
}

export const selectCurrTranslationChapters = createSelector(
    [selectCurrTranslationBlock],
    (translationBlock: TranslationBlock | null) => {
        if (!translationBlock || !translationBlock.chapters) return undefined

        return translationBlock.chapters
    }
)