"use client"

import { useAppSelector } from "@/lib/state/hooks"
import Head from "next/head"
import { selectCurrentChapter } from "../states/reader/selectors"
import { useEffect } from "react"
import { routes, toHref } from "@/constants/routes/main.routes"

export default function usePageMetadata({
    pathDisabled = false,
    metadataDisabled = false
}: {
    pathDisabled?: boolean
    metadataDisabled?: boolean
}) {
    const currChapter = useAppSelector(selectCurrentChapter)

    useEffect(() => {
        if (!currChapter)
            return

        if (!pathDisabled)
            window.history.replaceState({}, "", toHref(routes.chapters.item, {id: currChapter.id.toString()}))

        if (!metadataDisabled)
            document.title = `Глава ${currChapter.chapter} ${currChapter.name || "Нет названия"} | Kanwoo`
    }, [currChapter])    
}