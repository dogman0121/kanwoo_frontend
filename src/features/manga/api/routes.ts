import { ApiConfig } from "@/lib/api/api-config.type";

export const mangaApiConfig: ApiConfig = {
    "/manga": {
        GET: {
            mode: "proxy",
            url: "/manga"
        }
    },
    "/manga/check-slug": {
        GET: {
            mode: "proxy",
            url: "/manga/check_slug"
        }
    },
    "/manga/suggestions": {
        POST: {
            mode: "proxy",
            url: "/manga/suggestions"
        }
    },
    "/manga/:slug": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug"
        },
    },
    "/manga/:slug/translations": {
        GET: {
            mode: "proxy",
            url: "/translations?target_type=manga&target_id=:slug"
        }
    },
    "/manga/:slug/views": {
        POST: {
            mode: "proxy",
            url: "/manga/views"
        }
    },
    "/manga/:slug/reports": {
        POST: {
            mode: "proxy",
            url: "/manga/:slug/reports"
        }
    },
    "/manga/:slug/pages/main": {
        GET: {
            mode: "aggregate",
            urls: [
                {name: "manga", url: "/manga/:slug"},
                {name: "progress", url: "/progresses/manga/:slug"}
            ]
        }
    },
    "/manga/:slug/comments": {
        GET: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const url = new URL(req.url)

                const searchParams = url.searchParams
                searchParams.set("manga_id", params.slug)

                const newHeaders = new Headers(req.headers)

                return new Request(
                    url.origin + "/comments?" + searchParams.toString(),
                    {
                        method: "GET",
                        headers: newHeaders,
                        credentials: "include"
                    }
                )
            }
        },
        POST: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const clonedRequest = req.clone()
                const json = await clonedRequest.json()

                const url = new URL(clonedRequest.url)

                const newHeaders = new Headers(clonedRequest.headers)
                newHeaders.delete("content-length")                 
                newHeaders.set("content-type", "application/json")

                const nReq = new Request(
                    url.origin + "/comments",
                    {
                        method: "POST",
                        headers: newHeaders,
                        body: JSON.stringify({
                            manga_id: params.slug,
                            text: json.text
                        }),
                        credentials: "include"
                    }
                )

                return nReq
            }
        }
    },
    "/manga/:slug/comments/preview": {
        GET: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const url = new URL(req.url)

                const searchParams = url.searchParams
                searchParams.set("manga_id", params.slug)

                const newHeaders = new Headers(req.headers)

                return new Request(
                    url.origin + "/comments/preview?" + searchParams.toString(),
                    {
                        method: "GET",
                        headers: newHeaders,
                        credentials: "include"
                    }
                )
            }
        }
    },
    "/manga/:slug/progresses": {
        GET: {
            mode: "proxy",
            url: "/progresses/manga/:slug"
        },
        DELETE: {
            mode: "proxy",
            url: "/manga/:slug/progresses"
        }
    }
}