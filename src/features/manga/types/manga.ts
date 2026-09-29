import Language from "@/types/language"
import Privacy from "@/types/privacy"
import { Profile } from "@/types/profile"

export type Adult = {
    id: number,
    name: string
}

export type Genre = {
    id: number,
    name: string
}

export type NameTranslation = {
    lang: Language,
    name: string
}

export type Status = {
    id: number,
    name: string
}

export type Type = {
    id: number,
    name: string
}

export type Poster = {
    orig: string,
    large: string,
    medium: string,
    small: string,
    thumbnail: string,
}

export type Stats = {
    views: number,
    saves: number,
}

export type MangaShort = {
    id: number,
    slug: string,
    name: string,
    poster: Poster,
    type: Type,
    year: number,
    status: Status,
    adult: Adult
}

export type Manga = MangaShort & {
    name_translations: NameTranslation[],
    description: string,
    background: string,
    genres: Genre[]
    promo_name: string,
    promo_logo: string,
    promo_background: string,
    privacy: Privacy,
    stats: Stats
    creator: Profile,
    created_at: string,
    updated_ad: string,
}