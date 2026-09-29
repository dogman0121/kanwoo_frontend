import { Chapter, ChapterContext, ChapterMetadata } from "@/types/chapter"
import { Translation, TranslationContext, TranslationMetadata } from "@/types/translation"
import { translationsAdapter } from "./adapters"

export type ChapterBlock = {
    chapter: Chapter,
}

export type TranslationBlock = {
    translation: Translation,
    context: TranslationContext,
    chapters?: ChapterBlock[],
    chaptersIsLoading: boolean
}

export type TranslationsStateWithoutAdapter = {
    currTranslationId?: number,
    loading: boolean,
    loaded: boolean
}

export const initialState = translationsAdapter.getInitialState({
    currentTransation: undefined,
    loading: false,
    loaded: false
} as TranslationsStateWithoutAdapter)

export type TranslationsState = typeof initialState

export type RootState = {
    mangaPage: {translations: TranslationsState}
}
