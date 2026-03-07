"use client"

import { Avatar, Box, Button, CircularProgress, List, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { AuthSection } from "../types/AuthPanel";
import authSectionContext from "../context/authSectionContext";
import AuthForm from "./ui/AuthForm";
import SlugInput, { validateSlug } from "@/features/profile/ui/SlugInput";
import { debounce } from "lodash";
import AuthInput from "./ui/AuthInput";
import AppSnackbar from "@/components/AppSnackbar";
import { authService } from "../api/services/authService";

export default function AuthCreateProfile() {
    const {section} = useContext(authSectionContext);

    const [slug, setSlug] = useState("")
    const [name, setName] = useState("")

    const [slugError, setSlugError] = useState(false);
    const [slugChecking, setSlugIsChecking] = useState(false)

    const [errorSnackbar, setErrorSnackbar] = useState(false)

    const hangeCreateProfile = async () => {
        try {
            await authService.createProfile(name, slug)
        } catch (_e) {
            setErrorSnackbar(true)
        }
    }

    const handleInputSlug = async (event: ChangeEvent<HTMLInputElement>) => {
        const handleValidateSlug = debounce(async () => {
            const available = await validateSlug(slug)

            setSlugError(available)
        })

        handleValidateSlug()
        setSlug(event.target.value)
    }

    if (section != AuthSection.CREATE_PROFILE)
        return null;

    return (
        <>
            <Typography>Выбор профиля</Typography>
            <AuthForm>
                <AuthInput
                    label="Почта"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {setName(e.target.value)}}
                />
                <SlugInput 
                    value={slug}
                    onChange={handleInputSlug}
                    error={slugError}
                    slugChecking={slugChecking}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                onClick={hangeCreateProfile}
                sx={{
                    mt: "10px"
                }}
            >
                Войти
            </Button>
            <AppSnackbar 
                variant="error"
                message="При создании пользователя произошла ошибка"
                open={errorSnackbar}
                onClose={() => setErrorSnackbar(false)}
            />
        </>
    )
}