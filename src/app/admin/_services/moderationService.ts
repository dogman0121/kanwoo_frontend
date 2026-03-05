"use client"

import { ModerationFilterType } from "../_components/ModerationFiltersGroup"


class AdminModerationService {
    compileModerationStatusFilters(moderationTypes: ModerationFilterType) {
        const urlSearchParams = new URLSearchParams()

        if (moderationTypes.approved)
            urlSearchParams.append("status", "1")
        if (moderationTypes.rejected)
            urlSearchParams.append("status", "2")
        if (moderationTypes.waiting)
            urlSearchParams.append("status", "3")
        

        return urlSearchParams
    } 
}

export const adminModerationService = new AdminModerationService()