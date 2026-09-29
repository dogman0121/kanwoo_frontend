import { serverFetch } from "../../server-fetch.util"
import ProfilePermission from "@/types/profile/profilePermission";
import { GetAuthProfileResponseContext, GetAuthProfileResponseData, GetAuthProfileResponseMetadata, GetProfilePageResponseContext, GetProfilePageResponseData, GetProfilePageResponseMetadata } from "./types";
import { AuthProfile, Profile } from "@/types/profile";

export const profileServerApi = {

    async getAuthProfile() {
        const response = await serverFetch.get<AuthProfile>("/profiles/me")

        return response
    },

    async getProfile(slug: string) {
        return await serverFetch.get<Profile>(`/profiles/${slug}`)
    },
    
    async getProfilePage(slug: string) {
        return await serverFetch.get<
        GetProfilePageResponseData, 
        GetProfilePageResponseMetadata, 
        GetProfilePageResponseContext
    >(`/profiles/${slug}/pages/main`)
    },

    async getCurrentProfile() {
        return await serverFetch.get<Profile>("/profiles/current")
    },

    async getProfilePermissions(slug: string) {
        return await serverFetch.get<ProfilePermission>(`/profiles/${slug}/permissions`)
    }
}