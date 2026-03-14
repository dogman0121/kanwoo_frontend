"use client"

import { Avatar, Box, Button, CircularProgress, List, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react"
import { AuthSection } from "../types/AuthPanel";
import authSectionContext from "../context/authSectionContext";
import AuthForm from "./ui/AuthForm";
import SlugInput, { validateSlug } from "@/features/profile/ui/SlugInput";
import { debounce } from "lodash";
import AuthInput from "./ui/AuthInput";
import AppSnackbar from "@/components/AppSnackbar";
import { authService } from "../api/services/authService";

export default function AuthCreateProfile() {
    const {section, setSection} = useContext(authSectionContext);

    const [slug, setSlug] = useState("")
    const [name, setName] = useState("")

    const [slugError, setSlugError] = useState(false);
    const [slugChecking, setSlugIsChecking] = useState(false)

    const [errorSnackbar, setErrorSnackbar] = useState(false)

    const hangeCreateProfile = async () => {
        try {
            await authService.createProfile(name, slug)

            setSection(AuthSection.CHOOSE_PROFILE)
        } catch (e) {
            setErrorSnackbar(true)

            throw e
        }
    }

    const handleValidateSlug = useMemo(() => 
        debounce(async (slug: string) => {
            setSlugIsChecking(true)

            const available = await validateSlug(slug)

            setSlugError(!available)

            setSlugIsChecking(false)
        }, 500)
    , [])

    const handleInputSlug = async (event: ChangeEvent<HTMLInputElement>) => {
        setSlug(event.target.value)

        handleValidateSlug(event.target.value)
    }

    if (section != AuthSection.CREATE_PROFILE)
        return null;

    return (
        <>
            <Typography variant="h2">Создание профиля</Typography>
            <AuthForm>
                <SlugInput 
                    label="Тег"
                    value={slug}
                    onChange={handleInputSlug}
                    error={slugError}
                    helperText={slugError ? "Данный тег занят" : undefined}
                    slugChecking={slugChecking}
                />
                <AuthInput
                    label="Название"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {setName(e.target.value)}}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                onClick={hangeCreateProfile}
                sx={{
                    mt: "20px"
                }}
            >
                Создать
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