"use client"

import { RefObject, useEffect, useState } from "react"

export default function useScreenWidth(screenRef: RefObject<HTMLElement | null>) {
    const [screenWidth, setScreenWidth] = useState(0)

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const currentWidth = entry.contentRect.width;
            setScreenWidth(currentWidth)
        }
    });

    useEffect(() => {
        if (!screenRef.current) return () => {}

        resizeObserver.observe(screenRef.current, {box: "border-box"})

        return () => {
            resizeObserver.disconnect()
        }
    }, [screenRef.current])

    return { width: screenWidth }
}