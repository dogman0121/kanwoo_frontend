import { serverFetch } from "@/lib/fetch/serverFetch";
import Meta from "@/types/meta";

export const metaServerApi = {
    async getMetaInfo() {
        return await serverFetch.get<Meta>("/meta");
    },
}