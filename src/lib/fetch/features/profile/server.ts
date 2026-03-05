import Profile from "@/types/profile/profile";
import { serverFetch } from "../../serverFetch"
import ProfilePermission from "@/types/profile/profilePermission";

export const profileServerApi = {
    async getProfile(slug: string) {
        return await serverFetch.get<Profile>(`/profiles/${slug}`)
    },

    async getCurrentProfile() {
        return await serverFetch.get<Profile>("/profiles/current")
    },

    async getProfilePermissions(slug: string) {
        return await serverFetch.get<ProfilePermission>(`/profiles/${slug}/permissions`)
    }
}