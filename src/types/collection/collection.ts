import { MangaPoster } from "@/types/manga"
import Privacy from "../privacy"
import { Profile } from "../profile"

export type CollectionPreview = MangaPoster[]


export type Collection = {
    id: number,
    name: string,
    privacy: Privacy,
    preview: CollectionPreview,
    manga_count: number,
    creator: Profile
}