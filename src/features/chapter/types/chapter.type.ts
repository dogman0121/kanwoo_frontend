import { MangaShort } from "@/features/manga/types"
import { Profile } from "@/features/profile/types/profile.type"
import { Translation } from "@/features/translations/types/translation.type"
import Page from "@/types/chapter/page"
import Privacy from "@/types/privacy"
import { ReferenceEntity } from "@/types/reference-entity"

export type ChapterShort = {
    id: number,
    chapter: number,
    name: string,
    pages_count: number,
    extra_number: null | number
}

export type Chapter = ChapterShort & {
    privacy: Privacy,
    pages?: Page[],
    created_at: string,
    creator: Profile,
    prev_chapter_id: number,
    next_chapter_id: number,
    default_alignment: ReferenceEntity
}

export type Context = {
    viewer: Record<string, unknown>
    manga: MangaShort,
    translation: Translation
}