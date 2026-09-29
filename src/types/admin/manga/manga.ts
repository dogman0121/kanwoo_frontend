import { Adult, Genre, NameTranslation, Status, Type } from "@/types/manga/manga"
import AdminMangaModerationStatus from "./moderationStatus"
import Privacy from "@/types/privacy"
import { Profile } from "@/types/profile"

export default interface AdminManga {
    id: number,
    slug: string,
    name: string,
    name_translations: NameTranslation[],
    description: string,
    poster: {
        orig: string,
        large: string,
        medium: string,
        small: string,
        thumbnail: string,
    },
    background: string,
    type: Type,
    year: number,
    status: Status,
    adult: Adult,
    genres: Genre[]
    views: number,
    saves_count: number,
    promo_name: string,
    promo_logo: string,
    promo_background: string,
    creator: Profile,
    author: Profile,
    created_at: string,
    updated_ad: string,
    privacy: Privacy,
    moderation_status: AdminMangaModerationStatus,
    moderation_history: AdminMangaModerationStatus[]
}