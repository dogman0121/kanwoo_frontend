import { serverFetch } from "@/lib/fetch/server-fetch.util";
import Meta from "@/types/meta";

export const metaServerApi = {
    getMeta: async () => {
        const response =  await serverFetch.get<Meta>("/meta");

        return response
    },
}