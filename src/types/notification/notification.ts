import Manga from "../manga/manga"
import Profile from "../profile/profile"

export default interface Notification {
    id: number,
    manga: Manga,
    profile: Profile,
    creator: Profile
}