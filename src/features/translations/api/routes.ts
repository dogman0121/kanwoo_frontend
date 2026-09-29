import { ApiConfig } from "@/lib/api/api-config.type";

export const translationApiConfig: ApiConfig = {
    "/translations": {
        GET: {
            mode: "proxy",
            url: "/translations"
        }
    },
    "/translations/:id": {
        GET: {
            mode: "proxy",
            url: "/translations/:id"
        }
    },
    "/translations/:id/subscribtions": {
        POST: {
            mode: "proxy",
            url: "/translations/:id/subscribtions"
        },
        DELETE: {
            mode: "proxy",
            url: "/translations/:id/subscribtions"
        }
    },
    "/translations/:id/chapters": {
        GET: {
            mode: "proxy",
            url: "/chapters?target_type=translation&target_id=:id"
        }
    }
}