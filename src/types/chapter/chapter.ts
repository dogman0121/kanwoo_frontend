import Manga from "../manga/manga";
import Privacy from "../privacy";
import Profile from "../profile/profile";
import Translation from "../translation/translation";
import Page from "./page";

export default interface Chapter {
    id: number,
    chapter: number,
    name: string,
    privacy: Privacy,
    pages?: Page[],
    translation?: Translation,
    created_at: string,
    creator: Profile,
    prev_chapter_id: number,
    next_chapter_id: number,
    manga: Manga
}