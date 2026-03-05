import Privacy from "../privacy"
import Profile from "../profile/profile"
import Adult from "./adult"
import Genre from "./genre"
import NameTranslation from "./nameTranslation"
import Status from "./status"
import Type from "./type"


export default interface MangaEditData {
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