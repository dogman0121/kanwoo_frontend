"use client"

import { useEffect, useState } from "react"

export default function useWindowHeight() {
    const [windowheight, setWindowHeight] = useState(0)

    useEffect(() => {
        if (!window) return () => {}

        const handleResize = () => {
            setWindowHeight(document.documentElement.clientHeight)
        }

        window.addEventListener("resize", handleResize)

        handleResize()

        return () => {window.removeEventListener("resize", handleResize)}
    }, [])

    return { height: windowheight }
}