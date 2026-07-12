"use client"

import { Avatar, Box, Button, IconButton, ListItemAvatar, ListItemButton, ListItemButtonProps, ListItemText, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import { authService } from "../api/services/authService";
import AuthInput from "./ui/AuthInput";
import authSectionContext from "../context/authSectionContext";
import { AuthSection } from "../types/AuthPanel";
import { Controller, useForm } from "react-hook-form";
import AuthPasswordInput from "./ui/AuthPasswordInput";
import { ApiError } from "@/lib/fetch/apiResponse";
import AuthProfile from "@/types/authProfile";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SlugInput, { validateSlug } from "@/features/profile/ui/SlugInput";
import { debounce } from "lodash";
import AuthTextButton from "./ui/AuthTextButton";
import AuthOr from "./ui/AuthOr";
import AuthOauth from "./AuthOauth";
import { YandexOauthResponse } from "@/lib/yandex-oauth/YandexOauthScript";
import { clientFetch } from "@/lib/fetch/clientFetch";

interface LoginForm {
    email: string,
    password: string
}

interface CreateProfileForm {
    slug: string,
    name: string
}

function ProfileButton({profile, ...props}: ListItemButtonProps & {profile: AuthProfile}) {
    const theme = useTheme()

    return (
        <ListItemButton
            sx={[{
                    borderRadius: "10px",
                },
                {
                    bgcolor: theme.palette.grey[100],
                    "&:hover": {
                        bgcolor: theme.palette.grey[200]
                    }
                },
                theme.applyStyles("dark", {
                    bgcolor: theme.palette.grey[800],
                    "&:hover": {
                        bgcolor: theme.palette.grey[700]
                    }
                })
            ]}
            {...props}
        >
            <ListItemAvatar>
                <Avatar src={profile.avatar}/>
            </ListItemAvatar>
            <ListItemText>
                <Typography>{profile.name}</Typography>
                <Typography variant="caption">{profile.subscribers_count}</Typography>
            </ListItemText>
        </ListItemButton>
    )
}

export default function AuthLogin({
    onLogin
}: {
    onLogin?: (profile: AuthProfile) => void
}) {
    const theme = useTheme()

    const [isFetching, setIsFetching] = useState(false)

    const [profiles, setProfiles] = useState<AuthProfile[]>([])

    const [chooseProfileOpen, setChooseProfileOpen] = useState(false)
    const [createProfileOpen, setCreateProfileOpen] = useState(false)

    const {section, setSection} = useContext(authSectionContext);

    const loginForm = useForm<LoginForm>({
        mode: "onSubmit"
    })

    const [slugChecking, setSlugChecking] = useState(false)

    const createProfileForm = useForm<CreateProfileForm>({
        mode: "onChange"
    })

    const handleLogin = async(data: LoginForm) => {
        try {
            setIsFetching(true)

            const response = await authService.login(data.email, data.password);

            setProfiles(response.data)

            if (response.data.length == 0) {
                setCreateProfileOpen(true)
            } else {
                setChooseProfileOpen(true)
            }
        }
        catch (error) {
            if (error instanceof ApiError) {
                if (error.code == "invalid_credentials") {
                    loginForm.setError("root", {message: "Неправильная почта или пароль"})
                }
            }

            throw error
        } finally {
            setIsFetching(false)
        }

    }

    const handleCreateProfile = async(data: CreateProfileForm) => {
        try {
            setIsFetching(true)

            const response = await authService.createProfile(data.name, data.slug)

            if (onLogin)
                onLogin(response.data)
        } catch(e) {
            throw e
        } finally {
            setIsFetching(false)
        }
    }

    const handleYandexAuth = async(data: YandexOauthResponse) => {
        const response = await clientFetch.post<AuthProfile[]>("/auth/oauth/yandex", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_token: data.access_token,
                expires_in: data.expires_in,
                extra_data: data.extraData,
                token_type: data.token_type
            })
        }, false)

        if (response.metadata?.created) {
            onLogin?.(response.data[0])
        } else {
            if (response.data.length == 0) 
                return setCreateProfileOpen(true)
            
            setProfiles(response.data)
            setChooseProfileOpen(true)
            
        }
    }

    if (section != AuthSection.LOGIN)
        return null;

    if (chooseProfileOpen) {
        return (
            <>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(2),
                        alignItems: "center"
                    }}
                >
                    <IconButton onClick={() => setChooseProfileOpen(false)}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <Typography variant="h2">Выбор профиля</Typography>
                </Box>
                <AuthForm>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: theme.spacing(1)
                        }}
                    >
                        {profiles.map(profile => (
                            <ProfileButton 
                                profile={profile}
                                key={`auth_profile_${profile.id}`}
                                onClick={async () => {
                                    try {
                                        await authService.selectProfile(profile.id)

                                        onLogin?.(profile)
                                    } catch (e) {
                                        throw e
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </AuthForm>
            </>
        )
    }

    if (createProfileOpen) {
        return (
            <form onSubmit={createProfileForm.handleSubmit(handleCreateProfile)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(2),
                        alignItems: "center"
                    }}
                >
                    <IconButton onClick={() => setCreateProfileOpen(false)}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <Typography variant="h2">Создание профиля</Typography>
                </Box>
                <AuthForm>
                    <Controller 
                        control={createProfileForm.control}
                        name="slug"
                        rules={{
                            validate: debounce(async (value) => {
                                setSlugChecking(true)

                                try {
                                    const res = await validateSlug(value)

                                    return res ? true : "Данное имя пользователя занято"
                                } finally {
                                    setSlugChecking(false)
                                }
                            }, 500)
                        }}
                        render={({field}) => (
                            <SlugInput 
                                label="Тег профиля"
                                type="text"
                                slugChecking={slugChecking}
                                error={createProfileForm.formState.errors.slug ? true : false}
                                helperText={createProfileForm.formState.errors.slug?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        control={createProfileForm.control}
                        name="name"
                        rules={{
                            required: true
                        }}
                        render={({field}) => (
                            <AuthInput
                                label="Отображаемое имя"
                                variant="outlined"
                                fullWidth
                                {...field}
                            />
                        )} 
                    />
                </AuthForm>
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    loading={isFetching}
                    sx={{
                        mt: "20px"
                    }}
                >
                    Создать
                </Button>
            </form>
        )
    }

    return (
        <form onSubmit={loginForm.handleSubmit(handleLogin)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                <Typography variant="h2">Авторизация</Typography>
                <AuthForm>
                    { loginForm.formState.errors.root && (
                        <AuthError>
                            {loginForm.formState.errors.root.message}
                        </AuthError>
                    )}
                    <Controller 
                        name="email"
                        control={loginForm.control}
                        rules={{
                            required: true
                        }}
                        render={({field}) => (
                            <AuthInput
                                type="email"
                                label="Почта"
                                variant="outlined"
                                fullWidth
                                error={loginForm.formState.errors.root ? true : false}
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name="password"
                        control={loginForm.control}
                        rules={{
                            required: true,
                        }}
                        render={({field}) => (
                            <AuthPasswordInput
                                fullWidth
                                error={loginForm.formState.errors.root ? true : false}
                                {...field}
                            />
                        )}
                    />
                </AuthForm>
                <AuthOr />
                <AuthOauth onYandexAuth={handleYandexAuth}/>
                <AuthTextButton
                    sx={{
                        mt: "10px",
                    }}
                    onClick={()=>{
                        setSection(AuthSection.FORGOT)
                    }}
                >
                    Забыли пароль?
                </AuthTextButton>
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    loading={isFetching}
                    autoFocus
                    sx={{
                        mt: "10px"
                    }}
                >
                    Войти
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        mt: "5px"
                    }}
                >
                    <Typography textAlign={"center"}>Нет учетной записи?</Typography> 
                    <AuthTextButton
                        onClick={() => setSection(
                            AuthSection.REGISTER
                        )}
                    >
                        Зарегистрироваться
                    </AuthTextButton>
                </Box>
            </Box>
        </form>
    )
}