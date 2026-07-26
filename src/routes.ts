export const ROUTES = {
    HOME: "/",
    HISTORY: "/history",
    NOTIFICATIONS: "/notifications",
    CATALOG: "/catalog",
    LISTS: "/lists",
    STUDIO: {
        PROFILE: {
            MAIN: (profileSlug: string) => `/studio/profiles/${profileSlug}`,
            MANGA: {
                MAIN: (profileSlug: string) => `/studio/profiles/${profileSlug}/manga`,
                CREATE: (profileSlug: string) => `/studio/profiles/${profileSlug}/create`
            },
            TRANSLATIONS: (profileSlug: string) => `/studio/profiles/${profileSlug}/translations`,
            COLLECTIONS: (profileSlug: string) => `/studio/profiles/${profileSlug}/collections`
        },
        MANGA: {
            MAIN: (mangaSlug: string) => `/studio/manga/${mangaSlug}`
        },
        TRANSLATION: {
            MAIN: (translationId: number) => `/studio/translations/${translationId}`,
            CHAPTERS: {
                MAIN: (translationId: number) => `/studio/translations/${translationId}/chapters`,
                CREATE: (translationId: number) =>  `/studio/translations/${translationId}/chapters/create`
            }
        },
        CHAPTER: {
            MAIN: (chapterId: number) => `/studio/chapters/${chapterId}`
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
    },
    SETTINGS: {
        MAIN: "/settings/security",
        SECUTIRY: "/settings/security"
    },
    PROFILE: {
        MAIN: (profileSlug: string) => `/profile/${profileSlug}`
    }
}