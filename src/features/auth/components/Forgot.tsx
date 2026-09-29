"use client"

import { useState } from "react";
import { authClientApi } from "../api/client.api";
import { Button, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AppSnackbar from "@/components/AppSnackbar";
import Message from "./ui/Message";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { selectIsLoading, setIsLoading, setSection } from "@/features/global/states/auth/slice";
import { AuthSection } from "@/features/auth/types";
import Header from "./ui/Header";
import FormContainer from "./ui/FormContainer";
import Input from "./ui/Input";

export default function AuthForgot() {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector(selectIsLoading)

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [reponseError, setResponseError] = useState(false)

    const handleForgot = async () => {
        try {
            dispatch(setIsLoading(true))
            
            await authClientApi.forgot(email);

            setEmailSent(true);
        } catch (e) {
            throw e
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    if (emailSent)
        return (
            <Message
                title="Восстановление пароля"
                description="На вашу почту отправлено письмо с восстановлением пароля."
            />
        )

    return (
        <>
            <Header 
                label="Восстановление пароля"
                startAdornment={
                    <IconButton sx={{mr: 1}}
                        onClick={() => dispatch(setSection(AuthSection.LOGIN))}
                    >
                        <ArrowBackRoundedIcon />
                    </IconButton>
                }
            />
            <FormContainer>
                <Input
                    label="Email"
                    variant="outlined"
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
            </FormContainer>
            <Button
                fullWidth
                variant="contained"
                onClick={handleForgot}
                autoFocus
                loading={isLoading}
                sx={{
                    mt: 4
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