"use client"

import { setStudioPageChapter, setStudioPageChapterPermissions } from "@/lib/state/features/studioPage/studioPageChapterSlice"
import Chapter from "@/types/chapter/chapter"
import ChapterPermission from "@/types/chapter/chapterPermission"
import { Children, useEffect } from "react"
import { useDispatch } from "react-redux"

export default function StudioChapterProvider({
    chapter,
    chapterPermission,
    children
}: {
    chapter: Chapter,
    chapterPermission: ChapterPermission,
    children: React.ReactNode
}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setStudioPageChapter(chapter)),
        dispatch(setStudioPageChapterPermissions(chapterPermission))
    }, [chapter, chapterPermission])

    return (
        <>
            {Children.map(children, c => c)}
        </>
    )
}