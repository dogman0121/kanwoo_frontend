import HeroBlock from "./home/heroBlock";
import Manga from "./manga/manga";

export default interface Home {
    hero: HeroBlock[],
    newest: Manga[],
    ended: Manga[],
    random: Manga[]
}