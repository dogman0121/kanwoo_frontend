import Privacy from "../privacy"
import { Profile } from "../profile"
import { Adult, Genre, NameTranslation, Status, Type } from "./manga"


export type EditData = {
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
    created_at: string,
    updated_ad: string,
    privacy: Privacy
}