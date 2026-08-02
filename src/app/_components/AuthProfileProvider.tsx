"use client"

import { setAuthProfile, setAuthProfileCollections } from "@/lib/state/features/authProfile/authProfileSlice"
import { setProfile } from "@/lib/state/features/profile/profileSlice"
import { useAppStore } from "@/lib/state/hooks"
import Collection from "@/types/collection/collection"
import Profile from "@/types/profile/profile"
import React, { useRef } from "react"

export default function AuthProfileProvider({
    children, 
    profile,
    collections
}: {
    children: React.ReactNode
    profile?: Profile | null,
    collections?: Collection[]
}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setAuthProfile(profile))
        store.dispatch(setAuthProfileCollections(collections))
        initialized.current = true
    }

    return (
        <>
            {children}    
        </>
    )
}