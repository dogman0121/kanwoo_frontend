"use client"

import { setList } from "@/lib/state/features/list/listSlice"
import { useAppStore } from "@/lib/state/hooks"
import List from "@/types/list"
import { useRef } from "react"

export default function ListPage({list}: {list: List}) {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(setList(list))
        initialized.current = true
    }

    return (
        <>dfsd</>
    )
}