"use client"

import { useContext, useState } from "react";
import { authService } from "../api/services/authService";
import { Button, Typography } from "@mui/material";
import AuthError from "./ui/AuthError";
import AuthForm from "./ui/AuthForm";
import { useSearchParams } from "next/navigation";
import authSectionContext from "../context/authSectionContext";
import { AuthSection } from "../types/AuthPanel";
import AuthMessage from "./ui/AuthMessage";
import { Controller, useForm } from "react-hook-form";
import AuthPasswordInput from "./ui/AuthPasswordInput";

interface RecoveryForm {
    password: string,
    repeatPassword: string
}

export default function AuthRecovery({
    onRecovery
}: {
    onRecovery?: () => void
}) {
    const [recoveryMessageOpen, setRecoveryMessageOpen] = useState(false)

    const { section, setSection } = useContext(authSectionContext);

    const urlParams = useSearchParams();
    const token = urlParams.get("t");
    
    const {control, handleSubmit, formState: {errors}, setError} = useForm<RecoveryForm>({
        mode: "onSubmit"
    })

    if (section != AuthSection.RECOVERY) 
        return null

    const handleRecovery = async (data: RecoveryForm) => {
        if (data.password !== data.repeatPassword)
            return setError("root", {message: "Пароли не совпадают"});

        if (!token){
            throw Error("Env variable 'NEXT_PUBLIC_SITE_URL' not found")
        }

        try {
            await authService.recovery(token, data.password);

            setRecoveryMessageOpen(true)

            onRecovery?.()
        } catch (_e) {
            throw new Error("Failed to recovery")
        }
    }


    if (recoveryMessageOpen)
        return (
            <AuthMessage 
                title="Восстановление пароля"
                description="Ваш пароль сброшен успешно"
            />
        )
    return (
        <form onSubmit={handleSubmit(handleRecovery)}>
            <Typography variant="h2">Восстановление пароля</Typography>
            <AuthForm>
                { errors.root && (
                    <AuthError>
                        {errors.root.message}
                    </AuthError>
                )}
                <Controller 
                    name="password"
                    control={control}
                    render={({field}) => (
                        <AuthPasswordInput
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
                        <AuthPasswordInput
                            error={errors.root || errors.repeatPassword ? true : false}
                            helperText={errors.repeatPassword?.message} 
                            {...field}  
                        />
                    )}
                />
            </AuthForm>
            <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                    mt: "20px"
                }}
            >
                Восстановить
            </Button>
        </form>
    )
}