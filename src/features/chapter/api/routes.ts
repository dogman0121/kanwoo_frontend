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
                searchParams.set("target_type", "chapter")
                searchParams.set("target_id", params.id)

                return new Request(
                    url.origin + "/comments?" + searchParams.toString(),
                    {
                        ...req
                    }
                )
            }
        },
        POST: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const clonedRequest = req.clone()
                const json = await clonedRequest.json()

                const url = new URL(req.url)

                return new Request(
                    url.origin + "/comments",
                    {
                        ...req,
                        body: JSON.stringify({
                            type: "chapter",
                            entity_id: params.id,
                            text: json.text
                        })
                    }
                )
            },   
        }
    },
    "/chapters/:id/comments/preview": {
        GET: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const url = new URL(req.url)

                const searchParams = url.searchParams
                searchParams.set("target_type", "chapter")
                searchParams.set("target_id", params.id)

                return new Request(
                    url.origin + "/comments/preview?" + searchParams.toString(),
                    {
                        ...req
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