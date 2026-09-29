import { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { ApiError } from "@/lib/fetch/api-response.types";
import AppSnackbar from "@/components/AppSnackbar";
import { Controller, useForm } from "react-hook-form";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import useTimer from "../hooks/useTimer";
import { authClientApi } from "../api/client.api";
import Header from "./ui/Header";
import FormContainer from "./ui/FormContainer";
import ErrorBlock from "./ui/Error";
import TotpInput from "./ui/TotpInput";
import Input from "./ui/Input";
import PasswordInput from "./ui/PasswordInput";
import TextButton from "./ui/TextButton";
import useSlugValidator from "@/features/profile/hooks/use-slug-validator.hook";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { register, selectIsLoading, setIsLoading, setSection } from "@/features/global/states/auth/slice";
import { AuthSection } from "@/features/auth/types";
import SlugInput from "@/features/profile/components/SlugInput";


interface RegisterForm {
    login: string,
    email: string,
    password: string
}


export default function AuthRegister() {
    const dispatch = useAppDispatch()

    const [timeRemaining, setTimeRemaining] = useTimer(0)

    const { validate, isValid, validating } = useSlugValidator()
    const isLoading = useAppSelector(selectIsLoading)

    // totp form
    const [totpOpen, setTotpOpen] = useState(false)
    const [totpError, setTotpError] = useState(false)

    // register form
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
    const [registerData, setRegisterData] = useState<RegisterForm | undefined>(undefined)


    const {control, handleSubmit,  setError, formState: {errors}} = useForm<RegisterForm>({
        mode: "onChange",
        defaultValues: registerData
    })

    const onTotp = async (code?: number) => {
        if (!registerData)
            throw new Error("Register data is undefined")

        if (!code || code < 100000)
            return setTotpError(false)

        try {
            dispatch(register({
                login: registerData?.login,
                email: registerData?.email,
                password: registerData?.password
            })).unwrap()
        } 
        catch (e) {
            if (e instanceof ApiError) {
                if (e.code == "invalid_code") {
                    setTotpError(true)
                }
            }

            throw e
        }
    }

    const sendCode = async (email: string) => {
        try {
            await authClientApi.getRegisterCode(email)

            setTimeRemaining(40)
        }
        catch (e) {
            throw e
        }
        finally {
            dispatch(setIsLoading(true))
        }
    }

    const handleSendCode = async () => {
        const email = registerData?.email
        if (!email)
            throw new Error("Cant get an email")

        sendCode(email)

    }

    const onRegister = async (data: RegisterForm) => {
        try {
            if (!data)
                return setErrorSnackbarOpen(true)

            sendCode(data.email)

            setTotpOpen(true)
            setRegisterData(data)
        } 
        catch(e) {
            if (e instanceof ApiError) {
                if (e.code == "email_exists") {
                    setError("email", {message: "Данная почта занята"})
                }

            } else {
                setErrorSnackbarOpen(true)

                throw e
            }
        }
    }

    if (totpOpen) {
        return(
            <>
                <Header 
                    label="Подтверждение"
                    startAdornment={
                        <IconButton onClick={() => setTotpOpen(false)}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    }
                />
                <Typography
                    sx={{
                        mt: 1
                    }}
                >
                    На почту {registerData?.email} было направлено письмо с 6-значным кодом. Введите его ниже:
                </Typography>
                <FormContainer>
                    {totpError && (
                        <ErrorBlock>Неверный код</ErrorBlock>
                    )}
                    <TotpInput 
                        disabled={isLoading}
                        onChange={onTotp}
                        error={totpError}
                    />
                </FormContainer>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={timeRemaining != 0}
                    loading={isLoading}
                    onClick={handleSendCode}
                    sx={{
                        mt: 3
                    }}
                >
                    {timeRemaining != 0 ?
                        <>Отправить снова ({timeRemaining} сек.)</>
                        :
                        <>Отправить снова</>
                    }    
                </Button>
            </>
        )
    }

    return (
        <form onSubmit={handleSubmit(onRegister)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                <Header label="Регистрация"/>
                <FormContainer>
                    <Controller 
                        control={control}
                        name="login"
                        rules={{
                            validate: (value) => {
                                validate(value)

                                return ""
                            }
                        }}
                        render={({field}) => (
                            <SlugInput 
                                label="Логин"
                                type="text"
                                slugChecking={validating}
                                error={!isValid}
                                helperText={errors.login?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="email"
                        render={({field}) => (
                            <Input 
                                label="Почта"
                                type="email"
                                error={errors.email ? true : false}
                                helperText={errors.email?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="password"
                        render={({field}) => (
                            <PasswordInput 
                                error={errors.password ? true : false}
                                {...field}
                            />
                        )}
                    />
                </FormContainer>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                    autoFocus
                    sx={{
                        mt: 4
                    }}
                >
                    Зарегестрироваться
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        mt: "5px"    
                    }}
                >
                    <Typography textAlign={"center"}>Уже есть аккаунт?</Typography> 
                    <TextButton
                        onClick={()=>{
                            dispatch(setSection(AuthSection.LOGIN))
                        }}
                    >
                        Войти
                    </TextButton>
                </Box>
                <AppSnackbar 
                    open={errorSnackbarOpen}
                    onClose={() => setErrorSnackbarOpen(false)}
                    variant="error"
                    message="При отправке данных произошла ошибка"
                />   
            </Box>
        </form>
    )
}