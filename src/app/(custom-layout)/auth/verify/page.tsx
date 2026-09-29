"use client"

import Auth from "@/features/auth/components/Auth"
import { AuthSection } from "@/features/auth/types"
import { setSection } from "@/features/global/states/auth/slice"
import { useAppStore } from "@/lib/state/hooks"
import { Suspense, useRef } from "react"

export default function Page() {

    const store = useAppStore()
    const initialized = useRef(false)

    if (!initialized.current) {
        store.dispatch(setSection(AuthSection.VERIFY))
        initialized.current = true
    }

    return (
        <Auth />
    )
}