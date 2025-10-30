import Manga from "@/types/manga";
import { serverFetch } from "@/lib/api/serverFetch";

export const metaServerApi = {
    async getMetaInfo() {
        const {data} = await serverFetch.get("/meta");

        return data;
    },
}