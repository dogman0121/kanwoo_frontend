"use client"

import Profile from "@/types/profile/profile"
import { Avatar, Box, Typography, useTheme } from "@mui/material"

export default function ProfileWidget({profile}: {profile?: Profile}) {
    const theme = useTheme()

    return (
        <>
            {profile ?
                <Box
                    sx={{
                        py: theme.spacing(1),
                        //px: theme.spacing(2),

                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",

                        borderRadius: "50px",
                        width: "fit-content",

                        // "&:hover": {
                        //     bgcolor: theme.palette.action.hover
                        // }
                    }}
                >
                    <Avatar 
                        src={profile?.avatar}
                        sx={{
                            width: "32px",
                            height: "32px"
                        }}
                    />
                    <Typography>
                        {profile.name}
                    </Typography>
                </Box>
                :
                <Typography>нет</Typography>
            }
        </>
    )
}