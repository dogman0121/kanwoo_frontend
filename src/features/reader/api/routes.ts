import { ApiConfig } from "@/lib/api/api-config.type";
import { HTTP_METHODS } from "@/lib/api/methods.type";

export const readerRoutes: ApiConfig = {
    "/sessions": {
        POST: {
            mode: "proxy",
            url: "/progresses"
        }
    },
    "/sessions/:sessionID": {
        PUT: {
            mode: "proxy",
            method: HTTP_METHODS.PATCH,
            url: "/progresses/:sessionID"
        }
    }
}