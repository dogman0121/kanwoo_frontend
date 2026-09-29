"use client"

import { useState } from "react";
import { Button } from "@mui/material";
import AuthError from "./ui/Error";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { authClientApi } from "../api/client.api";
import Message from "./ui/Message";
import Header from "./ui/Header";
import FormContainer from "./ui/FormContainer";
import PasswordInput from "./ui/PasswordInput";

interface RecoveryForm {
    password: string,
    repeatPassword: string
}

export default function AuthRecovery() {
    const [recoveryMessageOpen, setRecoveryMessageOpen] = useState(false)

    const urlParams = useSearchParams();
    const token = urlParams.get("t");
    
    const {control, handleSubmit, formState: {errors}, setError} = useForm<RecoveryForm>({
        mode: "onSubmit"
    })

    const handleRecovery = async (data: RecoveryForm) => {
        if (data.password !== data.repeatPassword)
            return setError("root", {message: "Пароли не совпадают"});

        if (!token){
            throw Error("Env variable 'NEXT_PUBLIC_SITE_URL' not found")
        }

        try {
            await authClientApi.recovery(token, data.password);

            setRecoveryMessageOpen(true)
        } catch (_e) {
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
                { errors.root && (
                    <AuthError>
                        {errors.root.message}
                    </AuthError>
                )}
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
                            error={errors.root || errors.repeatPassword ? true : false}
                            helperText={errors.repeatPassword?.message} 
                            {...field}  
                        />
                    )}
                />
            </FormContainer>
            <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                    mt: 4
                }}
            >
                Восстановить
            </Button>
        </form>
    )
}