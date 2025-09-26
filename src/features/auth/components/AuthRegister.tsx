import { useContext, useState } from "react";
import { authService } from "../api/services/authService";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import AuthInput from "./ui/AuthInput";
import { Box, Button } from "@mui/material";
import AuthLink from "./ui/AuthLink";
import authPanelContext from "../context/authPanelContext";
import { AuthPanel } from "../types/AuthPanel";
import AuthMessage from "./ui/AuthMessage";

export default function AuthRegister({onSuccess}: {onSuccess?: () => void}) {
    const [emailSent, setEmailSent] = useState(false);

    const [login, setLogin] = useState("");
    
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");

    const [wrongForm, setWrongForm] = useState(0);

    const {panel, setPanel} = useContext(authPanelContext);

    const handleRegister = async() => {
        if (password == repeatPassword){
            const {data, error} = await authService.register(login, email, password);

            if (data?.msg == "Email sent"){
                setEmailSent(true);
                onSuccess?.()
                return;
            }

            
            if (error){
                if (error.detail.login){
                    switch (error.detail.login){
                        case "Login already taken":
                            setWrongForm(3);
                            break;
                    }
                }
                else if (error.detail.email) {
                    switch (error.detail.email){
                        case "Email already taken":
                            setWrongForm(2);
                            break;
                    }
                }
                else {
                    setWrongForm(10);
                }
            }

        }
        else {
            setWrongForm(1);
        }
    }

    if (panel != AuthPanel.REGISTER)
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
            <h2>Регистрация</h2>
            { wrongForm !== 0 && (
                <AuthError>
                    {wrongForm === 1 && <>Пароли не совпадают</>}
                    {wrongForm === 2 && <>Пользователь с такой почтой уже существует</>}
                    {wrongForm === 3 && <>Данное имя пользователя занято</>}
                    {wrongForm === 10 && <>Ошибка</>}
                </AuthError>
            )}
            <AuthForm>
                <AuthInput
                    error={wrongForm !== 0}
                    label="Login"
                    variant="outlined"
                    onInput={(e) => {setLogin((e.target as HTMLInputElement).value)}}
                />
                <AuthInput
                    error={wrongForm !== 0}
                    label="Email"
                    variant="outlined"
                    type="email"

                    onInput={(e) => {setEmail((e.target as HTMLInputElement).value)}}
                />
                <AuthInput
                    error={wrongForm !== 0}
                    label="Password"
                    variant="outlined"
                    type="password"
                    onInput={(e) => {setPassword((e.target as HTMLInputElement).value)}}
                />
                <AuthInput
                    error={wrongForm !== 0}
                    label="Repeat password"
                    variant="outlined"
                    type="password"
                    onInput={(e) => {setRepeatPassword((e.target as HTMLInputElement).value)}}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                onClick={handleRegister}
                sx={{
                    mt: "10px"
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
                    onClick={()=>{setPanel(AuthPanel.LOGIN)}}
                >
                    Войти
                </AuthLink>
            </Box>
        </>
    )
}