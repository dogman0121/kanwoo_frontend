"use client"

import { MAX_CHAPTER_WIDTH } from "@/constants/reader"
import { useEffect, useState } from "react"

export default function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(Math.min(window.innerWidth, MAX_CHAPTER_WIDTH))
        }

        window.addEventListener("resize", handleResize)

        handleResize()

        return () => {window.removeEventListener("resize", handleResize)}
    }, [])

    return { width: windowWidth }
}