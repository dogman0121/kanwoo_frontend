import { Profile } from "@/features/profile/types/profile.type"
import { MangaPoster } from "@/types/manga"
import Privacy from "@/types/privacy"

export type CollectionPreview = MangaPoster[]


export type Collection = {
    id: number,
    name: string,
    privacy: Privacy,
    preview: CollectionPreview,
    manga_count: number,
    creator: Profile
}