import { Chapter, ChapterContext } from "@/types/chapter"
import { clientFetch } from "../../client-fetch.util"

export const translationClientApi = {
    getChapters: async (translationId: number) => {
        const response = await clientFetch.get<Chapter[], null, ChapterContext[]>(`/translations/${translationId}/chapters`)

        return response
    }
}