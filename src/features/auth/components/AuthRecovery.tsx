"use client"

import { useContext, useState } from "react";
import { authService } from "../api/services/authService";
import { Button, Typography } from "@mui/material";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import AuthInput from "./ui/AuthInput";
import { useRouter, useSearchParams } from "next/navigation";
import authSectionContext from "../context/authSectionContext";
import { AuthSection } from "../types/AuthPanel";
import AuthMessage from "./ui/AuthMessage";

export default function AuthRecovery() {
    const router = useRouter()
    
    const [wrongForm, setWrongForm] = useState(false);
    const [recoveryMessageOpen, setRecoveryMessageOpen] = useState(false)

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const { section, setSection } = useContext(authSectionContext);

    const urlParams = useSearchParams();
    const token = urlParams.get("t");
    
    if (section != AuthSection.RECOVERY) 
        return null

    const handleRecovery = async () => {
        if (password !== repeatPassword)
            return setWrongForm(true);

        if (!token){
            if (!process.env.NEXT_PUBLIC_SITE_URL)
                throw Error("Env variable 'NEXT_PUBLIC_SITE_URL' not found")
            return router.push(process.env.NEXT_PUBLIC_SITE_URL)
        }

        try {
            await authService.recovery(token, password);

            setRecoveryMessageOpen(true)
        } catch (_e) {
            throw new Error("Failed to recovery")
        }
    }

    if (!token){
        if (!process.env.NEXT_PUBLIC_SITE_URL)
            throw Error("Env variable 'NEXT_PUBLIC_SITE_URL' not found")
        router.push(process.env.NEXT_PUBLIC_SITE_URL)
    }

    if (recoveryMessageOpen)
        return (
            <AuthMessage 
                title="Восстановление пароля"
                description="Ваш пароль сброшен успешно"
            />
        )
    return (
        <>
            <Typography variant="h2">Восстановление пароля</Typography>
            { wrongForm && (
                <AuthError>
                    Пароли не совпадают
                </AuthError>
            )}
            <AuthForm>
                <AuthInput
                    error={wrongForm}
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    onChange={(e) => {setPassword(e.target.value)}}
                />

                <AuthInput
                    error={wrongForm}
                    label="Повтор пароля"
                    variant="outlined"
                    type="password"
                    onChange={(e) => {setRepeatPassword(e.target.value)}}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                onClick={handleRecovery}
                sx={{
                    mt: "20px"
                }}
            >
                Восстановить
            </Button>
        </>
    )
}