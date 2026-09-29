import { Manga } from "@/types/manga";
import { ModerationStatus } from "@/types/manga/moderationStatus";
import Privacy from "@/types/privacy";
import { Profile } from "@/types/profile";

export interface AdminChapterPage {
    uuid: string,
    link: string,
    orig_filename: string
}

export default interface AdminChapter {
    id: number,
    chapter: number,
    name: string,
    privacy: Privacy,
    pages?: AdminChapterPage[],
    created_at: string,
    creator: Profile,
    manga: Manga,
    moderation_status: ModerationStatus,
    moderation_history: ModerationStatus[]
}