import { useContext, useRef, useState } from "react";
import { authService } from "../api/services/authService";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import AuthInput from "./ui/AuthInput";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import AuthLink from "./ui/AuthLink";
import { ApiError } from "@/lib/fetch/apiResponse";
import authSectionContext from "../context/authSectionContext";
import { AuthSection } from "../types/AuthPanel";
import AppSnackbar from "@/components/AppSnackbar";
import { Controller, useForm } from "react-hook-form";
import SlugInput, { validateSlug } from "@/features/profile/ui/SlugInput";
import AuthPasswordInput from "./ui/AuthPasswordInput";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { debounce } from "lodash";
import AuthTotpInput from "./ui/AuthTotpInput";
import useTimer from "../hooks/useTimer";
import Profile from "@/types/profile/profile";
import AuthTextButton from "./ui/AuthTextButton";
import AuthProfile from "@/types/authProfile";


interface RegisterForm {
    login: string,
    email: string,
    password: string
}


export default function AuthRegister({
    onRegister
}: {
    onRegister?: (profile: AuthProfile) => void
}) {
    const theme = useTheme()

    // general states
    const [isFetching, setIsFetching] = useState(false)
    const [timeRemaining, setTimeRemaining] = useTimer(0)

    // totp form
    const [totpOpen, setTotpOpen] = useState(false)
    const [totpError, setTotpError] = useState(false)

    // register form
    const [slugChecking, setSlugChecking] = useState(false)
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
    const [registerData, setRegisterData] = useState<RegisterForm | undefined>(undefined)

    const {section, setSection} = useContext(authSectionContext);

    const {control, handleSubmit,  setError, formState: {errors}} = useForm<RegisterForm>({
        mode: "onChange",
        defaultValues: registerData
    })

    const validateLoginRef = useRef(
          debounce(
            async (
                value: string, 
                resolve: (result: string | boolean) => void
            ) => {
                setSlugChecking(true);
            
                const res = await validateSlug(value);
            
                setSlugChecking(false);
            
                resolve(res ? true : "Данное имя занято");
            },
            500
        )
    )

    const onTotp = async (code?: number) => {
        if (!registerData)
            throw new Error("Register data is undefined")

        if (!code || code < 100000)
            return setTotpError(false)

        try {
            setIsFetching(true)

            const response = await authService.register(code, registerData.login, registerData.email, registerData.password)

            onRegister?.(response.data)
        } 
        catch (e) {
            if (e instanceof ApiError) {
                if (e.code == "invalid_code") {
                    setTotpError(true)
                }
            }

            throw e
        } 
        finally {
            setIsFetching(false)
        }
    }

    const handleResendCode = async () => {
        try {
            if (!registerData) 
                throw new Error("Register data is undefined")

            setIsFetching(true)

            await authService.getRegisterCode(registerData.email)

            setTimeRemaining(40)
        }
        catch (e) {
            if (e instanceof ApiError){
                if (e.code == "invalid_code")
                    setTotpError(true)
            }
        }
        finally {
            setIsFetching(false)
        }
    }

    const onRegisterSubmit = async (data: RegisterForm) => {
        try {
            if (!data)
                return setErrorSnackbarOpen(true)

            setIsFetching(true)

            await authService.getRegisterCode(data.email)

            setTimeRemaining(40)
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
        finally {
            setIsFetching(false)
        }
    }

    if (section != AuthSection.REGISTER)
        return null;

    if (totpOpen) {
        return(
            <>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(2),
                        alignItems: "center"
                    }}
                >
                    <IconButton onClick={() => setTotpOpen(false)}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <Typography variant="h2">Подтверждение почты</Typography>
                </Box>
                <Typography
                    sx={{
                        mt: "5px"
                    }}
                >
                    На почту {registerData?.email} было направлено письмо с 6-значным кодом. Введите его ниже:
                </Typography>
                <AuthForm>
                    {totpError && (
                        <AuthError>Неверный код</AuthError>
                    )}
                    <AuthTotpInput 
                        disabled={isFetching}
                        onChange={onTotp}
                        error={totpError}
                    />
                </AuthForm>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={timeRemaining != 0}
                    loading={isFetching}
                    onClick={handleResendCode}
                    sx={{
                        mt: theme.spacing(3)
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
        <form onSubmit={handleSubmit(onRegisterSubmit)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                <Typography variant="h2">Регистрация</Typography>
                <AuthForm>
                    <Controller 
                        control={control}
                        name="login"
                        rules={{
                            validate: (value) => new Promise((resolve) => validateLoginRef.current(value, resolve))
                        }}
                        render={({field}) => (
                            <SlugInput 
                                label="Логин"
                                type="text"
                                slugChecking={slugChecking}
                                error={errors.login ? true : false}
                                helperText={errors.login?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="email"
                        render={({field}) => (
                            <AuthInput 
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
                            <AuthPasswordInput 
                                error={errors.password ? true : false}
                                {...field}
                            />
                        )}
                    />
                </AuthForm>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={isFetching}
                    autoFocus
                    sx={{
                        mt: "20px"
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
                    <AuthTextButton
                        onClick={()=>{
                            setSection(AuthSection.LOGIN)
                        }}
                    >
                        Войти
                    </AuthTextButton>
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