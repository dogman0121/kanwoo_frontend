"use client"

import { setAuthProfile } from "@/lib/state/features/auth_profile/authProfileSlice"
import { setProfile } from "@/lib/state/features/profile/profileSlice"
import { useAppStore } from "@/lib/state/hooks"
import Profile from "@/types/profile/profile"
import React, { useRef } from "react"

export default function ProfileProvider({
    children, 
    profile
}: {
    children: React.ReactNode
    profile?: Profile | null
}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setAuthProfile(profile))
        initialized.current = true
    }

    return (
        <>
            {children}    
        </>
    )
}