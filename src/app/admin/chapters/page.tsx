"use client"

import EditHeader, { EditPageHeader, EditPageTitle } from "@/features/edit/components/EditHeader";
import { useEffect, useState } from "react";
import EditPageContainer from "@/features/edit/components/EditPageContainer";
import { useTheme } from "@mui/material";
import { adminModerationService } from "../_services/moderationService";
import { clientFetch } from "@/lib/fetch/clientFetch";
import AdminChapter, { AdminChapterPage } from "@/types/admin/chapter/chapter";
import ModerationFiltersGroup, { ModerationFilterType } from "../_components/ModerationFiltersGroup";

export default function Page() {
    const theme = useTheme()

    const [filter, setFilter] = useState<ModerationFilterType>({
        approved: false, 
        rejected: false, 
        waiting: false
    })

    const [results, setResults] = useState<AdminChapter[]>([])

    useEffect(() => {
        if (!filter.approved && !filter.rejected && !filter.waiting)
            return setResults([])

        const urlSearchParams = adminModerationService.compileModerationStatusFilters(filter)

        clientFetch.get<AdminChapter[]>('/admin/getChapters?' + urlSearchParams.toString())
            .then(resp => {
                setResults(resp.data)
            })
    }, [filter])

    return (
        <>
            <EditPageHeader>
                <EditPageTitle>Главы</EditPageTitle>
            </EditPageHeader>
            <EditPageContainer
                sx={{
                    pt: theme.spacing(1),
                    pb: theme.spacing(4)
                }}
            >
                <ModerationFiltersGroup
                    value={filter}
                    onChange={setFilter}
                />
            </EditPageContainer>
        </>
    )
}