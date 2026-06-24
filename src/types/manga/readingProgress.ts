import Chapter from "../chapter/chapter";
import Manga from "./manga";

export default interface ReadingProgress {
    id: number,
    manga: Manga,
    chapter: Chapter,
    page: number
    chapters_count: number
}