"use client"

import { useRef } from "react"

export default function useSwitchButtons() {
    const nextEl = useRef<HTMLButtonElement>(null)
    const prevEl = useRef<HTMLButtonElement>(null)

    return {
        nextButton: nextEl,
        prevButton: prevEl
    }
}