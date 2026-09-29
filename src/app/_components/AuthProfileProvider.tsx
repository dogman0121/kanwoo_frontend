"use client"

import { setAuthProfile } from "@/features/global/states/auth-profile/auth-profile.slice"
import { useAppStore } from "@/lib/state/hooks"
import { AuthProfile } from "@/types/profile"
import React, { useRef } from "react"

export default function AuthProfileProvider({
    children, 
    profile
}: {
    children: React.ReactNode
    profile: AuthProfile | null
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