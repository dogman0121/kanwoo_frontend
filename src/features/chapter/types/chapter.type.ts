import { Profile } from "@/features/profile/types/profile.type"
import Page from "@/types/chapter/page"
import Privacy from "@/types/privacy"

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
}