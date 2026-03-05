"use client"

import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import AuthLink from "./ui/AuthLink";
import authPanelContext from "../context/authPanelContext";
import { AuthPanel } from "../types/AuthPanel";
import { authService } from "../api/services/authService";
import AuthInput from "./ui/AuthInput";

export default function AuthLogin({onSuccess}: {onSuccess?: () => void}) {
    const [wrongForm, setWrongForm] = useState(false);

    const [login, setLogin] = useState("");

    const [password, setPassword] = useState("");

    const {panel, setPanel} = useContext(authPanelContext);

    const handleLogin = async() => {
        try {
            await authService.login(login, password);

            setPanel(AuthPanel.CHOOSE_PROFILE)
            onSuccess?.()
        }
        catch (_error) {
            setWrongForm(true)
        }

    }

    if (panel != AuthPanel.LOGIN)
        return null;

    return (
        <>
            <h2>Авторизация</h2>
            { wrongForm && (
                <AuthError>
                    Неправильная почта или пароль
                </AuthError>
            )}
            <AuthForm>
                <AuthInput
                    error={wrongForm}
                    label="Почта"
                    variant="outlined"
                    fullWidth
                    onInput={(e) => {setLogin((e.target as HTMLInputElement).value)}}
                />

                <AuthInput
                    error={wrongForm}
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    fullWidth
                    onInput={(e) => {setPassword((e.target as HTMLInputElement).value)}}
                />
            </AuthForm>
            <AuthLink
                sx={{
                    textAlign: "center",
                    marginTop: "10px"
                }}
                onClick={()=>{setPanel(AuthPanel.FORGOT)}}
            >
                Забыли пароль?
            </AuthLink>
            <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{
                    mt: "10px"
                }}
            >
                Войти
            </Button>
            <Box
                sx={{
                    textAlign: "center",
                    mt: "5px"
                }}
            >
                Нет учетной записи? 
                <AuthLink
                    onClick={() => setPanel(AuthPanel.REGISTER)}
                >
                    Зарегестрироваться
                </AuthLink>
            </Box>
        </>
    )
}