"use client"

import { clientFetch } from "@/lib/fetch/clientFetch";
import AdminManga from "@/types/admin/manga/manga";
import AdminMangaModerationStatus from "@/types/admin/manga/moderationStatus";
import ModerationStatus from "@/types/manga/moderationStatus";
import { ModerationFilterType } from "../../_components/ModerationFiltersGroup";

class AdminMangaService {
    compileModerationStatusFilters(moderationTypes: ModerationFilterType) {
        const urlSearchParams = new URLSearchParams()
        
        if (moderationTypes.approved)
            urlSearchParams.append("status", "1")
        if (moderationTypes.rejected)
            urlSearchParams.append("status", "2")
        if (moderationTypes.waiting)
            urlSearchParams.append("status", "3")

        return moderationTypes
    }

    async setMangaStatus(manga: AdminManga, status_id: number, message?: string) {
        return await clientFetch.post<AdminMangaModerationStatus>(`/admin/manga/${manga.slug}/updateModerationStatus`, {
            body: JSON.stringify({
                status_type: status_id,
                message: message
            })
        })
    }   
}

export const adminMangaService = new AdminMangaService()