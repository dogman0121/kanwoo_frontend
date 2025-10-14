"use client"

import Profile from "@/types/profile";
import { Avatar, Box, CircularProgress, List, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useContext } from "react"
import authPanelContext from "../context/authPanelContext";
import { AuthPanel } from "../types/AuthPanel";

export default function AuthProfileSelector({
    profiles,
    onSuccess
}: {
    profiles: Profile[],
    onSuccess?: (profile: Profile) => void
}) {
    const {panel} = useContext(authPanelContext);

    if (panel != AuthPanel.CHOOSE_PROFILE)
        return null;

    return (
        <>
            <h2>Выбор профиля</h2>
            {profiles.length == 0 ?
                <Box
                    sx={{
                        py: "20px",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <CircularProgress/>
                </Box> 
                :
                <List
                    sx={{
                        py: 0
                    }}
                >
                    {profiles.map((profile: Profile, ind) => (
                        <Paper
                            key={`profile_${ind}`}
                            elevation={2}
                            sx={[
                                {
                                    boxShadow: "none",
                                    borderRadius: "10px",
                                },
                                (theme) => 
                                    theme.applyStyles("light", {
                                        backgroundColor: "#f4f4f4"
                                    })
                            ]}
                        >
                            <ListItemButton
                                onClick={() => onSuccess?.(profile)}
                                sx={{
                                    borderRadius: "10px"
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar src={profile.avatar}/>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography>{profile.name}</Typography>
                                    <Typography variant="caption">0 подписчиков</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </Paper>
                    ))}
                </List>
            }
        </>
    )
}