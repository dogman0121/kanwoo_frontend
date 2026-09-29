"use client"

import { Box, Button, Typography } from "@mui/material";
import ErrorBlock from "./ui/Error";
import { Controller, useForm } from "react-hook-form";
import AuthPasswordInput from "./ui/PasswordInput";
import { ApiError } from "@/lib/fetch/api-response.types";
import TextButton from "./ui/TextButton";
import AuthOauth from "./Oauth";
import { YandexOauthResponse } from "@/lib/yandex-oauth/YandexOauthScript";
import FormContainer from "./ui/FormContainer";
import OrDivider from "./ui/OrDivider";
import Input from "./ui/Input";
import Header from "./ui/Header";
import { AuthSection } from "@/features/auth/types";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { login, loginWithYandex, selectIsLoading, setSection } from "@/features/global/states/auth/slice";

interface LoginForm {
    email: string,
    password: string
}

export default function Login() {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector(selectIsLoading)

    const {control, handleSubmit, setError, formState: {errors}} = useForm<LoginForm>({
        mode: "onSubmit",
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleLogin = async(data: LoginForm) => {
        try {
            await dispatch(login({email: data.email, password: data.password})).unwrap()
        } catch (error: any) {
            if ("code" in error)
                if (error.code == "invalid_credentials") {
                    setError("root", {message: "Неправильная почта или пароль"})
                }
            else
                throw error
        }
    }

    const handleYandexAuth = async(data: YandexOauthResponse) => {
        dispatch(loginWithYandex({
            accessToken: data.access_token,
            tokenType: data.token_type,
            expiresIn: data.expires_in,
            extraData: data.extraData
        }))
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Header label="Авторизация"/>
                <FormContainer>
                    { errors.root && (
                        <ErrorBlock>
                            {errors.root.message}
                        </ErrorBlock>
                    )}
                    <Controller 
                        name="email"
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({field}) => (
                            <Input
                                type="email"
                                label="Почта"
                                variant="outlined"
                                fullWidth
                                error={errors.root ? true : false}
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name="password"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field}) => (
                            <AuthPasswordInput
                                fullWidth
                                error={errors.root ? true : false}
                                {...field}
                            />
                        )}
                    />
                </FormContainer>
                <OrDivider />
                <AuthOauth onYandexAuth={handleYandexAuth}/>
                <TextButton
                    sx={{
                        mt: "10px",
                    }}
                    onClick={() => dispatch(setSection(AuthSection.FORGOT))}
                >
                    Забыли пароль?
                </TextButton>
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                    autoFocus
                    sx={{
                        mt: 2
                    }}
                >
                    Войти
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        mt: 1
                    }}
                >
                    <Typography textAlign={"center"}>Нет учетной записи?</Typography> 
                    <TextButton
                        onClick={() => dispatch(setSection(AuthSection.REGISTER))}
                    >
                        Зарегистрироваться
                    </TextButton>
                </Box>
            </Box>
        </form>
    )
}