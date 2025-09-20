"use client"

import { useContext, useState } from "react";
import { authService } from "../api/services/authService";
import authPanelContext from "../context/authPanelContext";
import { AuthPanel } from "../types/AuthPanel";
import { Button } from "@mui/material";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import AuthInput from "./ui/AuthInput";
import { useRouter } from "next/navigation";

export default function AuthRecovery({onSuccess}: {onSuccess?: () => void}) {
    const [wrongForm, setWrongForm] = useState(false);

    const [password, setPassword] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");

    const { setPanel } = useContext(authPanelContext);

    const router = useRouter()

    const urlParams = new URLSearchParams(document.location.search);
        
    const token = urlParams.get("t");

    const handleRecovery = async () => {
        if (password !== repeatPassword)
            return setWrongForm(true);

        if (!token){
            if (!process.env.NEXT_PUBLIC_SITE_URL)
                throw Error("Env variable 'NEXT_PUBLIC_SITE_URL' not found")
            return document.location.href = process.env.NEXT_PUBLIC_SITE_URL
        }

        const response = await authService.recovery(token, password);

        if (response.msg === "Password updated"){
            onSuccess?.()
            setPanel(AuthPanel.LOGIN);
        }
    }

    if (!token){
        if (!process.env.NEXT_PUBLIC_SITE_URL)
            throw Error("Env variable 'NEXT_PUBLIC_SITE_URL' not found")
        router.push(process.env.NEXT_PUBLIC_SITE_URL)
    }

    return (
        <>
            <h2>Восстановление пароля</h2>
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
                    onInput={(e) => {setPassword((e.target as HTMLInputElement).value)}}
                />

                <AuthInput
                    error={wrongForm}
                    label="Повтор пароля"
                    variant="outlined"
                    type="password"
                    onInput={(e) => {setRepeatPassword((e.target as HTMLInputElement).value)}}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                onClick={handleRecovery}
                sx={{
                    mt: "15px"
                }}
            >
                Восстановить
            </Button>
        </>
    )
}