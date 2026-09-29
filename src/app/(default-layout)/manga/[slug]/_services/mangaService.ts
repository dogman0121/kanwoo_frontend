import { clientFetch } from "@/lib/fetch/client-fetch.util";
import { Manga } from "@/types/manga";

class MangaService {
    async reportManga(manga: Manga, reportType: number, comment: string) {
        return await clientFetch.post(`/manga/${manga.slug}/report`, {
            body: JSON.stringify({
                type: reportType,
                comment: comment
            })
        })
    }
}


export const mangaService = new MangaService();