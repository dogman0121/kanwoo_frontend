import { useContext, useState } from "react";
import { authService } from "../api/services/authService";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import AuthInput from "./ui/AuthInput";
import { Box, Button, Typography } from "@mui/material";
import AuthLink from "./ui/AuthLink";
import AuthMessage from "./ui/AuthMessage";
import { ApiError } from "@/lib/fetch/apiResponse";
import authSectionContext from "../context/authSectionContext";
import { AuthSection } from "../types/AuthPanel";
import AppSnackbar from "@/components/AppSnackbar";

export default function AuthRegister() {
    const [emailSent, setEmailSent] = useState(false);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [wrongForm, setWrongForm] = useState(false);

    const [errorSnackbar, setErrorSnackbar] = useState(false)

    const {section, setSection} = useContext(authSectionContext);

    const handleRegister = async() => {
        try {
            await authService.register(email, password);

            setEmailSent(true);
            return;
            
        } catch (error) {
            if (error instanceof ApiError){
                if (error.code == "email_taken") {
                    setWrongForm(true);
                } else {

                }
            }

            throw error
        }
    }

    if (section != AuthSection.REGISTER)
        return null;

    if (emailSent)
        return (
            <AuthMessage 
                title="Подтвержение регистрации"
                description="На вашу почту отправлено письмо с подтверждением регистрации."
            />
        )

    return (
        <>
            <Typography variant="h2">Регистрация</Typography>
            { wrongForm && (
                <AuthError>
                    Пользователь с такой почтой уже существует
                </AuthError>
            )}
            <AuthForm>
                <AuthInput
                    error={wrongForm}
                    label="Почта"
                    variant="outlined"
                    type="email"

                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <AuthInput
                    error={wrongForm}
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                onClick={handleRegister}
                sx={{
                    mt: "20px"
                }}
            >
                Зарегестрироваться
            </Button>
            <Box
                sx={{
                    textAlign: "center",
                    mt: "5px"    
                }}
            >
                Уже есть аккаунт? 
                <AuthLink
                    onClick={()=>{
                        setSection(AuthSection.LOGIN)
                    }}
                >
                    Войти
                </AuthLink>
            </Box>
            <AppSnackbar 
                open={errorSnackbar}
                onClose={() => setErrorSnackbar(false)}
                variant="error"
                message="При отправке данных произошла ошибка"
            />
        </>
    )
}