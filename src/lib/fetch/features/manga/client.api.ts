import { Manga, MangaContext, MangaMetadata } from "@/types/manga"
import { MangaPageContext, MangaPageData, MangaPageMetadata } from "./types"
import { clientFetch } from "../../client-fetch.util"
import { Translation, TranslationContext } from "@/types/translation"
import encodeCursor from "../../encode-cursor.util"
import { CursorPagination } from "../../api-response.types"
import { Comment, CommentContext } from "@/types/comment"

export const mangaClientApi = {

    getManga: async(mangaSlug: string) => {
        const response = await clientFetch.get<Manga, MangaMetadata, MangaContext>(`/manga/${mangaSlug}`)

        return response
    },

    getMangaPage: async(mangaSlug: string) => {
        const response = await clientFetch.get<MangaPageData, MangaPageMetadata, MangaPageContext>(`/manga/${mangaSlug}`)

        return response
    },

    getTranslations: async(mangaSlug: string) => {
        const response = await clientFetch.get<Translation[], null, TranslationContext[]>(`/manga/${mangaSlug}/translations`)

        return response
    },

    getComments: async (mangaSlug: string, cursor?: Record<string, unknown>, limit?: number) => {
        const urlParams = new URLSearchParams()
        if (limit)
            urlParams.set("limit", limit.toString())

        if (cursor)
            urlParams.set('cursor', encodeCursor(cursor))

        const response = await clientFetch.get<Comment[], null, CommentContext[], CursorPagination>(`/manga/${mangaSlug}/comments?` + urlParams.toString())

        return response
    },

    addComment: async (mangaSlug: string, commentText: string) => {
        const response = await clientFetch.post<Comment, null, CommentContext>(`/manga/${mangaSlug}/comments`, {
            body: JSON.stringify({
                text: commentText
            })
        }, {use_json: true})

        return response
    },

    getCommentsPreview: async(mangaSlug: string) => {
        const response = await clientFetch.get<Comment[], {total_count: number}, CommentContext[], CursorPagination>(`/manga/${mangaSlug}/comments/preview`)

        return response
    }
}