import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

export default function ClickProtectContainer({
    children
}: {
    children: React.ReactNode
}) {
    const ref = useRef<HTMLDivElement>(null)

    const handlePointerEvent = (event: PointerEvent) => {
        event.stopPropagation()
    }

    useEffect(() => {
        if (!ref.current)
            return

        ref.current.addEventListener("click", handlePointerEvent)
        ref.current.addEventListener("pointerdown", handlePointerEvent)
        ref.current.addEventListener("pointerup", handlePointerEvent)
        ref.current.addEventListener("pointermove", handlePointerEvent)

        return () => { 
            if (!ref.current)
                return

            ref.current.removeEventListener("click", handlePointerEvent)
            ref.current.removeEventListener("pointerdown", handlePointerEvent)
            ref.current.removeEventListener("pointerup", handlePointerEvent)
            ref.current.removeEventListener("pointermove", handlePointerEvent)
        }
    }, [ref.current])

    return (
        <Box
            ref={ref}
        >
            {children}
        </Box>
    )
}