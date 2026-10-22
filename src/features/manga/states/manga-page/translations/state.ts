import { Chapter, ChapterContext, ChapterMetadata } from "@/types/chapter"
import { Translation, TranslationContext, TranslationMetadata } from "@/types/translation"
import { translationsAdapter } from "./adapters"
import { Entity } from "@/lib/types/Entity.type"

export type ChapterEntity = Entity<Chapter, ChapterContext>

export type TranslationEntity = Entity<Translation, TranslationContext>

export type TranslationBlock = {
    translation: TranslationEntity,
    chapters?: ChapterEntity[],
    loaded: boolean, // Загружены ли главы
    error: "no_internet" | "api_error" | null
}

export type TranslationsStateWithoutAdapter = {
    currTranslationId?: number,
    loaded: boolean // Загружены ли переводы
    error: "no_internet" | "api_error" | null
}

export const initialState = translationsAdapter.getInitialState({
    currTranslationId: undefined,
    loaded: false,
    error: null
} as TranslationsStateWithoutAdapter)

export type TranslationsState = typeof initialState

export type RootState = {
    mangaPage: {translations: TranslationsState}
}
