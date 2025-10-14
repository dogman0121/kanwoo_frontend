import Manga from "./manga";

export default interface Home {
    hero: Manga[],
    newest: Manga[],
    ended: Manga[],
    random: Manga[]
}