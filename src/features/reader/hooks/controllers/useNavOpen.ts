"use client"

import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { useCallback } from "react"
import { selectNavOpen, setNavOpen, toggleNavOpen } from "../../states/reader.slice"


export default function useNavOpen() {
    const dispatch = useAppDispatch()

    const navOpen = useAppSelector(selectNavOpen)
    
    const handleOpen = useCallback(() => {
        dispatch(setNavOpen(true))
    }, [])

    const handleClose = useCallback(() => {
        dispatch(setNavOpen(false))
    }, [])

    const handleToggle = useCallback(() => {
        dispatch(toggleNavOpen())
    }, [navOpen])

    return {
        navOpen: navOpen,
        open: handleOpen,
        close: handleClose,
        toggle: handleToggle
    }
}