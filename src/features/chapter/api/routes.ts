import { ApiConfig } from "@/lib/api/api-config.type";

export const chapterApiConfig: ApiConfig = {
    "/chapters/:id": {
        GET: {
            mode: "proxy",
            url: "/chapters/:id"
        }
    },
    "/chapters/:id/pages": {
        GET: {
            mode: "proxy",
            url: "/chapters/:id/pages"
        }
    },
    "/chapters/:id/ppages/main": {
        GET: {
            mode: "aggregate",
            urls: [
                {name: "chapter", url: "/chapters/:id"},
                {name: "pages", url: "/chapters/:id/pages"},
                {name: "progress", url: "/chapters/:id/progress"}
            ]
        }
    },
    "/chapters/:id/progress": {
        GET: {
            mode: "proxy",
            url: "/progresses/chapters/:id"
        },
        POST: {
            mode: "proxy",
            url: "/progresses/chapters/:id"
        }
    },
    "/chapters/:id/reports": {
        POST: {
            mode: "proxy",
            url: "/chapters/:id/reports"
        }
    },
    "/chapters/:id/comments": {
        GET: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const url = new URL(req.url)

                const searchParams = url.searchParams
                searchParams.set("chapter_id", params.id)

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
                            chapter_id: params.id,
                            text: json.text
                        }),
                        credentials: "include"
                    }
                )

                return nReq
            }
        }
    },
    "/chapters/:id/comments/preview": {
        GET: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const url = new URL(req.url)

                const searchParams = url.searchParams
                searchParams.set("chapter_id", params.id.toString())

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
    "/chapters/last-added": {
        GET: {
            mode: "proxy",
            url: "/chapters/last_added"
        }
    }
}