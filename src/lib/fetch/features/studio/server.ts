import { Profile } from "@/types/profile";
import { serverFetch } from "../../server-fetch.util"
import ProfilePermission from "@/types/profile/profilePermission";
import { Manga, MangaPermission } from "@/types/manga";

export interface StudioProfileResponse {
    profile: Profile,
    profilePermission: ProfilePermission
} 

export interface StudioMangaResponse {
    manga: Manga,
    mangaPermission: MangaPermission
} 

export const studioServerApi = {
    async getProfileInfo(slug: string) {
        return await serverFetch.get<StudioProfileResponse>(`/studio/profile/${slug}/getProfile`)
    },

    async getMangaInfo(slug: string) {
        return await serverFetch.get<StudioMangaResponse>(`/studio/manga/${slug}/getManga`)
    }
}