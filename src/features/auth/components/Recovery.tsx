"use client"

import { useState, useTransition } from "react";
import { Button } from "@mui/material";
import AuthError from "./ui/Error";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { authClientApi } from "../api/client.api";
import Message from "./ui/Message";
import Header from "./ui/Header";
import FormContainer from "./ui/FormContainer";
import PasswordInput from "./ui/PasswordInput";
import { ApiError } from "@/lib/fetch/api-response.types";
import ErrorBlock from "./ui/Error";

interface RecoveryForm {
    password: string,
    repeatPassword: string
}

export default function AuthRecovery() {
    const [recoveryMessageOpen, setRecoveryMessageOpen] = useState(false)

    const urlParams = useSearchParams();
    const token = urlParams.get("t");
    
    const [isLoading, setIsLoading] = useTransition()

    const {control, handleSubmit, formState: {errors}, setError} = useForm<RecoveryForm>({
        mode: "onSubmit",
        defaultValues: {
            password: "",
            repeatPassword: ""
        }
    })

    const handleRecovery = async (data: RecoveryForm) => {
        if (data.password !== data.repeatPassword)
            return setError("root", {message: "Пароли не совпадают"});

        if (!token){
            throw Error("Env variable 'NEXT_PUBLIC_SITE_URL' not found")
        }

        try {
            setIsLoading(async () => {
                try {
                    await authClientApi.recovery(token, data.password)

                    setRecoveryMessageOpen(true)
                } catch (e) {
                    if (e instanceof ApiError) {
                        if (e.code == "token_expired") {
                            setError("root", {message: "Время действия ссылки истекло."})
                        }
                    }
                }
            })
        } catch (e) {
            
            throw new Error("Failed to recovery")
        }
    }


    if (recoveryMessageOpen)
        return (
            <Message 
                title="Восстановление пароля"
                description="Ваш пароль сброшен успешно"
            />
        )
    return (
        <form onSubmit={handleSubmit(handleRecovery)}>
            <Header label="Восстановление пароля"/>
            <FormContainer>
                <Controller 
                    name="password"
                    control={control}
                    render={({field}) => (
                        <PasswordInput
                            error={errors.root || errors.password ? true : false}
                            helperText={errors.password?.message} 
                            {...field}  
                        />
                    )}
                />
                <Controller 
                    name="repeatPassword"
                    control={control}
                    render={({field}) => (
                        <PasswordInput
                            label={"Повтор пароля"}
                            error={errors.root || errors.repeatPassword ? true : false}
                            helperText={errors.repeatPassword?.message} 
                            {...field}  
                        />
                    )}
                />
            </FormContainer>
            { errors.root && (
                <AuthError sx={{mt: 2}}>
                    {errors.root.message}
                </AuthError>
            )}
            <Button
                fullWidth
                variant="contained"
                type="submit"
                loading={isLoading}
                sx={{
                    mt: 4
                }}
            >
                Восстановить
            </Button>
        </form>
    )
}