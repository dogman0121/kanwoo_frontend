import Manga from "./manga";
import User from "./user";

export default interface List {
    id: number,
    name: string,
    description: string,
    saves_count: number,
    creator: User,
    created_at: string,
    manga: Manga[]
}