import { ProfilePermission } from "@/features/profile/types/profile-permission.type"
import { Profile } from "@/features/profile/types/profile.type"
import { clientFetch } from "@/lib/fetch/client-fetch.util"
import { StudioManga } from "../types/studio-manga.type"
import { Translation, TranslationContext } from "@/types/translation"

export const studioClientAPI = {
    getProfile: async (slug: string) => {
        return clientFetch.get<{profile: Profile, profile_permission: ProfilePermission}>(`/studio/profiles/${slug}`)
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

    createManga: async (slug: string, formData: FormData) => {
        const response = await clientFetch.post<StudioManga>(`/studio/profiles/${slug}/manga`, {
            body: formData
        })

        return response
    }
}