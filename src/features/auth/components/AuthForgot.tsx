"use client"

import { useContext, useState } from "react";
import { authService } from "../api/services/authService";
import { Box, Button } from "@mui/material";
import AuthForm from "./ui/AuthForm";
import AuthInput from "./ui/AuthInput";
import AuthMessage from "./ui/AuthMessage";
import authPanelContext from "../context/authPanelContext";
import { AuthPanel } from "../types/AuthPanel";

export default function AuthForgot() {
    const [email, setEmail] = useState("");

    const [emailSent, setEmailSent] = useState(false);

    const { panel } = useContext(authPanelContext)

    const handleForgot = async () => {
        const response = await authService.forgot(email);
        if (response.msg === "Email sent") {
            setEmailSent(true);
        }
    }

    if (panel != AuthPanel.FORGOT)
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
            <h2>Восстановление пароля</h2>
            <AuthForm>
                <AuthInput
                    label="Email"
                    variant="outlined"
                    onInput={(e) => {setEmail((e.target as HTMLInputElement).value)}}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                onClick={handleForgot}
            >
                Отправить
            </Button>
        </>
    )
}