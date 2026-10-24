import { Box, Drawer, SwipeableDrawer, SxProps, Typography, TypographyProps, useTheme } from "@mui/material";
import { Children, useEffect, useState } from "react";

export function BottomPanelHeader({
    sx,
    ...props
}: TypographyProps) {
    return (
        <Typography 
            sx={{
                fontWeight: "600",
                fontSize: "18px",
                pt: 2,
                px: 3,

                position: "sticky",
                top: 0,
                zIndex: 1,
                ...sx
            }}
            {...props}
        />
    )
}

export function BottomPanelBody({
    children,
    sx
}: {
    children?: React.ReactNode,
    sx?: SxProps
}) {
    return (
        <Box
            sx={{
                pt: 2,
                pb: 2,
                px: 3,
                ...sx
            }}
        >
            {children}
        </Box>
    )
}

export interface BottomPanelProps {
    open: boolean, 
    onClose?: () => void,
    onOpen?: () => void,
    sx?: SxProps,
    children?: React.ReactNode
}

export default function BottomPanel({
    open,
    onClose,
    onOpen,
    children,
    sx
}: BottomPanelProps) {

    const toggleDrawer = (openState: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            openState ? onOpen?.() : onClose?.()                
        };

    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <SwipeableDrawer
            elevation={1}
            open={open}
            onOpen={toggleDrawer(true)}
            onClose={toggleDrawer(false)}
            anchor="bottom"
            disableBackdropTransition={!isIOS} 
            disableDiscovery={isIOS}
            slotProps={{
                paper: {
                    sx: {
                        borderTopLeftRadius: `12px`,
                        borderTopRightRadius: `12px`,
                        ...sx
                    }
                }
            }}      
        >
            {children}
        </SwipeableDrawer>
    )
}