import { createSelector } from "@reduxjs/toolkit"
import { translationsAdapter } from "./adapters"
import { RootState, TranslationBlock } from "./state"
import { Translation } from "@/types/translation"
import { useAppSelector } from "@/lib/state/hooks"

export const {
    selectAll: selectTranslationsBlocks,
    selectById: selectTranslationBlockById
} = translationsAdapter.getSelectors((state: RootState) => state.mangaPage.translations)


export const selectCurrTranslationId = (state: RootState) => {
    return state.mangaPage.translations.currTranslationId
}

export const selectCurrTranslationBlock = (state: RootState) => {
    const currTranslationId = state.mangaPage.translations.currTranslationId
    if (!currTranslationId)
        return null

    return selectTranslationBlockById(state, currTranslationId)
}

export const selectTranslationById = (state: RootState, translationId: number) => {
    const translationBlock = selectTranslationBlockById(state, translationId)
    if (!translationBlock) throw new Error("No transtaltion with id")
        
    return translationBlock.translation
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

export const selectCurrTranslationChapters = createSelector(
    [selectCurrTranslationBlock],
    (translationBlock: TranslationBlock | null) => {
        if (!translationBlock || !translationBlock.chapters) return undefined

        return translationBlock.chapters.map(c => c.chapter)
    }
)

export const selectTranslationIsSubscribed = (state: RootState, translationId: number) => {
    const translationBlock = selectTranslationBlockById(state, translationId)

    if (!translationBlock) return false

    return translationBlock.context.viewer.is_subscribed
}

export const selectCurrTranslationIsSubscribed = createSelector(
    [selectCurrTranslationBlock],
    (translationBlock: TranslationBlock | null) => {
        if (!translationBlock) return false

        return translationBlock.context.viewer.is_subscribed
    }
)

export const selectIsLoading = (state: RootState) => {
    return state.mangaPage.translations.loading
}

export const selectIsLoaded = (state: RootState) => {
    return state.mangaPage.translations.loaded
}

export const selectCurrentTranslationChaptersIsLoading = (state: RootState) => {
    const currentTranslationBlock = selectCurrTranslationBlock(state)
    if (!currentTranslationBlock) return false

    return currentTranslationBlock.chaptersIsLoading

}