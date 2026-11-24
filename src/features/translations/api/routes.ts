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
            mode: "transform",
            transformRequest: async (req, params) => {
                const url = new URL(req.url)

                const searchParams = url.searchParams
                searchParams.set("translation_id", params.id)

                const newHeaders = new Headers(req.headers)

                return new Request(
                    url.origin + "/chapters?" + searchParams.toString(),
                    {
                        method: "GET",
                        headers: newHeaders,
                        credentials: "include"
                    }
                )
            }
        }
    }
}