import { Manga, MangaContext, MangaMetadata } from "@/types/manga"
import { serverFetch } from "../../server-fetch.util"
import { MangaPageContext, MangaPageData, MangaPageMetadata } from "./types"

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