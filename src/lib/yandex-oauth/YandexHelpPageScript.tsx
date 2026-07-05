"use client"

import { useEffect } from "react"

export default function YandexHelpPageScript() {
    useEffect(() => {
        window.YaSendSuggestToken(process.env.NEXT_PUBLIC_YANDEX_OAUTH_ORIGIN, {
            "kek": true
         });
    }, [])
    
    return (
        <></>
    )
}