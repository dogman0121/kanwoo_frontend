"use client"

import Profile from "@/types/profile/profile";
import { Avatar, Box, CircularProgress, List, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { AuthSection } from "../types/AuthPanel";
import authSectionContext from "../context/authSectionContext";
import AuthProfile from "@/types/authProfile";
import { authService } from "../api/services/authService";
import LoadingBox from "@/components/LoadingBox";

export default function AuthProfileSelector() {
    const {section, setSection} = useContext(authSectionContext);

    const [profiles, setProfiles] = useState<AuthProfile[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (section == AuthSection.CHOOSE_PROFILE) {
            setIsLoading(true)

            authService.getProfiles()
                .then(resp => {
                    const profiles = resp.data

                    if (profiles.length == 0) {
                        setSection(AuthSection.CREATE_PROFILE)
                    }
                    else {
                        setProfiles(resp.data)
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

        return () => {}
    }, [section])

    if (section != AuthSection.CHOOSE_PROFILE)
        return null;

    return (
        <>
            <Typography>Выбор профиля</Typography>
            <LoadingBox
                loading={isLoading}
            >
                <List
                    sx={{
                        py: 0
                    }}
                >
                    {profiles.map((profile: Profile, ind) => (
                        <Paper
                            key={`auth_profile_${ind}`}
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
            </LoadingBox>
        </>
    )
}