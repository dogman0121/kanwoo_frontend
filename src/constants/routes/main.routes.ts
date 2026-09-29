import { compile } from "path-to-regexp";

export const routes = {
    index: "/",
    history: {
        index: "/history"
    },
    notifications: {
        index: "/notifications"
    },
    catalog: {
        index: "/catalog"
    },
    chapters: {
        item: "/chapters/:id"
    },
    manga: {
        item:  "/manga/:slug"
    },
    settings: {
        index: "/settings/security",
        security: "/settings/security"
    },
    profiles: {
        item: "/profiles/:slug"
    },
    collections: {
        index: "/collections",
        item: "/collections/:id"
    },
    studio: {
        profiles: {
            item: "/studio/profiles/:slug",
            manga: "/studio/profiles/:slug/manga",
            translations: "/studio/profiles/:slug/translations",
            collections: "/studio/profiles/:slug/collections"
        },
        manga: {
            item: "/studio/manga/:slug",
            translations: "/studio/manga/:slug/translations"
        },
        translations: {
            item: "/studio/translations/:id",
            chapters: "/studio/translations/:id/chapters"
        },
        chapters: {
            item: "/studio/chapters/:id"
        }
    },
    admin: {
        index: "/admin",
        manga: {
            index: "/admin/manga",
            suggestions: "/admin/manga/suggestions",
        },
        chapters: "/admin/chapters",
        profiles: "/admin/profiles",
        reports: "/admin/reports",
        feedbacks: "/admin/feedback"
    },
}


export function toHref(path: string, params: Record<string, string> = {}) { 
  const toPath = compile(path);

  return toPath(params);
}

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