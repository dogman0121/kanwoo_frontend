"use client"

import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import AuthError from "./AuthError";
import AuthForm from "./AuthForm";
import AuthLink from "./AuthLink";
import authPanelContext from "../context/authPanelContext";
import { AuthPanel } from "../types/AuthPanel";
import { authService } from "../api/services/authService";
import AuthInput from "./AuthInput";

export default function AuthLogin({onSuccess}: {onSuccess?: () => void}) {
    const [wrongForm, setWrongForm] = useState(false);

    const [login, setLogin] = useState("");

    const [password, setPassword] = useState("");

    const {panel, setPanel} = useContext(authPanelContext);

    const handleLogin = async() => {
        console.log("123");
        const {error} = await authService.login(login, password);

        if (error) {
            setWrongForm(true);
        }
        else {
            onSuccess?.()
        }

    }

    if (panel != AuthPanel.LOGIN)
        return null;

    return (
        <>
            <h2>Авторизация</h2>
            { wrongForm && (
                <AuthError>
                    Неправильное имя или пароль
                </AuthError>
            )}
            <AuthForm>
                <AuthInput
                    error={wrongForm}
                    label="Login"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onInput={(e) => {setLogin((e.target as HTMLInputElement).value)}}
                />

                <AuthInput
                    error={wrongForm}
                    label="Password"
                    variant="outlined"
                    type="password"
                    color="secondary"
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
                Забыли пароль
            </AuthLink>
            <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
            >
                Войти
            </Button>
            <Box
                sx={{
                    textAlign: "center"
                }}
            >
                Нет учетной записи? 
                <AuthLink
                    onClick={()=>{setPanel(AuthPanel.REGISTER)}}
                >
                    Зарегестрироваться
                </AuthLink>
            </Box>
        </>
    )
}