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
                {name: "progress", url: "/manga/:slug/progress"}
            ]
        }
    },
    "/manga/:slug/comments": {
        GET: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const url = new URL(req.url)

                const searchParams = url.searchParams
                searchParams.set("target_type", "manga")
                searchParams.set("target_id", params.slug)

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

                const url = new URL(clonedRequest.url)

                return new Request(
                    url.origin + "/comments",
                    {
                        ...req,
                        body: JSON.stringify({
                            type: "manga",
                            entity_id: params.slug,
                            text: json.text
                        })
                    }
                )
            }
        }
    },
    "/manga/:slug/comments/preview": {
        GET: {
            mode: "transform",
            transformRequest: async (req, params) => {
                const url = new URL(req.url)

                const searchParams = url.searchParams
                searchParams.set("target_type", "manga")
                searchParams.set("target_id", params.slug)

                return new Request(
                    url.origin + "/comments/preview?" + searchParams.toString(),
                    {
                        ...req
                    }
                )
            }
        }
    },
    "/manga/:slug/progresses": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug/progresses"
        },
        DELETE: {
            mode: "proxy",
            url: "/manga/:slug/progresses"
        }
    }
}