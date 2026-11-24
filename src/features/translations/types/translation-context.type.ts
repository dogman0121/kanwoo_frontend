import { MangaShort } from "@/features/manga/types"

export type Context = {
    manga?: MangaShort,
    viewer: {
        is_subscribed: boolean
    }
}