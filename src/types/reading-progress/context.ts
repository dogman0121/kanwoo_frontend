import { ChapterShort } from "../chapter"
import { MangaShort } from "../manga"
import { Translation } from "../translation"

export type Context = {
    manga: MangaShort,
    chapter: ChapterShort,
    translation: Translation
}