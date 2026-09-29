import { ApiConfig } from "@/lib/api/api-config.type";

export const searchApiConfig: ApiConfig = {
    "/search": {
        GET: {
            mode: "proxy",
            url: "/search"
        }
    }
}