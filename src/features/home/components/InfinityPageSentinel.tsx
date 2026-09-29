"use client"

import { Box, CircularProgress } from "@mui/material";
import { useEffect, useRef } from "react";

export default function InfinityPageSentinel({
    onLoadNext
}: {
    onLoadNext?: () => void
}) {

    const sentinelRef = useRef<HTMLElement>(null);
    const intersectionObserverRef = useRef<IntersectionObserver>(null)
    const intersectionLocked = useRef(false)

    useEffect(() => {
        if (!sentinelRef.current) return

        intersectionObserverRef.current = new IntersectionObserver(([entries]) => {
            if (!entries.isIntersecting)
                return intersectionLocked.current = false

            if (intersectionLocked.current) return

            intersectionLocked.current = true
            onLoadNext?.()
        }, {rootMargin: "0px 0px 400px 0px"})

        intersectionObserverRef.current.observe(sentinelRef.current)

        return () => {
            intersectionObserverRef.current?.disconnect()
        }
    }, [onLoadNext]) 

    return (
        <Box
            sx={{
                py: 5
            }}
            ref={sentinelRef}
        >
            <CircularProgress />
        </Box>
    )
}