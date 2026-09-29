import { ApiConfig } from "@/lib/api/api-config.type";
import { HTTP_METHODS } from "@/lib/api/methods.type";

export const collectionApiConfig: ApiConfig = {
    "/collections": {
        GET :{
            mode: "proxy",
            url: "/collections"
        },
        POST: {
            mode: "proxy",
            url: "/collections"
        }
    },
    "/collections/:id": {
        GET: {
            mode: "proxy",
            url: "/collections/:id"
        },
        PUT: {
            mode: "proxy",
            url: "/collections/:id"
        },
        DELETE: {
            mode: "proxy",
            url: "/collections/:id"
        }
    },
    "/collections/:id/manga": {
        GET: {
            mode: "proxy",
            url: "/collections/:id/manga"
        },
        POST: {
            mode: "proxy",
            method: HTTP_METHODS.PATCH,
            url: "/collections/:id/manga"
        },
        DELETE: {
            mode: "proxy",
            url: "/collections/:id/manga"
        }
    }
}