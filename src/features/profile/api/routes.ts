import { ApiConfig } from "@/lib/api/api-config.type";

export const profileApiConfig: ApiConfig = {
    "/profiles": {
        GET: {
            mode: "proxy",
            url: "/profiles"
        },
        POST: {
            mode: "proxy",
            url: "/profiles"
        }
    },
    "/profiles/me": {
        GET: {
            mode: "proxy",
            url: "/profiles/me"
        },
        PUT: {
            mode: "proxy",
            url: "/profiles/me"
        }
    },
    "/profiles/:slug": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug"
        },
        PUT: {
            mode: "proxy",
            url: "/profiles/:slug"
        }
    },
    "/profiles/:slug/pages/main": {
        GET: {
            mode: "aggregate",
            urls: [
                {name: "profile", url: "/profiles/:slug"},
            ],
        }
    },
    "/profiles/:slug/collections": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/collections"
        }
    },
    "/profiles/:slug/manga": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/collections"
        }
    },
    "/profiles/:slug/translations": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/translations"
        }
    },
    "/profiles/:slug/progresses": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/progress"
        }
    },
    "/profiles/check-slug": {
        GET: {
            mode: "proxy",
            url: "/profiles/check_slug"
        }
    },
}