import HeroBlock from "./home/heroBlock";
import Manga from "./manga/manga";
import ReadingProgress from "./manga/readingProgress";

export default interface Home {
    hero: HeroBlock[],
    progress: ReadingProgress[],
    newest: Manga[],
    most_viewed: Manga[],
    ended: Manga[],
}