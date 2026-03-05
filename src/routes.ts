export const ROUTES = {
    HOME: "/",
    HISTORY: "/history",
    NOTIFICATIONS: "/notifications",
    CATALOG: "/catalog",
    LISTS: "/lists",
    STUDIO: {
        PROFILE: {
            MAIN: (profileSlug: string) => `/studio/profile/${profileSlug}`,
            MANGA: (profileSlug: string) => `/studio/profile/${profileSlug}/manga`,
            TRANSLATIONS: (profileSlug: string) => `/studio/profile/${profileSlug}/translations`,
            LISTS: (profileSlug: string) => `/studio/profile/${profileSlug}/lists`
        }
    },
    CHAPTER: (chpterId: number) => `/chapters/${chpterId}`,
    ADMIN: {
        MAIN: "/admin",
        MANGA: {
            MAIN: "/admin/manga",
            SUGGESTIONS: "/admin/manga/suggestions",
            CREATE: "/admin/manga/create"
        },
        CHAPTERS: "/admin/chapters",
        PROFILES: "/admin/profiles",
        REPORTS: "/admin/reports",
        FEEDBACK: "/admin/feedback"
    },
    MANGA: {
        MAIN: (mangaSlug: string) => `/manga/${mangaSlug}`
    }
}