"use client"

import Profile from "@/types/profile/profile";
import { Avatar, Box, CircularProgress, List, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { AuthSection } from "../types/AuthPanel";
import authSectionContext from "../context/authSectionContext";
import AuthProfile from "@/types/authProfile";
import { authService } from "../api/services/authService";
import LoadingBox from "@/components/LoadingBox";
import AuthForm from "./ui/AuthForm";
import { useAppDispatch } from "@/lib/state/hooks";
import { setAuthProfile } from "@/lib/state/features/auth_profile/authProfileSlice";
import AppSnackbar from "@/components/AppSnackbar";

export default function AuthProfileSelector() {
    const dispatch = useAppDispatch()

    const {section, setSection} = useContext(authSectionContext);

    const [errorOpen, setErrorOpen] = useState(false)

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
            <Typography variant="h2">Выбор профиля</Typography>
            <AuthForm>
                <LoadingBox
                    loading={isLoading}
                >
                    <List
                        sx={{
                            py: 0
                        }}
                    >
                        {profiles.map((profile: Profile, ind) => (
                            <ListItemButton
                                key={`auth_profile_${ind}`}
                                sx={{
                                    borderRadius: "10px"
                                }}

                                onClick={async () => {
                                    try {
                                        await authService.selectProfile(profile.id)

                                        dispatch(setAuthProfile(profile))
                                    } catch (e) {

                                    }
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
                        ))}
                    </List>
                </LoadingBox>
            </AuthForm>
            <AppSnackbar 
                variant="error"
                message="При выборе профиля произошла ошибка."
                open={errorOpen}
                onClose={() => setErrorOpen(false)}
            />
        </>
    )
}