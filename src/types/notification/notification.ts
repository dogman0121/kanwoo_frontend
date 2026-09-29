import { Manga } from "../manga";
import { Profile } from "../profile";

export default interface Notification {
    id: number,
    manga: Manga,
    profile: Profile,
    creator: Profile
}