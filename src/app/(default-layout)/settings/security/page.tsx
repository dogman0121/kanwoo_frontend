"use client"

import { EditPageHeader, EditPageTitle } from "@/components/edit/EditHeader";
import EditInput from "@/components/edit/EditInput";
import EditPageContainer from "@/components/edit/EditPageContainer";
import { ApiError } from "@/lib/fetch/api-response.types";
import { clientFetch } from "@/lib/fetch/client-fetch.util";
import { setSecuritySettings } from "@/lib/state/features/settings-page/slice";
import { useAppDispatch, useAppSelector } from "@/lib/state/hooks";
import { VALIDATE_PASSWORD_RESULT, validatePassword } from "@/lib/validate-password.util";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface PasswordChangeSchema {
    old_password: string
    new_password: string,
    new_password_repeat: string
}


function PasswordAuthSettings() {
    const passwordAuthEnabled = useAppSelector(state => state.settingsPage.security?.password_auth_enabled)

    const {control, formState: {disabled, errors}, handleSubmit, setError} = useForm<PasswordChangeSchema>({
        disabled: !passwordAuthEnabled,
    })

    const onSubmit = async (data: PasswordChangeSchema) => {
        console.log(data)
        if (data.new_password != data.new_password_repeat) {
            setError("new_password", {message: "Пароли не совпадают"})
            setError("new_password_repeat", {message: "Пароли не совпадают"})
            return;
        }

        const {result, detail} = validatePassword(data.new_password)
        if (!result) {
            switch(detail) {
                case VALIDATE_PASSWORD_RESULT.LESS_THAN_MIN_LENGTH:
                    return setError("new_password", {message: "Длина пароля должна быть не менее 8 символов."})
                case VALIDATE_PASSWORD_RESULT.MORE_THAN_MAX_LENGTH:
                    return setError("new_password", {message: "Длина пароля должно быть не более 64 символов."})
                case VALIDATE_PASSWORD_RESULT.LATIN_LOWERCASE_REQUIRED:
                    return setError("new_password", {message: "Пароль должен содержать прописные латинские символы."})
                case VALIDATE_PASSWORD_RESULT.LATIN_UPPERCASE_REQUIRED:
                    return setError("new_password", {message: "Пароль должен содержать заглавные латинские символы."})
                case VALIDATE_PASSWORD_RESULT.PUNKTUATION_MARKS_REQUIRED:
                    return setError("new_password", {message: "Пароль должен содержать знаки препинания."})
            }
        }
        
        try {
            const response = await clientFetch.put("/settings/security/password", {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    old_password: data.old_password,
                    new_password: data.new_password
                })
            })
        } catch (e) {
            if (e instanceof ApiError){
                if (e.code == "wrong_password")
                    return setError("old_password", {message: "Неверный пароль"})
            }
        }
    }
    
    return (
        <Box>
            <Typography variant="h3">Смена пароля</Typography>
            {passwordAuthEnabled ?
                <form id="change-password-form" onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 2,
                            mt: 2
                        }}
                    >
                        <Controller 
                            name="old_password"
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({field}) => (
                                <EditInput 
                                    label="Старый пароль" 
                                    inputProps={{
                                        type: "password",
                                        error: errors.old_password != undefined,
                                        helperText: errors.old_password?.message,
                                        ...field
                                    }}
                                />
                            )}
                        />
                        <Controller 
                            name="new_password"
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({field}) => (
                                <EditInput 
                                    label="Новый пароль" 
                                    caption="Длина пароля должна составлять от 8 до 64 символов. Также пароль должен содержать прописные и заглавные латинские символы и также знаки препинания."
                                    
                                    inputProps={{
                                        type: "password",
                                        error: errors.new_password != undefined,
                                        helperText: errors.new_password?.message,
                                        ...field
                                    }}
                                />
                            )}
                        />
                        <Controller 
                            name="new_password_repeat"
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({field}) => (
                                <EditInput 
                                    label="Повтор пароля" 
                                    inputProps={{
                                        type: "password",
                                        error: errors.new_password_repeat != undefined,
                                        helperText: errors.new_password_repeat?.message,
                                        ...field
                                    }}
                                    
                                />
                            )}
                        />
                    </Box>
                    <Button 
                        variant="contained"
                        type="submit"
                        disabled={disabled}
                        form="change-password-form"
                        sx={{
                            mt: 3
                        }}
                    >
                        Изменить
                    </Button>
                </form>
            :
            <></>
            }
        </Box>    
    )
}

function YandexOauthSettings() {
    const yandexOauthEnabled = useAppSelector(state => state.settingsPage.security?.yandex_oauth_enabled)

    return (
        <Box>
            <Typography variant="h3">Вход через Яндекс</Typography>
            {yandexOauthEnabled ?
                <></>
                :
                <></>
            }
        </Box>
    )
}

export default function Page() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        clientFetch.get('/settings/security',)
            .then((response) => {
                console.log(response)
                dispatch(setSecuritySettings(response.data))
            })
    }, [])

    return (
        <>
            <EditPageHeader>
                    <EditPageTitle>Безопасность и вход</EditPageTitle>
                </EditPageHeader>
            <EditPageContainer>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 3
                    }}
                >
                    <PasswordAuthSettings />
                    <YandexOauthSettings />
                </Box>
            </EditPageContainer>
        </>
    )
}