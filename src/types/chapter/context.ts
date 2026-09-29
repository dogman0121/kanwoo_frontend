import { MangaShort } from "../manga/manga"
import { TranslationShort } from "../translation"

export type Context = {
    viewer: Record<string, unknown>
    manga: MangaShort,
    translation: TranslationShort
}