import { Manga } from "./manga";
import { Profile } from "./profile";

export default interface List {
    id: number,
    name: string,
    description: string,
    saves_count: number,
    creator: Profile,
    created_at: string,
    manga: Manga[]
}