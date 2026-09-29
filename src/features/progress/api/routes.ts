import { ApiConfig } from "@/lib/api/api-config.type";

export const progressApiConfig: ApiConfig = {
    "/progresses": {
        GET: {
            mode: "proxy",
            url: "/progresses"
        }
    },
    "/progresses/:id": {
        DELETE: {
            mode: "proxy",
            url: "/progresses/:id"
        }
    },
    "/history": {
        GET: {
            mode: "proxy",
            url: "/progresses/history"
        }
    }
}