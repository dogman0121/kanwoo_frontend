import Adult from "./manga/adult"
import Profile from "./profile"

export default interface Manga {
    id: number,
    slug: string,
    name: string,
    name_translations: {
        lang: string,
        name: string
    }[],
    description: string,
    poster: {
        orig: string,
        large: string,
        medium: string,
        small: string,
        thumbnail: string,
    },
    background: string,
    type: {
        id: number,
        name: string
    },
    year: number,
    status: {
        id: number,
        name: string
    },
    adult: Adult,
    genres: {
        id: number,
        name: string
    }[]
    views: number,
    saves_count: number,
    authors: Profile[],
    artists: Profile[],
    publishers: Profile[],
    promo_name: string,
    promo_logo: string,
    promo_background: string,
    creator: Profile,
    created_at: string,
    updated_ad: string
}