import { Chapter } from "../chapter";
import { Manga } from "../manga";

export default interface ProfileReadingProgress {
    manga: Manga,
    chapter: Chapter,
    page: number
}