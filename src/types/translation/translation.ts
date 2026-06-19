import Language from "../language"
import Manga from "../manga/manga"
import Privacy from "../privacy"
import Profile from "../profile/profile"

export default interface Translation {
    id: number
    name: string,
    manga?: Manga,
    privacy: Privacy,
    lang: Language,
    created_at: string,
    creator: Profile,
    owner: Profile,
    chapters_count: number,
    is_official: boolean,
}