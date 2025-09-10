import Manga from "@/types/manga";
import { serverFetch } from "@/lib/api/serverFetch";

export const mangaServerApi = {
    getManga: async (slug: string): Promise<Manga> => {
        return serverFetch.get(`https://kanwoo.ru/api/v1/manga/${slug}`);
    },
}