"use client"

import { ProfileContext } from "@/lib/fetch/features/profile/types"
import { Profile } from "@/types/profile"
import MobilePage from "./MobilePage"
import DesktopPage from "./DesktopPage"
import Page from "./ProfilePage"
import ProfilePage from "./ProfilePage"
import { useEffect } from "react"
import { useAppDispatch } from "@/lib/state/hooks"
import { initProfile } from "@/lib/state/features/profile-page/page/slice"

export default function Adapter({
    deviceType,
    profile,
    profileContext
}: {
    deviceType: "mobile" | "desktop",
    profile: Profile,
    profileContext: ProfileContext
}) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initProfile({
            profile: profile
        }))
    }, [profile])
    
    return (
        <ProfilePage deviceType={deviceType}/>
    )
}