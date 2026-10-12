import { ProfilePermission } from "@/features/profile/types/profile-permission.type"
import { Profile } from "@/features/profile/types/profile.type"
import { clientFetch } from "@/lib/fetch/client-fetch.util"

export const studioClientAPI = {
    getProfile: async (slug: string) => {
        return clientFetch.get<{profile: Profile, profile_permission: ProfilePermission}>(`/studio/profiles/${slug}`)
    },

    updateProfileInfo: async (slug: string, formData: FormData) => {
        const response = await clientFetch.put<Profile>(`/studio/profiles/${slug}`, {
            body: formData
        })

        return response
    }
}