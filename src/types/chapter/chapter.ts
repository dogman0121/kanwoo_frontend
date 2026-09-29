import Privacy from "../privacy";
import { Profile } from "../profile";
import Page from "./page";

export type ChapterShort = {
    id: number,
    chapter: number,
    name: string,
    pages_count: number
}

export type Chapter = ChapterShort & {
    privacy: Privacy,
    pages?: Page[],
    created_at: string,
    creator: Profile,
    prev_chapter_id: number,
    next_chapter_id: number,
}