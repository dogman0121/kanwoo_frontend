import { Manga, MangaContext, MangaMetadata } from "@/types/manga"
import { MangaPageContext, MangaPageData, MangaPageMetadata } from "./types"
import { Translation, TranslationContext } from "@/types/translation"
import { Comment, CommentContext } from "@/features/comment/types"
import { clientFetch } from "@/lib/fetch/client-fetch.util"
import encodeCursor from "@/lib/fetch/encode-cursor.util"
import { CursorPagination } from "@/lib/fetch/api-response.types"

export const mangaClientApi = {

    createManga: async(formData: FormData) => {
        const response = await clientFetch.post<Manga>('/manga', {
            body: formData
        })

        return response
    },

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
    },

    checkMangaSlug: async(slug: string) => {
        const response = await clientFetch.get<{available: boolean}>(`/manga/check_slug?slug=${slug}`)

        return response
    }
}