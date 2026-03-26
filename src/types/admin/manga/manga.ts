import Adult from "@/types/manga/adult"
import Genre from "@/types/manga/genre"
import NameTranslation from "@/types/manga/nameTranslation"
import Status from "@/types/manga/status"
import Type from "@/types/manga/type"
import Profile from "@/types/profile/profile"
import AdminMangaModerationStatus from "./moderationStatus"
import Privacy from "@/types/privacy"

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