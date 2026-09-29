import { ApiConfig } from "@/lib/api/api-config.type";

export const commentApiConfig: ApiConfig = {
    "/comments": {
        GET: {
            mode: "proxy",
            url: "/comments"
        }
    },
    "/comments/:id/replies": {
        GET: {
            mode: "proxy",
            url: "/comments/:id/replies"
        },
        POST: {
            mode: "proxy",
            url: "/comments/:id/replies"
        }
    }
}