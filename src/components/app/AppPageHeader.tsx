"use client"

import { selectDeviceType } from "@/features/global/states/app/slice"
import { useAppSelector } from "@/lib/state/hooks"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export interface AppMobileHeader {
    label: string,
    startAdornment?: React.ReactElement
    endAdornment?: React.ReactElement
}

export function AppMobilePageHeader({
    label,
    startAdornment,
    endAdornment
}: AppMobileHeader) {
    return (
        <AppBar
            position="sticky"
            sx={{
                flexGrow: 1,

                bgcolor: "background.default",

                // borderBottom: "1px solid",
                // borderColor: "divider",
            }}
        >
            <Toolbar>
                { startAdornment }
                <Typography 
                    variant="h2"
                    sx={{
                        flexGrow: 1,

                        mx: 2
                    }}
                >
                    { label }
                </Typography>
                { endAdornment }
            </Toolbar>
        </AppBar>
    )
}

export function BackButton() {
    const router = useRouter()

    return (
        <IconButton onClick={() => router.back()}>
            <ArrowBackRoundedIcon />
        </IconButton>
    )
}

export function AppPageHeader({
    disableMobile,
    label,
    startAdornment,
    endAdornment
}: {
    disableMobile?: boolean,
    label: string,
    startAdornment?: React.ReactElement,
    endAdornment?: React.ReactElement
}) {
    const deviceType = useAppSelector(selectDeviceType)
    
    return (
        <>
            {deviceType == "desktop" && (
                <Typography variant="h1">
                    {label}
                </Typography>
            )}
            {deviceType != "desktop" && !disableMobile && (
                <AppMobilePageHeader 
                    label={label}
                    startAdornment={startAdornment}
                    endAdornment={endAdornment}
                />
            )}
        </>
    )
}

export default AppPageHeader