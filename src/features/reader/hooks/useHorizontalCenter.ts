"use client"

import { COMMENTS_DRAWER_WIDTH } from "@/constants/chapter-page"
import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppSelector } from "@/lib/state/hooks"
import { selectCommentsPanelOpen } from "../states/reader.slice"


export default function useHorizontalCenter() {
    const deviceType = useAppSelector(selectDeviceType)

    const commentsDrawerOpen = useAppSelector(selectCommentsPanelOpen)

    const offsetEnabled = commentsDrawerOpen && deviceType == "desktop"

    return `calc((100% - ${offsetEnabled ? COMMENTS_DRAWER_WIDTH : 0}px)/2)`
}