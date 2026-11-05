"use client"

import { selectAuthProfile } from "@/features/auth/states/auth-profile"
import { openSnackbar, setAuthSnackbarOpen } from "@/features/global/states/app/slice"
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks"
import { Button, ButtonProps } from "@mui/material"
import { MouseEvent } from "react"

export default function ButtonWithAuthorization({
    onClick,
    ...props
}: ButtonProps) {
    const dispatch = useAppDispatch()

    const authProfile = useAppSelector(selectAuthProfile)
    
    const handleClick = (e: any) => {
        if (!authProfile)
            dispatch(setAuthSnackbarOpen(true))

        onClick?.(e)
    }

    return (
        <Button onClick={handleClick} {...props}/>
    )
}