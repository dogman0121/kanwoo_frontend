import Manga from "@/types/manga";
import { serverFetch } from "@/lib/api/serverFetch";

export const mangaServerApi = {
    getManga: async (slug: string): Promise<Manga> => {
        const {data, error}  = await serverFetch.get(`/manga/${slug}`);

        if (error)
            throw new Error("Failed to fetch manga")
        else
            return data
    },
}