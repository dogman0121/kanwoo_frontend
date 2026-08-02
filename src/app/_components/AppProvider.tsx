"use client"

import { AppState, initAppSlice } from "@/lib/state/features/app/appSlice"
import { useAppStore } from "@/lib/state/hooks"
import React, { useRef } from "react"


export default function AppProvider({
    children, 
    value
}: {
    children: React.ReactNode,
    value: AppState
}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(initAppSlice(value))
    }

    return (
        <>
            {children}    
        </>
    )
}