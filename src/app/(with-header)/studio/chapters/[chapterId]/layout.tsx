"use client"

import { clientFetch } from "@/lib/fetch/clientFetch"
import Chapter from "@/types/chapter/chapter";
import ChapterPermission from "@/types/chapter/chapterPermission";
import StudioChapterDrawer from "./_components/StudioChapterDrawer";
import { Box } from "@mui/material";
import EditLayout from "@/features/edit/components/EditLayout";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { useEffect } from "react";
import { setStudioPageTranslation } from "@/lib/state/features/studioPage/studioPageTranslationSlice";
import { setStudioPageChapter, setStudioPageChapterPermissions } from "@/lib/state/features/studioPage/studioPageChapterSlice";
import { useParams } from "next/navigation";

interface ChapterInfo {
    chapter: Chapter,
    chapterPermission: ChapterPermission
}

export default function Layout({
    children
}: {
    children: React.ReactNode,
}) {
    const { chapterId } = useParams();

    const dispatch = useAppDispatch()
    const chapter = useAppSelector(state => state.studioPageChapter.chapter)


    useEffect(() => {
        clientFetch.get<ChapterInfo>(`/studio/chapters/${chapterId}`)
            .then(response => {
                dispatch(setStudioPageChapter(response.data.chapter))
                dispatch(setStudioPageChapterPermissions(response.data.chapterPermission))
            })
    }, [chapterId])

    if (!chapter) return;
    
    return (
        <EditLayout>
            <StudioChapterDrawer />
            <Box
                sx={{
                    width: "100%"    
                }}
            >
                {children}
            </Box>
        </EditLayout>
    )
}