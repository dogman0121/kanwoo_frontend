"use client"

import { setHome } from "@/lib/state/features/homePage/homeSlice"
import { useAppStore } from "@/lib/state/hooks"
import Home from "@/types/home"
import { Children, useRef } from "react"

export default function HomeProvider({children, home}: {children: React.ReactElement, home: Home}) {
    const store = useAppStore()
    const initialized = useRef(false)
    
    if (!initialized.current) {
        store.dispatch(setHome(home))
        initialized.current = true
    }

    return (
        <>
            {Children.map(children, c => c)}
        </>
    )

}