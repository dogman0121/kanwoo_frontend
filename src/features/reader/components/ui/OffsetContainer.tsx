"use client"

import { useAppSelector } from "@/lib/state/hooks"
import { Box, BoxProps, styled } from "@mui/material"
import { selectOffsetEnabled } from "../../states/reader.slice"
import React, { Children, RefObject } from "react"

const Container = styled(Box, {
    shouldForwardProp: (prop: string) => prop !== "shifted"
})<{shifted: boolean}>(({theme}) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    height: "100%",
    width: "100%",
    position: 'relative',
    variants: [
        {
        props: ({ shifted }) => shifted,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: 400,
            },
        },
    ],
}))

export default function OffsetContainer({...props}: BoxProps) {

    const offsetEnabled = useAppSelector(selectOffsetEnabled)

    return (
        <Container
            shifted={offsetEnabled}
            {...props} 
        />
    )
}