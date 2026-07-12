"use client"

import { YANDEX_OAUTH_CONTAINER_ID } from "@/features/auth/components/Auth";
import { useEffect } from "react";


export interface YandexOauthResponse {
    access_token: string,
    cid: string,
    expires_in: string,
    extraData: Record<string, unknown>,
    token_type: "bearer" | "jwt"
}


export default function YandexOauthScript({
    onAuth
}: {
    onAuth: (response: YandexOauthResponse) => void
}) {
    
    useEffect(() => {
        window.YaAuthSuggest.init({
            client_id:  process.env.NEXT_PUBLIC_YANDEX_OAUTH_CLIENT_ID,
            response_type: 'token',
            redirect_uri: process.env.NEXT_PUBLIC_YANDEX_OAUTH_REDIRECT_URL
        },
        process.env.NEXT_PUBLIC_YANDEX_OAUTH_ORIGIN, 
        {
            view: 'button',
            parentId: YANDEX_OAUTH_CONTAINER_ID,
            buttonView: 'main',
            buttonTheme: 'light',
            buttonSize: 's',
            buttonBorderRadius: 22
        }
        )
        .then(function({handler}: {handler: () => void}) {
            return handler()
        })
        .then(function(data: YandexOauthResponse) {
            // console.log('Сообщение с токеном: ', data);
            onAuth(data)
        })
        .catch(function(error: unknown) {
            console.log('Что-то пошло не так: ', error);
            document.body.innerHTML += "Что-то пошло не так:" + JSON.stringify(error);
        });

        return () => {
        }
    }, [])

    return (
        <></>
    )
}