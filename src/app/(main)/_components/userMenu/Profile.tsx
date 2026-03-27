"use client"

import AuthProfile from "@/types/authProfile";
import { Avatar, Box, ListItem, MenuItem, Typography, useTheme } from "@mui/material";

export default function Profile({profile}: {profile: AuthProfile}) {
    const theme = useTheme()

    return (
        <MenuItem
            sx={{
                gap: theme.spacing(3)
            }}
        >
            <Avatar 
                src={profile.avatar}
                sx={{
                    width: "50px",
                    height: "50px"
                }}
            />
            <Box>
                <Typography variant="caption">Ваш профиль</Typography>
                <Box>
                    <Typography 
                        fontWeight={600} 
                        fontSize={"16px"}
                    >
                        {profile.name}
                    </Typography>
                    <Typography>@{profile.slug}</Typography>
                </Box>
                
            </Box>
        </MenuItem>
    )
}