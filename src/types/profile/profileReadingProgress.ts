import Chapter from "../chapter/chapter";
import Manga from "../manga/manga";

export default interface ProfileReadingProgress {
    manga: Manga,
    chapter: Chapter,
    page: number
}