"use client"

import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import AuthLink from "./ui/AuthLink";
import { authService } from "../api/services/authService";
import AuthInput from "./ui/AuthInput";
import authSectionContext from "../context/authSectionContext";
import { AuthSection } from "../types/AuthPanel";

export default function AuthLogin() {
    const [wrongForm, setWrongForm] = useState(false);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const {section, setSection} = useContext(authSectionContext);

    const handleLogin = async() => {
        try {
            await authService.login(email, password);

            setSection(AuthSection.CHOOSE_PROFILE)
        }
        catch (_error) {
            setWrongForm(true)
        }

    }

    if (section != AuthSection.LOGIN)
        return null;

    return (
        <>
            <Typography variant="h2">Авторизация</Typography>
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
                    onChange={(e) => {setEmail(e.target.value)}}
                />

                <AuthInput
                    error={wrongForm}
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    fullWidth
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </AuthForm>
            <AuthLink
                sx={{
                    textAlign: "center",
                    marginTop: "10px"
                }}
                onClick={()=>{
                    setSection(AuthSection.FORGOT)
                }}
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
                    onClick={() => setSection(
                        AuthSection.REGISTER
                    )}
                >
                    Зарегестрироваться
                </AuthLink>
            </Box>
        </>
    )
}