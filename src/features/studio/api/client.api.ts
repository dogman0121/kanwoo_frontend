import { ProfilePermission } from "@/features/profile/types/profile-permission.type"
import { Profile } from "@/features/profile/types/profile.type"
import { clientFetch } from "@/lib/fetch/client-fetch.util"
import { StudioManga } from "../types/studio-manga.type"
import { Translation, TranslationContext } from "@/types/translation"
import { StudioTranslation } from "../types/studio-translation.type"
import { Chapter } from "@/types/chapter"
import { StudioChapter } from "../types/studio-chapter.type"

export const studioClientAPI = {
    getProfile: async (slug: string) => {
        return clientFetch.get<Profile, null, null, null, ProfilePermission>(`/studio/profiles/${slug}`)
    },

    updateProfileInfo: async (slug: string, formData: FormData) => {
        const response = await clientFetch.put<Profile>(`/studio/profiles/${slug}`, {
            body: formData
        })

        return response
    },

    getProfileManga: async (slug: string) => {
        return await clientFetch.get<StudioManga[]>(`/studio/profiles/${slug}/manga`)
    },

    getProfileTranslations: async (slug: string) => {
        return await clientFetch.get<Translation[], null, TranslationContext[]>(`/studio/profiles/${slug}/translations`)
    },

    createManga: async (profileSlug: string, formData: FormData) => {
        const response = await clientFetch.post<StudioManga>(`/studio/profiles/${profileSlug}/manga`, {
            body: formData
        })

        return response
    },

    createProfileTranslation: async(profileSlug: string, formData: Record<string, unknown>) => {
        const response = await clientFetch.post<StudioTranslation, null, TranslationContext>(`/studio/profiles/${profileSlug}/translations`, {
            body: JSON.stringify(formData)
        }, {use_json: true})

        return response
    },

    getManga: async(slug: string) => {
        return clientFetch.get<StudioManga>(`/studio/manga/${slug}`)
    },

    updateManga: async(slug: string, formData: FormData) => {
        return clientFetch.put<StudioManga>(`/studio/manga/${slug}`, {
            body: formData
        })
    },

    getMangaTranslations: async(slug: string) => {
        return await clientFetch.get<StudioTranslation[], null, TranslationContext[]>(`/studio/manga/${slug}/translations`)
    },

    createMangaTranslation: async(profileSlug: string, formData: Record<string, unknown>) => {
        const response = await clientFetch.post<StudioTranslation, null, TranslationContext>(`/studio/manga/${profileSlug}/translations`, {
            body: JSON.stringify(formData)
        }, {use_json: true})

        return response
    },

    getTranslation: async (id: number) => {
        return clientFetch.get<StudioTranslation>(`/studio/translations/${id}`)
    },

    updateTranslation: async (id: number, data: Record<string, unknown>) => {
        return clientFetch.put<StudioTranslation>(`/studio/translations/${id}`, {
            body: JSON.stringify(data)
        }, {use_json: true})
    },

    createChapter: async (translationId: number, form: FormData) => {
        return clientFetch.post<StudioChapter>(`/studio/translations/${translationId}/chapters`, {
            body: form
        })
    },

    getTranslationChapters: async (translationId: number) => {
        return clientFetch.get<StudioChapter[]>(`/studio/translations/${translationId}/chapters`)
    },

    getChapter: async (chapterId: number) => {
        return clientFetch.get<StudioChapter>(`/studio/chapters/${chapterId}`)
    },

    updateChapter: async(chapterId: number, formData: FormData) => {
        return clientFetch.put<StudioChapter>(`/studio/chapters/${chapterId}`, {
            body: formData
        })
    }
}