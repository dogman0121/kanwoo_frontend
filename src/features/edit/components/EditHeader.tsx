"use client"

import { Box, SxProps, Typography, TypographyProps, useTheme } from "@mui/material";
import { Children } from "react";
import EditPageContainer from "./EditPageContainer";

export function EditPageHeader({
    children,
    underline
}: {
    children: React.ReactNode,
    underline?: boolean
}) {
    return (
        <Box
            sx={{
                p: "25px 25px 10px",
                
                ...(underline ? {
                    borderBottom: "1px solid",
                    borderColor: "divider"
                }: {})
            }}
        >
            {Children.map(children, c => c)}
        </Box>
    )
}

export function EditPageTitle({...props}: TypographyProps) {
    return (
        <Typography
            variant="h1"
            sx={{
            }}
            {...props}
        />
    )
}

export function EditPageNavbar({
    sticky,
    children,
    sx
}: {
    sticky?: boolean,
    children: React.ReactNode,
    sx?: SxProps
}) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",

                ...(sticky ? { 
                    position: "sticky", 
                    top: "54px",
                    bgcolor: "background.default",
                    zIndex: theme.zIndex.appBar
                } : {}),
            }}
        >
            <EditPageContainer
                sx={{
                    paddingTop: theme.spacing(1),
                    paddingBottom: theme.spacing(2),
                    display: "flex",
                    justifyContent: "end",
                    gap: theme.spacing(2),

                    ...sx
                }}
            >
                {Children.map(children, c => c)}
            </EditPageContainer>
        </Box>
    )
}


const EditHeader = (props: TypographyProps) => (
    <Typography
        variant="h1"
        sx={{
            p: "25px 25px 10px"
        }}
        {...props}
    />
)

export default EditHeader;