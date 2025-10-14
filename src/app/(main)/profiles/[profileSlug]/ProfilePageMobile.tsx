"use client"

import { setProfile } from "@/lib/state/features/profile/profileSlice"
import { useAppStore } from "@/lib/state/hooks"
import Profile from "@/types/profile"
import { useRef } from "react"

export default function ProfilePageMobile({profile}: {profile: Profile}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setProfile(profile))
        initialized.current = true
    }

    return (
        <></>
    )
}