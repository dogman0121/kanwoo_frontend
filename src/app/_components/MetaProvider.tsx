"use client"

import { setMeta } from "@/lib/state/features/meta/metaSlice"
import { useAppStore } from "@/lib/state/hooks"
import Meta from "@/types/meta"
import React, { useRef } from "react"

export default function MetaProvider({
    children, 
    meta
}: {
    children: React.ReactNode
    meta?: Meta | null
}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setMeta(meta))
        initialized.current = true
    }

    return (
        <>
            {children}    
        </>
    )
}