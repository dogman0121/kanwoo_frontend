"use client"

import { useEffect, useState } from "react";
import { authService } from "../api/services/authService";
import AuthMessage from "./ui/AuthMessage";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthVerify({onSuccess}: {onSuccess?: () => void}) {
    enum VERIFY_STATUS {
        OK,
        TOKEN_USED,
        TOKEN_EXPIRED
    }
    const [error, setError] = useState<VERIFY_STATUS>(VERIFY_STATUS.OK);

    const router = useRouter();

    const urlParams = useSearchParams();
        
    const token = urlParams.get("t");

    useEffect(() => {
        if (token){
            authService.verify(token)
                .then(({error}) => {
                    if (error.detail.token == "Token already user")
                        setError(VERIFY_STATUS.TOKEN_USED)
                })
                .then(() => {
                    onSuccess?.()
                })
        }
        else {
            if (!process.env.NEXT_PUBLIC_SITE_URL)
                throw Error("Env variable 'process.env.NEXT_PUBLIC_SITE_URL' not found")
            router.push(process.env.NEXT_PUBLIC_SITE_URL)
        }

        return () => {};
    }, []);

    if (!token){
        if (!process.env.NEXT_PUBLIC_SITE_URL)
            throw Error("Env variable 'process.env.NEXT_PUBLIC_SITE_URL' not found")
        router.push(process.env.NEXT_PUBLIC_SITE_URL)
    }

    return (
        <>
            {error == VERIFY_STATUS.TOKEN_USED && (
                <AuthMessage 
                    title="Подтверждение почты"
                    description="Данная ссылка уже была использована"
                />
            )}
            {error == VERIFY_STATUS.TOKEN_EXPIRED && (
                <AuthMessage 
                    title="Подтверждение почты"
                    description="Время действия ссылки истекло"
                />
            )}
        </>
    )
}