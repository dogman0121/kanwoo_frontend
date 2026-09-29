import { ApiConfig } from "@/lib/api/api-config.type";

export const globalApiConfig: ApiConfig = {
    "/meta": {
        GET: {
            mode: "proxy",
            url: "/meta"
        }
    },
    "/feedbacks": {
        POST: {
            mode: "proxy",
            url: "/feedbacks"
        }
    }
}