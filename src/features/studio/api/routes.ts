import { ApiConfig } from "@/lib/api/api-config.type";

export const studioApiConfig: ApiConfig = {
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
    "/profiles/:slug/collections": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/collections"
        },
        POST: {
            mode: "proxy",
            url: "/profiles/:slug/collections"
        }
    },
    "/profiles/:slug/manga": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/manga"
        },
        POST: {
            mode: "proxy",
            url: "/profiles/:slug/manga"
        }
    },
    "/profiles/:slug/translations": {
        GET: {
            mode: "proxy",
            url: "/profiles/:slug/translations"
        },
        POST: {
            mode: "proxy",
            url: "/profiles/:slug/translations"
        }
    },
    "/manga/:slug": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug"
        },
        PUT: {
            mode: "proxy",
            url: "/manga/:slug"
        }
    },
    "/manga/:slug/translations": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug/translations"
        },
        POST: {
            mode: "proxy",
            url: "/manga/:slug/translations"
        }
    },
    "/manga/:slug/forms/edit": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug/forms/edit"
        }
    },
    "/translations/:id": {
        GET: {
            mode: "proxy",
            url: "/translations/:id"
        },
        PUT: {
            mode: "proxy",
            url: "/translationa/:id"
        }
    },
    "/translations/:id/chapters": {
        GET: {
            mode: "proxy",
            url: "/translations/:id/chapters"
        },
        POST: {
            mode: "proxy",
            url: "/translations/:id/chapters"
        }
    },
    "/chapters/:id": {
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