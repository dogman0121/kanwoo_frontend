"use client"

import { useEffect } from "react"
import DesktopPage from "./DesktopPage"
import MobilePage from "./MobilePage"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { loadHistory } from "@/features/progress/states/auth-profile-history-page/slice"
import { useRouter } from "next/navigation"
import { selectAuthProfile } from "@/features/global/states/auth-profile"

export default function PPage({
    deviceType
}: {
    deviceType: string
}) {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)
    
    useEffect(() => {
        if (authProfile)
            dispatch(loadHistory())
    }, [authProfile])

    return (
        <>
            {deviceType == "desktop" ?
                <DesktopPage />
                :
                <MobilePage />
            }
        </>
    )
}