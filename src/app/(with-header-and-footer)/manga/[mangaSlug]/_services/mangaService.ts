import { clientFetch } from "@/lib/fetch/clientFetch";
import Manga from "@/types/manga/manga";

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