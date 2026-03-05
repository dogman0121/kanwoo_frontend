import Profile from "@/types/profile/profile";
import { serverFetch } from "../../serverFetch"
import ProfilePermission from "@/types/profile/profilePermission";
import MangaPermission from "@/types/manga/mangaPermission";
import Manga from "@/types/manga/manga";

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