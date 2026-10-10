import { ApiConfig } from "@/lib/api/api-config.type";

export const commentApiConfig: ApiConfig = {
    "/comments": {
        GET: {
            mode: "proxy",
            url: "/comments"
        },
        POST: {
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
    },
    "/comments/:id/votes": {
        PATCH: {
            mode: "proxy",
            url: "/comments/:id/votes"
        }
    },
    "/comments/:id/subthreads": {
        GET: {
            mode: "proxy",
            url: "/comments/:id/subthreads"
        }
    },
    "/comments/subthreads/:id/discussion": {
        GET: {
            mode: "proxy",
            url: "/comments/subthreads/:id/discussion"
        }
    }
}