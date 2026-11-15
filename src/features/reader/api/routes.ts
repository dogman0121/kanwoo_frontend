import { ApiConfig } from "@/lib/api/api-config.type";
import { HTTP_METHODS } from "@/lib/api/methods.type";

export const readerRoutes: ApiConfig = {
    "/progresses/reading-sessions": {
        GET: {
            mode: "proxy",
            url: "/progresses/reading-sessions"
        }
    },
    "/progresses/reading-sessions/:id": {
        PATCH: {
            mode: "proxy",
            url: "/progresses/reading-sessions/:id"
        }
    },
    "/progresses/chapters/:id": {
        GET: {
            mode: "proxy",
            url: "/progresses/chapters/:id"
        }
    }
}