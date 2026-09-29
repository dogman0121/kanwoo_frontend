"use client"


import { AppState, init } from "@/features/global/states/app/slice"
import { useAppStore } from "@/lib/state/hooks"
import React, { useRef } from "react"


export default function AppProvider({
    children, 
    deviceType
}: {
    children: React.ReactNode,
    deviceType: "mobile" | "desktop"
}) {
    const store = useAppStore()
    const initialized = useRef(false)

    if (!initialized.current) {
        store.dispatch(init({
            deviceType: deviceType
        }))
    }

    return (
        <>
            {children}    
        </>
    )
}