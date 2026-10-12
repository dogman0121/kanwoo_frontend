import { ApiConfig } from "@/lib/api/api-config.type";
import { HTTP_METHODS } from "@/lib/api/methods.type";

export const studioApiConfig: ApiConfig = {
    "/studio/profiles/:slug": {
        GET: {
            mode: "aggregate",
            urls: [
                {url: "/profiles/:slug", name: "profile", method: HTTP_METHODS.GET},
                {url: "/profiles/:slug/permissions", name: "profile_permission", method: HTTP_METHODS.GET}
            ]
        },
        PUT: {
            mode: "proxy",
            url: "/profiles/:slug"
        }
    },
    "/studio/profiles/:slug/collections": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/collections"
        },
        POST: {
            mode: "proxy",
            url: "/profiles/:slug/collections"
        }
    },
    "/studio/profiles/:slug/manga": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/manga"
        },
        POST: {
            mode: "proxy",
            url: "/profiles/:slug/manga"
        }
    },
    "/studio/profiles/:slug/translations": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/translations"
        },
        POST: {
            mode: "proxy",
            url: "/profiles/:slug/translations"
        }
    },
    "/studio/manga/:slug": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug"
        },
        PUT: {
            mode: "proxy",
            url: "/manga/:slug"
        }
    },
    "/studio/manga/:slug/translations": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug/translations"
        },
        POST: {
            mode: "proxy",
            url: "/manga/:slug/translations"
        }
    },
    "/studio/manga/:slug/forms/edit": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug/forms/edit"
        }
    },
    "/studio/translations/:id": {
        GET: {
            mode: "proxy",
            url: "/translations/:id"
        },
        PUT: {
            mode: "proxy",
            url: "/translationa/:id"
        }
    },
    "/studio/translations/:id/chapters": {
        GET: {
            mode: "proxy",
            url: "/translations/:id/chapters"
        },
        POST: {
            mode: "proxy",
            url: "/translations/:id/chapters"
        }
    },
    "/studio/chapters/:id": {
        GET: {
            mode: "proxy",
            url: "/chapters/:id"
        },
        PUT: {
            mode: "proxy",
            url: "/chapters/:id"
        }
    }
}