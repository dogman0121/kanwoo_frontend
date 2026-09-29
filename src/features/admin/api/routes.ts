import { ApiConfig } from "@/lib/api/api-config.type";

export const adminApiConfig: ApiConfig = {
    "/admin/dashboards/main": {
        GET: {
            mode: "proxy",
            url: "/admin/dashboards/main"
        }
    },
    "/admin/feedbacks": {
        GET: {
            mode: "proxy",
            url: "/feedbacks"
        }
    },
    "/admin/feedbacks/:id": {
        GET: {
            mode: "proxy",
            url: "/feedbacks/:id"
        }
    },
    "/admin/manga": {
        GET: {
            mode: "proxy",
            url: "/admin/manga"
        }
    },
    "/admin/manga/:slug": {
        GET: {
            mode: "proxy",
            url: "/admin/manga/:slug"
        },
        PUT: {
            mode: "proxy",
            url: "/admin/manga/:slug"
        }
    },
    "/admin/manga/:slug/moderation-status": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug/moderation"
        },
        PUT: {
            mode: "proxy",
            url: "/manga/:slug/moderation"
        }
    },
    "/admin/manga/:slug/moderation-history": {
        GET: {
            mode: "proxy",
            url: "/manga/:slug/moderation/history"
        }
    },
    "/admin/manga/suggestions": {
        GET: {
            mode: "proxy",
            url: "/manga/suggestions"
        }
    },
    "/admin/profiles": {
        GET: {
            mode: "proxy",
            url: "/admin/profiles"
        }
    },
    "/admin/reports/:id": {
        PUT: {
            mode: "proxy",
            url: "/reports/:id"
        }
    },
    "/admin/reports/manga": {
        GET: {
            mode: "proxy",
            url: "/reports?target_type=manga"
        }
    },
    "/admin/reports/chapters": {
        GET: {
            mode: "proxy",
            url: "/reports?target_type=chapter"
        }
    }
}