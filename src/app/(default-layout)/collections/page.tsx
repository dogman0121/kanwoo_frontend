"use client"

import { selectAuthProfile } from "@/features/auth/states/auth-profile"
import AuthProfileCollectionsPageDesktop from "@/features/collection/pages/AuthProfileCollectionsPageDesktop"
import AuthProfileCollectionsPageMobile from "@/features/collection/pages/AuthProfileCollectionsPageMobile"
import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppSelector } from "@/lib/state/hooks"
import { notFound } from "next/navigation"

export default function Page({
    searchParams
}: {
    searchParams: Promise<{ viewport: string }>
}) {

    const deviceType = useAppSelector(selectDeviceType)
    const authProfile = useAppSelector(selectAuthProfile)

    if (!authProfile)
        return notFound()

    return (
        <>
            {deviceType == "desktop" && (
                <AuthProfileCollectionsPageDesktop />
            )}
            {deviceType != "desktop" && (
                <AuthProfileCollectionsPageMobile />
            )}
        </>
    )
}