"use client"

import { useContext, useState } from "react";
import { authService } from "../api/services/authService";
import { Button, IconButton, Typography } from "@mui/material";
import AuthForm from "./ui/AuthForm";
import AuthInput from "./ui/AuthInput";
import AuthMessage from "./ui/AuthMessage";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import authSectionContext from "../context/authSectionContext";
import { AuthSection } from "../types/AuthPanel";
import AppSnackbar from "@/components/AppSnackbar";

export default function AuthForgot() {
    const [email, setEmail] = useState("");

    const [emailSent, setEmailSent] = useState(false);

    const { section, setSection } = useContext(authSectionContext)

    const [reponseError, setResponseError] = useState(false)

    const handleForgot = async () => {
        try {
            await authService.forgot(email);

            setEmailSent(true);
        } catch (e) {
            throw e
        }
    }

    if (section != AuthSection.FORGOT)
        return null;

    if (emailSent)
        return (
            <AuthMessage
                title="Восстановление пароля"
                description="На вашу почту отправлено письмо с восстановлением пароля."
            />
        )

    return (
        <>
            <Typography variant="h2">
                <IconButton sx={{mr: "5px"}}
                    onClick={() => setSection(AuthSection.LOGIN)}
                >
                    <ArrowBackRoundedIcon />
                </IconButton>
                Восстановление пароля
            </Typography>
            <AuthForm>
                <AuthInput
                    label="Email"
                    variant="outlined"
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                onClick={handleForgot}
                sx={{
                    mt: "20px"
                }}
            >
                Отправить
            </Button>
            <AppSnackbar 
                variant="error"
                message="При отправке письма произошла ошибка. Попробуйте позже!"
                open={reponseError}
                onClose={() => setResponseError(false)}
            />
        </>
    )
}