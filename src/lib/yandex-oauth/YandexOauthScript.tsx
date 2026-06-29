"use client"

import { YANDEX_OAUTH_CONTAINER_ID } from "@/features/auth/components/Auth";
import { useEffect } from "react";

export default function YandexOauthScript() {
    
    useEffect(() => {
        window.YaAuthSuggest.init({
            client_id: '60a4f1a51d3341c8973244bde329fe8d',
            response_type: 'token',
            redirect_uri: "https://kanwoo.ru/auth/oauth/yandex" //`${process.env.NEXT_PUBLIC_SITE_URL}/auth/oauth/yandex`
        },
        'https://examplesite.com', {
            view: 'button',
            parentId: {YANDEX_OAUTH_CONTAINER_ID},
            buttonView: 'main',
            buttonTheme: 'light',
            buttonSize: 'm',
            buttonBorderRadius: 0
        }
        )
        .then(function({handler}: {handler: () => void}) {
            return handler()
        })
        .then(function(data: unknown) {
            console.log('Сообщение с токеном: ', data);
            document.body.innerHTML += "Сообщение с токеном:" + JSON.stringify(data);
        })
        .catch(function(error: unknown) {
            console.log('Что-то пошло не так: ', error);
            document.body.innerHTML += "Что-то пошло не так:" + JSON.stringify(error);
        });
    }, [])

    return (
        <></>
    )
}