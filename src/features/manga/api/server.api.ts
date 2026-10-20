import { Manga, MangaContext, MangaMetadata } from "@/types/manga"
import { MangaPageContext, MangaPageData, MangaPageMetadata } from "./types"
import { serverFetch } from "@/lib/fetch/server-fetch.util"

export const mangaServerApi = {

    getMangaPage: async(slug: string) => {
        const response = await serverFetch.get<MangaPageData, MangaPageMetadata, MangaPageContext>(`/manga/${slug}/pages/main`)

        return response
    },

    getManga: async(slug: string) => {
        const response = await serverFetch.get<Manga, MangaMetadata, MangaContext>(`/manga/${slug}`)

        return response
    }
}